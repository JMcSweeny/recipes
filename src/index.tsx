import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ApiProvider } from "./api/ApiProvider";

document.documentElement.style.setProperty(
  "--vh",
  `${window.innerHeight * 0.01}px`
);

ReactDOM.render(
  <BrowserRouter>
    <ApiProvider>
      <App />
    </ApiProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
