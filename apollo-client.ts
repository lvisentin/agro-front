import { ApolloClient, InMemoryCache } from "@apollo/client";

const myApolloClient = new ApolloClient({
  uri: "https://localhost:8080",
  cache: new InMemoryCache(),
})

export default myApolloClient;