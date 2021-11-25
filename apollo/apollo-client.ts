import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const storeToken = (token: string) => {
  localStorage.setItem("jwt-auth", token);
};

export const getToken = () => {
  return localStorage.getItem("jwt-auth") ?? null;
};

export const deleteToken = () => {
  localStorage.removeItem("jwt-auth");
};

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them

  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "https://yvent-api.herokuapp.com/api/graphql",
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({addTypename : false}),
});
