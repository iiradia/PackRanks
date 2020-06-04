import React, { useState } from "react";

import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./images/icons/favicon.ico";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/daterangepicker/daterangepicker.css";

import "./css/util.css";
import "./css/main.css";
import "./signup.css";
import ReCAPTCHA from "react-google-recaptcha";
import {withRouter} from 'react-router-dom';

import toast from 'toasted-notes'; 
import 'toasted-notes/src/styles.css';

class SignUp extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmpassword: "",
            re_captcha: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmChange = this.onConfirmChange.bind(this);
        this.onReCaptcha = this.onReCaptcha.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let validInput = true;

        {/* Set variables to form values */}
        let email = this.state.email;
        let first_name = this.state.first_name;
        let last_name = this.state.last_name;
        let pwd = this.state.password;
        let confirm_pwd = this.state.confirmpassword;

        {/* Check for valid email */}
        if (!(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email))) {  
            toast.notify(<h5 style={{color: '#cc0000'}}>Please enter a valid email address.</h5>)
            validInput = false;
        }

        {/* Check for valid First Name and Last Name*/}
        if (!first_name || !last_name) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Please enter a valid first name and last name.</h5>)
            validInput = false;
        }

        {/* Check for password match */}
        if (pwd !== confirm_pwd) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Passwords do not match!</h5>)
            validInput = false;
        }

        { /* Check for valid password length */ }
        if (pwd.length < 8) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Password must be 8 or more characters!</h5>)
            validInput = false;
        }

        {/* Check for recaptcha completion */}
        if (!this.state.re_captcha) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Please complete the ReCaptcha.</h5>)
            validInput = false;
        }

        if (validInput) {
            console.log(this.state);

            let url = "http://localhost:5000/signup";
            fetch(url,
            {
                    method: "POST",
                    body: JSON.stringify({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password:pwd
                    })
            }).then(
                (response) => (response.json())
            ).then((data) => {
                console.log(data);
                if (data.success === true) {
                    toast.notify(<h5 style={{color: 'green'}}>You have successfully signed up for PackRanks! Login to access your homepage!</h5>)
                    this.props.history.push({
                        pathname: "/login"
                    })
                }
                else {
                    //Handle duplicate emails/usernames here.
                    toast.notify(<h5 style={{color: '#cc0000'}}>Email already exists in database. Please try logging in instead.</h5>)
                }
            })
        }
    }

    onFirstNameChange(event) {
        this.setState({first_name: event.target.value})
      }
    
    onLastNameChange(event) {
        this.setState({last_name: event.target.value})
    }
    
    onEmailChange(event) {
         this.setState({email: event.target.value})
      }
    
    onPasswordChange(event) {
        this.setState({password: event.target.value})
    }
    
    onConfirmChange(event) {
        this.setState({confirmpassword: event.target.value})
      }

    onReCaptcha(event) {
        this.setState({re_captcha: true});
    }

    render() {
        return (
        <div>
            <title>Contact V14</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/*===============================================================================================*/}
            <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css" />
            {/*===============================================================================================*/}
            <link rel="stylesheet" type="text/css" href="css/util.css" />
            <link rel="stylesheet" type="text/css" href="css/main.css" />
            {/*===============================================================================================*/}
            <div className="container-contact100">
            <div className="wrap-contact100">
                <form 
                    onSubmit={this.handleSubmit}
                    method="POST"
                    className="contact100-form validate-form">
                    {/*Form title */}
                    <span className="contact100-form-title">
                        Sign Up for PackRanks
                    </span>

                    {/* Enter first name */ }
                    <label className="label-input100" htmlFor="first-name">Your Name *</label>
                    <div className="wrap-input100 rs1 validate-input">
                        <input id="first-name"
                            className="input100" 
                            type="text" 
                            name="first-name" 
                            placeholder="First name"
                            onChange={this.onFirstNameChange} />
                        <span className="focus-input100" />
                    </div>

                    {/* Enter last name */ }
                    <div className="wrap-input100 rs1 validate-input">
                        <input className="input100" 
                            type="text" 
                            name="last-name" 
                            placeholder="Last name"
                            onChange={this.onLastNameChange} />
                        <span className="focus-input100" />
                    </div>

                    { /* ENTER email */ }
                    <label className="label-input100" htmlFor="email">Email Address *</label>
                    <div className="wrap-input100 validate-input">
                        <input id="email" 
                            className="input100" 
                            type="text" 
                            name="email" 
                            placeholder="Eg. example@email.com"
                            onChange={this.onEmailChange} />
                        <span className="focus-input100" />
                    </div>

                    { /* ENTER password */ }
                    <label className="label-input100" htmlFor="email">Password *</label>
                    <div className="wrap-input100 validate-input">
                        <input id="password" 
                            className="input100" 
                            type="password" 
                            name="password" 
                            placeholder="8 or more characters"
                            onChange={this.onPasswordChange} />
                        <span className="focus-input100" />
                    </div>

                    { /* CONFIRM password */ }
                    <label className="label-input100" htmlFor="email">Confirm Password *</label>
                    <div className="wrap-input100 validate-input">
                        <input id="password" 
                            className="input100" 
                            type="password" 
                            name="password" 
                            placeholder="8 or more characters"
                            onChange={this.onConfirmChange} />
                        <span className="focus-input100" />
                    </div>

                    {/* ReCAPTCHA */}
                    <ReCAPTCHA
                        sitekey="6Lf9MvwUAAAAAHxBJLXSVvLlimkdHv-CHeLYzEYc"
                        onChange={this.onReCaptcha}
                    />
                    { /* Submit Button */ }
                    <div id="submitButton" className="container-contact100-form-btn">
                        <button 
                            type="submit"
                            className="contact100-form-btn">
                        <span>
                            Submit
                            <i className="zmdi zmdi-arrow-right m-l-8" />
                        </span>
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        );
    }
}
export default withRouter(SignUp);