import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./context/auth";
import ApolloProvider from "./ApolloProvider"

import reportWebVitals from './reportWebVitals';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    {ApolloProvider}
  </AuthProvider>
);

reportWebVitals();
