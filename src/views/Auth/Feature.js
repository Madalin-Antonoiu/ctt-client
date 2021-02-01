import React from "react";
import requireAuth from "../../components/requireAuth";

const Feature = () => {
  return <div>Feature Page</div>;
};

export default requireAuth(Feature);
