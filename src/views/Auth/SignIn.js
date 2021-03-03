import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Row } from "antd";



class SignIn extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push("/websocket");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Row type="flex" justify="center" align="middle" style={{ minHeight: 'calc(100vh - 300px)' }}>
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

          <button> Sign In</button>
        </form>
      </Row>


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
  reduxForm({ form: "signin" })
)(SignIn);

