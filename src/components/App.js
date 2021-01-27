import React from "react";
import Button from "@material-ui/core/Button";
import Test from "./Test";
// import { SignIn } from "./Views/Authentication/SignIn";

const App = () => {
  return (
    <div>
      <Button variant="contained" color="primary">
        Hello World
      </Button>

      <Test />
    </div>
  );
};

export default App;
