import axios from "axios";
// import { AUTH_USER } from "./types";

//Returns an arrow function containing dispatch function, then we can invoke it
export const signup = (formProps) => (dispatch) => {
  const url = process.env.REACT_APP_API_BACKEND_URL + "/signup";
  axios.post(url, formProps);
};
