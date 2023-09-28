import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'https://api.gesrural.com.br/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      const status = extensions.originalError.statusCode;
      if (status === 403 || status === 401) {
        window.location.href = process.env.LOGIN_URL
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authorization');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
}).concat(errorLink);

const myApolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default myApolloClient;
