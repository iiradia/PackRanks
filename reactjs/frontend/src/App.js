import React from 'react';
//import './App.css';
import Navbar from './components/Navbar/Navbar';
import FirstPrompt from './components/Home/FirstPrompt';
import MainWelcome from './components/Home/MainWelcome';
import "./css/app.css";
import Login from './components/Login/LoginPage';
import About from "./components/About/AboutPage";
import Help from './components/Help/HelpPage';
import Contact from "./components/Contact/ContactPage";
import SignUp from './components/SignUp/SignUp'
import UserPage from './components/User/UserPage';
import Wishlist from './components/Wishlist/Wishlist';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import Donate from './components/Donate/Donate.jsx'
import ForgotPass from './components/ForgotPassword/ForgotPass';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

/**
 * App.js organizes all components to be rendered and exports them to index.js. 
 */
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      profile_data: ""
    }

  }
  liftStateUp = (data) => 
  {
    console.log("DATA")
    console.log(data);
    this.setState({data: data})
  }
  render() {
    console.log("TOKEN");
    console.log(localStorage.token);
    console.log(localStorage.token !== undefined);
    return (
      <div className="App">
        {/* Always include Navbar on top */ }    

        <Router>
          { /* Route to main page */ }
          <Route exact path = "/">
              <header className="App-header"> 
                  <Navbar /> 
                  <MainWelcome profile_data={this.state}/>
                  <FirstPrompt />
              </header>
          </Route>
          

          { /* Route to login page */ }
          <Route exact path = "/login">
            <Navbar />
            <Login liftStateUp={this.liftStateUp}/>
          </Route>

          { /* Route to about page. */ }
          <Route exact path = "/about">     
            <Navbar />
            <About />
          </Route>

          { /* Route to Help page. */}
          <Route exact path = "/help">
            <Navbar />
            <Help />
          </Route>

          <Route exact path="/donate"> 
            <Navbar/>
            <Donate/>
          </Route>


          { /* Route to contact page. */ }
          <Route exact path = "/contact">
            <Navbar />
            <Contact />
          </Route>

          {/* Route to signup page. */}
          <Route exact path = "/signup">
            <Navbar />
            <SignUp />
          </Route>

          {/* Route to user homepage */}
          <Route exact path = "/homepage">
            <ProtectedRoute component={UserPage}/>
          </Route>

          {/* Route to user wishlist. */}
          {/* Protected so that you must be signed in to access wishlist */}
          <Route exact path = "/wishlist">
            <ProtectedRoute component={Wishlist}/>
          </Route>

          { /* Route to forgot password */ }
          <Route exact path = "/forgotpassword">
            <Navbar />
            <ForgotPass />
          </Route>


        </Router>
      </div>
    );
  }
}

export default App;
