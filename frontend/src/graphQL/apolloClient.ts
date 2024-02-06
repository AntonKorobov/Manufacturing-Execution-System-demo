import { ApolloClient, InMemoryCache } from '@apollo/client';

const HASURA_URL = process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT;
const HASURA_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

const createApolloClient = () => {
  return new ApolloClient({
    uri: HASURA_URL,
    cache: new InMemoryCache(),
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': HASURA_SECRET as string,
    },
  });
};

export default createApolloClient;
