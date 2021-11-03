import {
  ApolloClient, createHttpLink,
  InMemoryCache
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

export const storeToken = (token: string) => {
  localStorage.setItem('jwt-auth', token);
};

export const getToken = () => {
  return localStorage.getItem('jwt-auth') ?? null;
};

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: getToken() ? `Bearer ${getToken()}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'https://yvent-api.herokuapp.com/api/graphql',
});


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
