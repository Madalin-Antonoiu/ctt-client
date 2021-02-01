import React from "react";
import { Header } from "./Header";
// import { Dashboard, LogIn, Register } from "../views";

const App = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default App;
