import React from "react";
import App from "./components/App";
import { Welcome } from "./views/Welcome";
import SignIn from "./views/Auth/SignIn";
// import SignUp from "./views/Auth/SignUp";
import SignOut from "./views/Auth/SignOut";
import Feature from "./views/Auth/Feature";
import Websocket from "./views/Auth/Websocket";
import ExchangeInfo from "./views/Auth/ExchangeInfo";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers";

import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

const initialState = {
  auth: { authenticated: localStorage.getItem("token") },
};

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Welcome} />
        {/* <Route path="/signup" component={SignUp} /> */}
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route path="/feature" component={Feature} />
        <Route path="/websocket" component={Websocket} />
        <Route path="/exchangeInfo" component={ExchangeInfo} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
