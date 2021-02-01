import React from "react";
import App from "./components/App";
import { Welcome } from "./views/Welcome";
import { SignUp, SignIn } from "./views/Auth";

import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact path="/" component={Welcome} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </App>
  </BrowserRouter>,
  document.querySelector("#root")
);
