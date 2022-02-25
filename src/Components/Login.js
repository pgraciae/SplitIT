import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target[0].value);
    console.log(event.target[1].value);

    const Upload = async() => {
      await fetch('/login?nickname='+event.target[0].value+'&password='+event.target[1].value, {
        method: 'GET',
      }).then(resp => {
        resp.json().then(data => {console.log(data)})
      })
    }
    Upload();
  }
  
  //?nickname='+event.target[0].value+'&password'+event.target[1].value

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg"> {/*//controlId="email">*/}
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />controlId
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
