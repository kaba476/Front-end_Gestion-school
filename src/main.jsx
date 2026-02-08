import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; //  Router pour gérer la navigation côté front

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Point d'entrée de l'application React
// On englobe l'appli avec BrowserRouter (routing) et AuthProvider (contexte d'authentification).
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
