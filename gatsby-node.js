const path = require('path');

// Redirects.
const { createRedirect } = require('gatsby');

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

  // Create redirects
  const { createRedirect } = actions;

  // Simple page redirect (e.g., old URL to new page)
  createRedirect({
    fromPath: '/shop/shoulder-bug-no-10/',
    toPath: '/shop/shoulder-bag-no-10/',
    isPermanent: true, // 301 redirect
  });

  // Redirect from a directory to another
  createRedirect({
    fromPath: '/shop',
    toPath: '/',
    isPermanent: true,
  });
};
