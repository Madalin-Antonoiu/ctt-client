import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

class SignIn extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
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

        <button> Sign In</button>
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
  reduxForm({ form: "signin" })
)(SignIn);

// import { Form, Input, Button, Checkbox } from "antd";
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// const SignIn = () => {
//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <Form
//       {...layout}
//       name="basic"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//     >
//       <Form.Item
//         label="Username"
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: "Please input your username!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: "Please input your password!",
//           },
//         ]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item {...tailLayout} name="remember" valuePropName="checked">
//         <Checkbox>Remember me</Checkbox>
//       </Form.Item>

//       <Form.Item {...tailLayout}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default SignIn;
