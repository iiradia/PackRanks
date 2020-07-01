import React, { useState } from "react";
//import { Button, FormGroup, FormControl, FormLabel, FormText, FormCheck } from "react-bootstrap";
import "./ForgotPass.css";
import "./static/images/icons/favicon.ico";
import "./static/vendor/bootstrap/css/bootstrap.min.css";
import "./static/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./static/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "./static/vendor/animate/animate.css";
import "./static/vendor/css-hamburgers/hamburgers.min.css";
import "./static/vendor/select2/select2.min.css";
import "./static/css/util.css";
import "./static/css/main.css";
//import Alert from 'react-s-alert';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import {
  BrowserRouter as Router,
  withRouter,
  Redirect
} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

class ForgotPass extends React.Component {

  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onReCaptcha = this.onReCaptcha.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      re_captcha: false,
      redirect: "/forgotsuccess"
    }
  }

  handleReset(event) {
      event.preventDefault();

      let validInput = true;

      let email=this.state.login_email;

      {/* Check for valid email */}
      if (!(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email))) {  
        
        //throw error with toast-notes
        toast.notify(<h5 id="incorrect">Please enter a valid email address.</h5>)
        validInput = false;
      }

      {/* Check for recaptcha completion */}
      if (!this.state.re_captcha) {
        toast.notify(<h5 style={{color: '#cc0000'}}>Please complete the ReCaptcha.</h5>)
        validInput = false;
      }
      
      if (validInput) {

        let url = "http://packranks-backend.herokuapp.com/resetLink";
        //let neutralMsg = <h5 id="success"></h5>;

        fetch(url,
        {
                method: "POST",
                body: JSON.stringify({
                    email: email
                })
        }).then(
            (response) => (response.json())
        ).then((data) => {
            {/*Successfully sent reset link */}
            this.props.history.push({
              pathname: "/forgotsuccess"
            })

        }).catch(function() { 
          {/* Notify user that link may have been sent. */}
          return <Redirect to='/forgotsuccess'/>
          })
      
      }
      
  }

  onEmailChange(event) {
    this.setState({login_email:event.target.value})
  }
  
  onReCaptcha(event) {
    this.setState({re_captcha: true});
  }


  render () {
    return (
      
      <div>
        
        <div>
          <title>Reset Password</title>
        </div>
        <div id="login-fail">

        </div>
        <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                <form className="login100-form validate-form">
                <div id="forgotPage">
                  <span className="login100-form-title p-b-20">
                    Reset Password
                  </span>
                  <div className="text-center p-b-30">
                    <span className="txt1">
                        Enter your email and we'll send you a link to reset your password.
                    </span>
                  </div>
                </div>
                  {/* Email form */}
                  <div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
                    <input id="emailForm" 
                      className="input100" 
                      type="text" 
                      name="email" 
                      placeholder="Email"
                      onChange={this.onEmailChange} />

                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <span className="lnr lnr-envelope" />
                    </span>
                  </div>
                  
                  {/* ReCAPTCHA */}
                  <div id="recap">
                    <ReCAPTCHA
                          sitekey="6Lf9MvwUAAAAAHxBJLXSVvLlimkdHv-CHeLYzEYc"
                          onChange={this.onReCaptcha}
                    />
                  </div>

                  
                  <div className="container-login100-form-btn p-t-25">
                    <button 
                      onClick={this.handleReset}
                      className="login100-form-btn">
                      Send Reset Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(ForgotPass);