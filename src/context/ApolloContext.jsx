import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: `${process.env.GATSBY_WORDPRESS_SITE_URL}/graphql`,
})