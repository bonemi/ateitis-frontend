const path = require(`path`);
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allWpProduct(filter: { status: { eq: "publish" } }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allWpProduct.edges.forEach(({ node }) => {
      createPage({
        path: `academy/${node.slug}`,
        component: path.resolve(`./src/templates/curso-detail.jsx`),
        context: {
          slug: node.slug,
        },
      });
    });
  });
};
