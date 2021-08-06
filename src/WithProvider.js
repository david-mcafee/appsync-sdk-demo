import AppSyncConfig from "./aws-exports";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  // from,
} from "@apollo/client";
import App from "./App";

// TODO: add this to AppSync SDK README
const httpLink = new HttpLink({
  uri: AppSyncConfig.aws_appsync_graphqlEndpoint,
  headers: {
    "X-Api-Key": AppSyncConfig.aws_appsync_apiKey,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default WithProvider;
