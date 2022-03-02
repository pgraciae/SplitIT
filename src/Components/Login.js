import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Forms.js";


class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {

      email: '',
      password: "",
      remember: false,
      validate: {},
      showPassword: false,
    }
    this.validateLogin = this.validateLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }
    validateLogin(){
      let isValid = true;
  
      let validator = Form.validator({
        email: {
          value: this.state.email,
          isRequired: true,
          isEmail: true,
        },
        password: {
          value: this.state.password,
          isRequired: true,
          minLength: 6,
        },
      });
  
      if (validator !== null) {
        this.setValidate({
          validate: validator.errors,
        });
  
        isValid = false;
      }
      return isValid;
    };
    togglePassword(e){
      if (this.state.showPassword) {
        this.setShowPassword(false);
      } else {
        this.setShowPassword(true);
      }
    };
    setValidate(obj){
      this.setState({validate: obj})
    }
    setRemember(obj){
      this.setState({remember: obj})
    }
    setEmail(obj){
      this.setState({email: obj})
    }
    setPassword(obj){
      this.setState({password: obj})
    }
    setShowPassword(obj){
      this.setState({showPassword: obj})
    }
     authenticate(e){
      e.preventDefault();
  
      this.setState({validate : this.validateLogin()});
      
      if (this.state.validate) {
        this.setValidate({});
        this.setEmail("");
        this.setPassword("");
      }
      this.Upload(e);
    }
      async Upload(e) {
        await fetch('/login?nickname='+ e.target[0].value+'&password='+e.target[1].value, {
          method: 'GET',
        }).then(resp => {
          resp.json().then((resp)=>{
            if(resp.message === "Logging in"){
              this.props.login();
            }
          }).then(data => {console.log(data)})
        })
      }
      

    render(){
      return (
      <div className="row g-0 auth-wrapper">
      <div className="col-2 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-22 col-md-17 col-lg-16 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Login to your account</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={this.authenticate}
                autoComplete={"off"}
              >
                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      this.state.validate.validate && this.state.validate.validate.email
                        ? "is-invalid "
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={(e) => this.setEmail(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      this.state.validate.validate && this.state.validate.validate.email
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.email
                      ? this.state.validate.validate.email[0]
                      : ""}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={this.state.showPassword ? "text" : "password"}
                      className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                      name="password"
                      id="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => this.togglePassword(e)}
                    >
                      <i
                        className={
                          this.state.showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    <div
                      className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.password
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {this.state.validate.validate && this.state.validate.validate.password
                        ? this.state.validate.validate.password[0]
                        : ""}
                    </div>
                  </div>

                  <div className="extra mt-3 row justify-content-between">
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                          checked={this.state.remember}
                          onChange={(e) => this.setRemember(e.currentTarget.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="forgot-password text-end">
                        <Link to="/forgot-password">Forgot password?</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Log In
                  </button>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                No Account?{" "}
                <Link className="text-link" to="/register">
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    }
  }














export default Login;