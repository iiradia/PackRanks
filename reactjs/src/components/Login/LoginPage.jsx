import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
//import "./Login.css";

class LoginPage extends React.Component {

  constructor() {
    super()
    this.state = 
      {
        email: "",
        password: ""
      }
    
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={e => this.setState({email:e.target.value})}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={e => this.setState({password:e.target.value})}
              type="password"
            />
          </FormGroup>
          <Button block bsSize="large" disabled={!this.validateForm} type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
  
}
export default LoginPage;