
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Forms.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true,
      },
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
      phone: {
        value: phone,
        isRequired: true,
        minLength: 9,
        maxLength: 11,
      },
      nickname: {
        value: nickname,
        isRequired: true,
        minLength: 3
      },
      address: {
        value: address,
        isRequired: true,
      },
      gender: {
        value: gender,
        isRequired: true,
        maxLength: 1,
      },
      birth: {
        value: birth,
        isRequired: true,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      setName("");
      setEmail("");
      setPassword("");
      setNickname("");
      setAddress("");
      setBirth("");
      setGender("");
      setPhone("");
      alert("Successfully Register User");
    }
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
    
  };

  const getInitialState = () => {
    const value = "Orange";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  

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
                onSubmit={register}
                autoComplete={"off"}
              >

                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                      name="password"
                      id="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.password
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="name mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.name
                        ? "is-invalid "
                        : ""
                    }`}
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.name
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.name
                      ? validate.validate.name[0]
                      : ""}
                  </div>
                </div>

                <div className="nickname mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.nickname
                        ? "is-invalid "
                        : ""
                    }`}
                    id="nickname"
                    name="nickname"
                    value={nickname}
                    placeholder="Nickname"
                    onChange={(e) => setNickname(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.nickname
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.nickname
                      ? validate.validate.nickname[0]
                      : ""}
                  </div>
                </div>

                <div className="address mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.address
                        ? "is-invalid "
                        : ""
                    }`}
                    id="address"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.address
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.address
                      ? validate.validate.address[0]
                      : ""}
                  </div>
                </div>


                <div className="phone mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.phone
                        ? "is-invalid "
                        : ""
                    }`}
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.phone
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.phone
                      ? validate.validate.phone[0]
                      : ""}
                  </div>
                </div>


                <div className="gender mb-3">
                  <select
                    className={`form-control ${
                      validate.validate && validate.validate.gender
                        ? "is-invalid "
                        : ""
                    }`}
                    id="gender"
                    name="gender"
                    value={gender}
                    placeholder="Gender (M, F or O)"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.gender
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.gender
                      ? validate.validate.gender[0]
                      : ""}
                  </div>
                </div>


                <div className="birth mb-3">
                  <DatePicker
                    className={`form-control ${
                      validate.validate && validate.validate.birth
                        ? "is-invalid "
                        : ""
                    }`}
                    id="birth"
                    name="birth"
                    placeholder="Birth"
                    selected={currentDate}
                    // onChange={(e) => setCurrentDate(e.target.value)}
                    onChange={date => setCurrentDate(date)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.birth
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.birth
                      ? validate.validate.birth[0]
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
};

export default Register;