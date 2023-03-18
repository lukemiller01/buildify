// Functional
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import fetch from 'cross-fetch';

// Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { persistCache, LocalStorageWrapper, CachePersistor } from 'apollo3-cache-persist';

const cache = new InMemoryCache();

const persistCacheSetup = async () => await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

persistCacheSetup();

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5001/graphql', fetch }),
  cache: cache,
});

export const persistor = new CachePersistor({
  cache: client.cache,
  storage: window.localStorage,
});

// DOM content needs to load above before the document can load
window.addEventListener("DOMContentLoaded", function (e) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
});
