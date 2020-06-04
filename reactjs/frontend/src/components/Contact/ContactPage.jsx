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
import "./contactpage.css";
import ReCAPTCHA from "react-google-recaptcha";

import toast from 'toasted-notes'; 
import 'toasted-notes/src/styles.css';

class ContactPage extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone_no: "",
            message: "",
            re_captcha: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onReCaptcha = this.onReCaptcha.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let validInput = true;

        {/* Set variables to form values */}
        let email = this.state.email;
        let first_name = this.state.first_name;
        let last_name = this.state.last_name;
        let msg = this.state.message;

        {/* Check for valid email */}
        if (!(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email))) {  
            toast.notify(<h5 style={{color: '#cc0000'}}>Please enter a valid email address.</h5>);
            validInput = false;
        }

        {/* Check for valid First Name and Last Name*/}
        if (!first_name || !last_name) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Please enter a valid first name and last name.</h5>);
            validInput = false;
        }

        {/* Check for valid message */}
        if (!msg) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Please enter a message.</h5>);
            validInput = false;
        }

        {/* Check for completed recaptcha */}
        if (!this.state.re_captcha) {
            toast.notify(<h5 style={{color: '#cc0000'}}>Please complete the ReCaptcha.</h5>);
            validInput = false;
        }

        if (validInput) {
            //console.log(this.state);

            let url = "http://localhost:5000/contact";
            fetch(url,
            {
                    method: "POST",
                    body: JSON.stringify(this.state)
            }).then(
                (response) => (response.json())
            ).then((data) => {
                console.log(data);
                if (data.success === true) {
                    toast.notify(<h5 style={{color: 'green'}}>Message sent! Please be patient, we will get back to you as soon as possible!</h5>);
                }
                else {
                    toast.notify(<h5 style={{color: '#cc0000'}}>Message failed to send.</h5>);
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
    
    onPhoneChange(event) {
        this.setState({phone_no: event.target.value})
    }
    
    onMessageChange(event) {
        this.setState({message: event.target.value})
      }
    
    onReCaptcha(event) {
        if (event) {
            this.setState({re_captcha: true})
        }
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
                        Contact Us
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

                    { /* Enter Phone Number */}
                    <label className="label-input100" htmlFor="phone">Phone Number</label>
                    <div className="wrap-input100">
                        <input id="phone" 
                            className="input100" 
                            type="text" 
                            name="phone" 
                            placeholder="Eg. +1 800 000000"
                            onChange={this.onPhoneChange} />
                        <span className="focus-input100" />
                    </div>

                    { /* Enter Message */ }
                    <label className="label-input100" htmlFor="message">Message *</label>
                    <div className="wrap-input100 validate-input">
                        <textarea id="message" 
                            className="input100" 
                            name="message" 
                            placeholder="Please enter your comments..." 
                            defaultValue={""}
                            onChange={this.onMessageChange} />
                        <span className="focus-input100" />
                    </div>

                    {/* ReCAPTCHA */}
                    <ReCAPTCHA
                        sitekey="6Lf9MvwUAAAAAHxBJLXSVvLlimkdHv-CHeLYzEYc"
                        onChange={this.onReCaptcha}
                    />

                    { /* Submit Button */ }
                    <div id="submitButtonContact" className="container-contact100-form-btn">
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
export default ContactPage;