import React from "react";
import App from "./components/App";
import { Welcome } from "./views/Welcome";

import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" component={Welcome} />
    </App>
  </BrowserRouter>,
  document.querySelector("#root")
);
