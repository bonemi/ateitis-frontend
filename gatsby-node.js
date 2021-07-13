const path = require(`path`);
const { toTitleCase } = require("./src/utils/string-utils");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allWpProduct(filter: { status: { eq: "publish" } }) {
        edges {
          node {
            id
            slug
            acfCursos {
              es {
                slugEs
              }
              en {
                slugEn
              }
            }
          }
        }
      }
    }
  `);

  result.data.allWpProduct.edges.forEach(({ node }) => {
    const languages = ["es", "en"];

    for (let language of languages) {
      const slug = node.acfCursos[language]["slug" + toTitleCase(language)]
        ? node.acfCursos[language]["slug" + toTitleCase(language)]
        : node.slug;
      const slugPrefix = language === "es" ? "" : `${language}/`;
      const slugPath = `${slugPrefix}academy/${slug}`;

      createPage({
        path: slugPath,
        component: path.resolve(`./src/templates/curso-detail.jsx`),
        context: {
          slug: node.slug,
          language: language,
          localizedSlug: slug,
          //   acfCursos: acfCursos,
        },
      });
    }
  });
};
