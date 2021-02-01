import React from "react";
import App from "./components/App";
import { Welcome } from "./views/Welcome";
import { SignIn } from "./views/Auth";
import SignUp from "./views/Auth/SignUp.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";

import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

const store = createStore(reducers, {});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
