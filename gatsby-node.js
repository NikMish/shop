const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const itemTemplate = path.resolve(`./src/templates/shop-item.js`);

  // Query for all items in your JSON data
  const result = await graphql(`
    query ItemsQuery {
      allDataJson {
        edges {
          node {
            slug
          }
        }
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
};
