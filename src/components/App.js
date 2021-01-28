import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard, LogIn, Register } from "../views";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/LogIn" component={LogIn} />
          <Route path="/Register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
