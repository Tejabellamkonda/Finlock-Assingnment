import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    login: false,
  };

  onChangeUsername = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { login } = this.state;
    this.setState({ login: !login });
    const { email, password } = this.state;
    const userDetails = { email, password };
    console.log(userDetails);
    const url = "http://localhost:5001/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      console.log("ok");
      this.onSubmitSuccess(data.token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Email Address"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1>Welcome</h1>
          <p>Lets Connect to your workspace</p>
          <p className="text">Please enter your Email to continue</p>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="button" className="forgot-password">
            Forgot Password?
          </button>
          <button type="submit" className="login-button">
            Sign In
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
