import { AUTH_USER, AUTH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  authenticaed: "",
  errorMessage: "",
};

// eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload }; // if authenticated, user will have a token inside
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
