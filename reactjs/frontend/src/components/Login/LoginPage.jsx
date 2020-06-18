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
import {Button} from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import ReactDOM from 'react-dom';
//import Alert from 'react-s-alert';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
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
    this.onPwdChange = this.onPwdChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      login_email: null
    }
  }

  handleLogin(event) {
      event.preventDefault();

      let validInput = true;

      let email=this.state.login_email;
      let pwd=this.state.password;

      {/* Check for valid email */}
      if (!(new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email))) {  
        
        //throw error with toast-notes
        toast.notify(<h5 id="incorrect">Please enter a valid email address.</h5>)
        validInput = false;
      }
      
      if (validInput) {

        let url = "http://localhost:5000/login";
        fetch(url,
        {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password:pwd
                })
        }).then(
            (response) => (response.json())
        ).then((data) => {
            {/*Successfully logged in*/}
            if (data.success === true) {
              localStorage.setItem("token", data.token);
                this.props.history.push({
                    pathname: "/homepage"
                })
            }
            else {
                //Handle error in login here.
                //throw error with react-s-alert
                /*Alert.error(<h5>Email or password is incorrect.</h5>, {
                  position: 'top',
                  timeout: 'none'
                });*/
                toast.notify(<h5 id="incorrect">Email or password is incorrect.</h5>)
            }
        })
      }
  }

  onPwdChange(event) {
    this.setState({password: event.target.value})
  }
  onEmailChange(event) {
    this.setState({login_email:event.target.value})
  }

  //Handles google successful login.
  googleSuccess(response) {

    //get data from google
    const profile_obj = response.profileObj;
    
    let url = "http://localhost:5000/googleauth";
    //call Flask API with google user data.
    fetch(url,
      {
              method: "POST",
              body: JSON.stringify({
                first_name: profile_obj.givenName,
                last_name: profile_obj.familyName,
                email: profile_obj.email
              })
      }).then(
          (response) => (response.json())
      ).then((data) => {
          {/*Successfully logged in*/}
          if (data.success === true) {
            if (data.type === "SignUp") {
              toast.notify(<h5 id="incorrect">Thank you for signing up for PackRanks! You will now be sent to your homepage!</h5>)
            }
            localStorage.setItem("token", data.token);
              this.props.history.push({
                  pathname: "/homepage"
              })
          }
          else {
              //Handle error in login here.
              toast.notify(<h5 id="incorrect">Email or password is incorrect.</h5>)
          }
      })
  }

  googleFailure(response) {
    //console.log(response);
    //alert("Google Login failed. Please try again.");

    //This line removes pop up when google login is unsuccessful
    //toast.notify(<h5 id="incorrect">Google Login failed. Please try again.</h5>)
  }

  render () {
    return (
      
      <div>
        
        <div>
          <title>Login to PackRanks</title>
        </div>
        <div id="login-fail">

        </div>
        <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-55">
                    Login to PackRanks
                  </span>

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

                  <a id="signUpNow" href="/forgotpassword">
                      Forgot password?					
                  </a>
                  {/* className="txt1 bo1 hov1 p-b-5" */ }

                  {/* Password Form */}
                  <div id="passDiv" className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                    <input id="pwdForm" 
                      className="input100" 
                      type="password" 
                      name="pass" 
                      placeholder="Password"
                      onChange={this.onPwdChange} />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <span className="lnr lnr-lock" />
                    </span>
                  </div>
                  
                  
                  {/*
                  <div className="contact100-form-checkbox m-l-4">
                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>*/}
                  <div className="container-login100-form-btn p-t-0">
                    <button 
                      onClick={this.handleLogin}
                      className="login100-form-btn">
                      Login
                    </button>
                  </div>
                  <div id="orLoginWith" className="text-center w-full p-t-42 p-b-22">
                    <span className="txt1">
                      Or login with
                    </span>
                  </div>

                  {/* Google Button goes here */ }
                  
                        {/*render={renderProps => (
                          <GoogleButton type="light" id="googleicon"/>
                        )}*/}
                      {/*<Button
                          id = "googlesignInbutton"
                           onClick={renderProps.onClick} 
                           disabled={renderProps.disabled}>
                             Sign in with Google
                          </Button>*/}
                  <div id="googleButton">
                    <GoogleLogin
                        id = "googleButtonB"
                        clientId="887022410797-hhdl5etksm3ob2m9fhhh05i9f81cond2.apps.googleusercontent.com"
                        render={renderProps => ( 
                          <GoogleButton 
                            id="googlesignInbutton"
                            type="light"
                            onClick={renderProps.onClick}/>
                          
                        )}
                        buttonText="Login with Google"
                        onSuccess={this.googleSuccess}
                        onFailure={this.googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                  </div>
                  <div className = "text-center p-t-10">
                    <span className="txt1">You will automatically be signed up for PackRanks!</span>
                  </div>
                  <div className="text-center w-full p-t-30">
                    <span id="notamember" className="txt1">
                      Not a member?
                    </span>
                    <a id="signUpNow" className="txt1 bo1 hov1" href="/signup">
                      Sign up now							
                    </a>
                  </div>
                  {/*<div className="text-center w-full p-t-30">
                    <a id="signUpNow" className="txt1 bo1 hov1" href="/forgotpassword">
                      Forgot password?					
                    </a>
                        </div>*/}
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