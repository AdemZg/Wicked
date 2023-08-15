import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { store } from "./app/store";
import { Provider } from "react-redux";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
      <DarkModeContextProvider>
        <Provider store={store}>
         <App />
        </Provider>
      </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
