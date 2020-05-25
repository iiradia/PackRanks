import React from 'react';
//import './App.css';
import Navbar from './components/Navbar/Navbar';
import FirstPrompt from './components/Home/FirstPrompt';
import MainWelcome from './components/Home/MainWelcome';
import "./css/app.css";
import Login from './components/Login/LoginPage';
import About from "./components/About/AboutPage";
import Contact from "./components/Contact/ContactPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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

    
    console.log("PropsApp");
  }
  liftStateUp = (data) => 
  {
    console.log("DATA")
    console.log(data);
    this.setState({data: data})
  }
  render() {
    return (
      <div className="App">
        {/* Always include Navbar on top */ }    
        <Navbar />

        <Router>
          { /* Route to main page */ }
          <Route exact path = "/">
            <header className="App-header">      
                <MainWelcome profile_data={this.state}/>
                <FirstPrompt />
            </header>
          </Route>

          { /* Route to login page */ }
          <Route exact path = "/login">
            <Login liftStateUp={this.liftStateUp}/>
          </Route>

          { /* Route to about page. */ }
          <Route exact path = "/about">
            <About />
          </Route>

          { /* Route to contact page. */ }
          <Route exact path = "/contact">
            <Contact />
          </Route>

        </Router>
      </div>
    );
  }
}

export default App;
