import React, { useState } from "react";
//import { Button, FormGroup, FormControl, FormLabel, FormText, FormCheck } from "react-bootstrap";
import "./Login.css";
import "./static/images/icons/favicon.ico";
import "./static/vendor/bootstrap/css/bootstrap.min.css";
import "./static/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./static/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "./static/vendor/animate/animate.css";
import "./static/vendor/css-hamburgers/hamburgers.min.css";
import "./static/vendor/select2/select2.min.css";
import "./static/css/util.css";
import "./static/css/main.css";
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import Simplert from 'react-simplert';
import MainWelcome from '../Home/MainWelcome'

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.googleSuccess = this.googleSuccess.bind(this);
    this.googleFailure = this.googleFailure.bind(this);

    this.state = {
      first_name: null,
      last_name: null,
      email: null
    }
  }

  googleSuccess(response) {
    console.log(response);
    const profile_obj = response.profileObj;
    {/* Save user data to state. */ }
    this.setState(
      {
        first_name: profile_obj.givenName,
        last_name: profile_obj.familyName,
        email: profile_obj.email
      }
    )
    console.log(this.state);

    this.props.liftStateUp(this.state);
    { /* Route user back to homepage. */ }
    this.props.history.push({
        pathname: "/"
      });
  }

  googleFailure(response) {
    //console.log(response);
    alert("Google Login failed. Please try again.");
    return (
      ReactDOM.render(
        <Simplert 
          showSimplert = {true}
          type={"warning"}
          title={"Login Failed"}
          message={"Please attempt login again."}
        />
          ,
      document.getElementById("login-fail")
      )
    
    )
  }

  render () {
    return (
      
      <div>
        <div>
          <title>Login V11</title>
        </div>
        <div id="login-fail">

        </div>
        <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-55">
                    Login to EasyA
                  </span>
                  {/*
                  <div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text" name="email" placeholder="Email" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <span className="lnr lnr-envelope" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                    <input className="input100" type="password" name="pass" placeholder="Password" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <span className="lnr lnr-lock" />
                    </span>
                  </div>
                  <div className="contact100-form-checkbox m-l-4">
                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>
                  <div className="container-login100-form-btn p-t-25">
                    <button className="login100-form-btn">
                      Login
                    </button>
                  </div>
                  <div className="text-center w-full p-t-42 p-b-22">
                    <span className="txt1">
                      Or login with
                    </span>
                  </div>*/}

                  {/* Google Button goes here */ }
                  
                        {/*render={renderProps => (
                          <GoogleButton type="light" id="googleicon"/>
                        )}*/}
                  <div id="googleButton">
                    <GoogleLogin
                        id = "googleButtonB"
                        clientId="887022410797-hhdl5etksm3ob2m9fhhh05i9f81cond2.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.googleSuccess}
                        onFailure={this.googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                  </div>
                
                  <div className="text-center w-full p-t-30">
                    <span id="notamember" className="txt1">
                      Not a member?
                    </span>
                    <a id="signUpNow" className="txt1 bo1 hov1" href="#">
                      Sign up now							
                    </a>
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
export default withRouter(LoginPage);