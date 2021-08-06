// import AppSyncConfig from "./aws-exports";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "./App";

// const client = new AWSAppSyncClient({
//   url: AppSyncConfig.aws_appsync_graphqlEndpoint,
//   region: AppSyncConfig.aws_appsync_region,
//   auth: {
//     type: AppSyncConfig.aws_appsync_authenticationType,
//     apiKey: AppSyncConfig.aws_appsync_apiKey,
//     // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
//   },
// });

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default WithProvider;
