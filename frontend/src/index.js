import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraBaseProvider>
        <App />
      </ChakraBaseProvider>
    </Provider>
  </BrowserRouter>
);
