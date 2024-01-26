import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'https://api.gesrural.com.br/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions, path, message }: any) => {
      if (path[0] === 'signIn') return

      if (message === "PAYMENT_REQUIRED") {
        window.location.href = process.env.PAYMENT_ERROR_URL!;
        return
      }
      
      const status = extensions.originalError?.statusCode;
      if (status === 403 || status === 401) {
        localStorage.removeItem('userData');
        localStorage.removeItem('authorization');
        window.location.href = process.env.LOGIN_URL!;
      }
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
