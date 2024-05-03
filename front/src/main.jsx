import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import React from 'react';
import './index.css';

const client = new ApolloClient({
  uri: import.meta.env.VITE_APPOLO_URI,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: import.meta.env.VITE_APPOLO_URI,
    headers: { "apollo-require-preflight": true, }
  })
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
