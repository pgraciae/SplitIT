
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Forms.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";


class Register extends React.Component {

  constructor(props){
      super(props)
      this.state = {
          name : "",
          email: "",
          password: "",
          validate: {},
          showPassword: false,
          phone: "",
          nickname: "",
          address: "",
          gender: "",
          birth:"",
          value:"",
          currentDate: new Date(),
      }
      this.validateRegister = this.validateRegister.bind(this);
      this.register = this.register.bind(this);
  }

  validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: this.state.name,
        isRequired: true,
      },
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
      phone: {
        value: this.state.phone,
        isRequired: true,
        minLength: 9,
        maxLength: 11,
      },
      nickname: {
        value: this.state.nickname,
        isRequired: true,
        minLength: 3
      },
      address: {
        value: this.state.address,
        isRequired: true,
      },
      gender: {
        value: this.state.gender,
        isRequired: true,
      },
      birth: {
        value: this.state.birth,
        isRequired: true,
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

  setValidate(obj){
    this.setState({validate: obj})
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
  setName(obj){
    this.setState({name: obj})
  }
  setNickname(obj){
    this.setState({nickname: obj})
  }
  setPhone(obj){
    this.setState({phone: obj})
  }
  setAddress(obj){
    this.setState({address: obj})
  }
  setGender(obj){
    this.setState({gender: obj})
  }
  setBirth(obj){
    this.setState({birth: obj})
  }
  setValue(obj){
      this.setState({value: obj})
  }
  setCurrentDate(obj){
      this.setState({currentDate: obj})
  }
  register(e){
    e.preventDefault();

    this.setState({validate : this.validateRegister()});

    if (this.state.validate) {
      this.setValidate({});
      this.setName("");
      this.setEmail("");
      this.setPassword("");
      this.setNickname("");
      this.setAddress("");
      this.setBirth("");
      this.setGender("");
      this.setPhone("");
    }
    this.Upload(e);
  }

  async Upload(e) {
    await fetch('/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        nickname: this.state.nickname,
        password: this.state.password,
        gender: this.state.gender,
        birth: this.state.birth,
        phone: this.state.phone,
        money: 0, 
        address: this.state.address,
        registration: new Date(),
      })
    }).then(resp => {
      resp.json().then((resp)=>{
        if(resp.message === "Registered"){
          this.props.Login();
        }
        else{
          console.log('Register failed')
        }
      }).then(data => {console.log(data)})
    })
  }

  togglePassword(e){
    if (this.state.showPassword) {
      this.setShowPassword(false);
    } else {
      this.setShowPassword(true);
    }
  };

  getInitialState(){
    const value = "Orange";
    return value;
  };


  handleChange(e){
    this.setState({value: e.target.value})
  };


  render(){
      return (
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-22 col-md-17 col-lg-16 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Create your Account</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={this.register}
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
                </div>

                <div className="name mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.name
                        ? "is-invalid "
                        : ""
                    }`}
                    id="name"
                    name="name"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={(e) => this.setName(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.name
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.name
                      ? this.state.validate.validate.name[0]
                      : ""}
                  </div>
                </div>

                <div className="nickname mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.nickname
                        ? "is-invalid "
                        : ""
                    }`}
                    id="nickname"
                    name="nickname"
                    value={this.state.nickname}
                    placeholder="Nickname"
                    onChange={(e) => this.setNickname(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.nickname
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.nickname
                      ? this.state.validate.validate.nickname[0]
                      : ""}
                  </div>
                </div>

                <div className="address mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.address
                        ? "is-invalid "
                        : ""
                    }`}
                    id="address"
                    name="address"
                    value={this.state.address}
                    placeholder="Address"
                    onChange={(e) => this.setAddress(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.address
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.address
                      ? this.state.validate.validate.address[0]
                      : ""}
                  </div>
                </div>


                <div className="phone mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.phone
                        ? "is-invalid "
                        : ""
                    }`}
                    id="phone"
                    name="phone"
                    value={this.state.phone}
                    placeholder="phone"
                    onChange={(e) => this.setPhone(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.phone
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.phone
                      ? this.state.validate.validate.phone[0]
                      : ""}
                  </div>
                </div>


                <div className="gender mb-3">
                  <select
                    className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.gender
                        ? "is-invalid "
                        : ""
                    }`}
                    id="gender"
                    name="gender"
                    value={this.state.gender}
                    placeholder="Gender (M, F or O)"
                    onChange={(e) => this.setGender(e.target.value)}
                  >
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                    <option value="O">Other</option>
                  </select>

                  <div
                    className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.gender
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.gender
                      ? this.state.validate.validate.gender[0]
                      : ""}
                  </div>
                </div>


                <div className="birth mb-3">
                  <DatePicker
                    className={`form-control ${
                        this.state.validate.validate && this.state.validate.validate.birth
                        ? "is-invalid "
                        : ""
                    }`}
                    id="birth"
                    name="birth"
                    placeholder="Birth"
                    selected={this.state.currentDate}
                    //onChange={(e) => this.setCurrentDate(e.target.value)}
                    onChange={date => {this.setCurrentDate(date); this.setBirth(date)}}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                        this.state.validate.validate && this.state.validate.validate.birth
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {this.state.validate.validate && this.state.validate.validate.birth
                      ? this.state.validate.validate.birth[0]
                      : ""}
                  </div>
                </div>


                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                Have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
};

export default Register;