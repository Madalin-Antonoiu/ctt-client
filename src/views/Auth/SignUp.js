import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

class SignUp extends Component {
  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push("/websocket");
    });
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

        <div>{this.props.errorMessage}</div>

        <button> Sign Up</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
  };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
