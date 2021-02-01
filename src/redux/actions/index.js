import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

//Returns an arrow function containing dispatch function, then we can invoke it
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_API_BACKEND_URL + "/signup";
    const response = await axios.post(url, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });

    localStorage.setItem("token", response.data.token); // persistent auth state, saving the token to local storage

    callback(); // this callback ensures /*** */ () => { this.props.history.push("/feature"); } */// gets executed in SignUp after a successfull
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email is in use" });
  }
};
