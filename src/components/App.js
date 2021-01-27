import React from "react";
import Button from "@material-ui/core/Button";
import { SignIn } from "./Views/Authentication/SignIn";

const App = () => {
  return (
    <div>
      {/* <Button variant="contained" color="primary">
        Hello World
      </Button> */}

      <SignIn />
    </div>
  );
};

export default App;
