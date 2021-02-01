import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

class SignUp extends Component {
  // By writting it as an arrow function we dont need to worry about binding the context
  onSubmit = (formProps) => {
    // console.log(formProps);
    this.props.signup(formProps);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label htmlFor="">Email</label>
          <Field name="email" type="text" component="input" />
        </fieldset>
        <fieldset>
          <label htmlFor="">Password</label>
          <Field name="password" type="password" component="input" />
        </fieldset>

        <button> Sign Up</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: "signup" })
)(SignUp);
