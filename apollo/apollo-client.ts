import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://yvent-api.herokuapp.com/api/graphql",
  cache: new InMemoryCache(),
});
