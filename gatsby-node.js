const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const itemTemplate = path.resolve(`./src/templates/shop-item.js`);
  const categoryTemplate = path.resolve(`./src/templates/category.js`);

  // Query for all items in your JSON data
  const result = await graphql(`
    query ItemsQuery {
      allDataJson {
        edges {
          node {
            slug
          }
        }
        distinct(field: {category: SELECT})
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Iterate over the items and create a page for each
  const items = result.data.allDataJson.edges;
  items.forEach(item => {
    createPage({
      path: `/shop/${item.node.slug}`, // The URL path for the page
      component: itemTemplate,     // The template component
      context: {                   // Data passed to the template's GraphQL query
        slug: item.node.slug,
      },
    });
  });

  // Iterate over the items and create a page for each
  const categories = result.data.allDataJson.distinct;
  categories.forEach(category => {
    createPage({
      path: `/category/${category}`, // The URL path for the page
      component: categoryTemplate,     // The template component
      context: {                   // Data passed to the template's GraphQL query
        category: category,
      },
    });
  });

  // Google shooping feed xml generation
  const fs = require('fs');
  const xmlString = [];

  const siteMetadata = await graphql(`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `).then(result => result.data.site.siteMetadata);

  xmlString.push('<?xml version="1.0"?>');
  xmlString.push('<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">');
  xmlString.push('<channel>');
  xmlString.push(`<title>${siteMetadata.title}</title>`);
  xmlString.push(`<link>${siteMetadata.siteUrl}</link>`);
  xmlString.push(`<description>${siteMetadata.description}</description>`);

  const itemsResult = await graphql(`
    query {
      allDataJson(filter: {sold: {eq: 0}}) {
        edges {
          node {
            id
            name
            description
            slug
            images
            price
            color
            gender
            age_group
            size
          }
        }
      }
    }
  `);

  if (itemsResult.errors) {
    throw itemsResult.errors;
  }

  const shopItems = itemsResult.data.allDataJson.edges;
  shopItems.forEach(({ node }) => {
    const imgUrl = (node.images && node.images[0]) || "";
    xmlString.push('<item>');
    xmlString.push(`<g:id>${node.id}</g:id>`);
    xmlString.push(`<g:title>${node.name}</g:title>`);
    xmlString.push(`<g:description>${node.description.replace(/<\/?[^>]+(>|$)/g, "")}</g:description>`);
    xmlString.push(`<g:link>${siteMetadata.siteUrl}/shop/${node.slug}</g:link>`);
    xmlString.push(`<g:image_link>${siteMetadata.siteUrl}/${imgUrl}</g:image_link>`);
    if (node.color) {
      xmlString.push(`<g:color>${node.color}</g:color>`);
    }
    if (node.gender) {
      xmlString.push(`<g:gender>${node.gender}</g:gender>`);
    }
    if (node.age_group) {
      xmlString.push(`<g:age_group>${node.age_group}</g:age_group>`);
    }
    if (node.size) {
      xmlString.push(`<g:size>${node.size}</g:size>`);
    }
    xmlString.push(`<g:condition>new</g:condition>`);
    xmlString.push(`<g:availability>in stock</g:availability>`);
    xmlString.push(`<g:price>${node.price} USD</g:price>`);
    xmlString.push(`<g:shipping>`);
    xmlString.push(`<g:country>US</g:country>`);
    xmlString.push(`<g:price>0.00 USD</g:price>`);
    xmlString.push(`</g:shipping>`);
    xmlString.push(`<g:brand>Misharev.com</g:brand>`);
    xmlString.push('</item>');
  });

  xmlString.push('</channel>');
  xmlString.push('</rss>');

  const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
  const xmlDoc = new DOMParser().parseFromString(xmlString.join('\n'), 'text/xml');
  const serialized = new XMLSerializer().serializeToString(xmlDoc);

  fs.writeFileSync('./public/google-shopping-feed.xml', serialized);
};
