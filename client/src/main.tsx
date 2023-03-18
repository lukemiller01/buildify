// Functional
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

const cache = new InMemoryCache();

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

// Set up Apollo Client
export const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: cache,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
