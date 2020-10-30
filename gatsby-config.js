//https://github.com/gatsbyjs/gatsby/issues/22880
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  siteMetadata: {
    title: `Ateitis`,
    description: `Ateitis website`,
    author: `@ajboni @emilanoglucero`,
  },
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins. Here the site sources its data from WordPress.
     */
    // highlight-start
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: `${process.env.GATSBY_WORDPRESS_SITE_URL}/graphql`,
        /*perPage: 5,
        verboseOutput: true,
        concurrentRequests: 4*/
      },
    },
    // highlight-end
    /**
     * The following plugins aren't required for gatsby-source-wordpress,
     * but we need them so the default starter we installed above will keep working.
     **/
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KBNPL45",
        includeInDevelopment: false,
      },
    },

    `gatsby-plugin-sass`,
    "gatsby-plugin-use-query-params",

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
