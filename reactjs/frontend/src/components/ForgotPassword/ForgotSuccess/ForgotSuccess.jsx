import React, { useState } from "react";
//import { Button, FormGroup, FormControl, FormLabel, FormText, FormCheck } from "react-bootstrap";
import "./ForgotSuccess.css";
import "../static/images/icons/favicon.ico";
import "../static/vendor/bootstrap/css/bootstrap.min.css";
import "../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../static/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "../static/vendor/animate/animate.css";
import "../static/vendor/css-hamburgers/hamburgers.min.css";
import "../static/vendor/select2/select2.min.css";
import "../static/css/util.css";
import "../static/css/main.css";
//import Alert from 'react-s-alert';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

class ForgotSuccess extends React.Component {

  constructor(props) {
    super(props);

    this.sendHome = this.sendHome.bind(this);
    this.sendRetry = this.sendRetry.bind(this);
  }

  sendHome() {
      this.props.history.push({
        pathname: "/"
      })
  }
  
  sendRetry() {
      this.props.history.push({
          pathname: "/forgotpassword"
      })
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
                <div>
                  <span className="login100-form-title p-b-20">
                    Forgot Password
                  </span>
                  <div className="text-center p-b-30">
                    <span className="txt1">
                    If we have your email address in the system, you'll receive a message with a link to reset your password.
                    </span>
                    <div  className="dontSeeIt"><br/>If you don't see an email from us, check your spam or junk mail.
                    </div>
                  </div>
                </div>
                  
                  <div className="container-login100-form-btn">
                    <button 
                      onClick={this.sendHome}
                      className="login100-form-btn">
                      Back to Home
                    </button>
                  </div>
                  <div className="container-login100-form-btn p-t-15">
                    <button
                      id="retryForgot" 
                      onClick={this.sendRetry}
                      className="login100-form-btn">
                      Retry
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
export default withRouter(ForgotSuccess);