import React from 'react';
//import NavbarTitle from './NavbarTitle';
//import NavbarLinks from './NavbarLinks';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './css/navbar.css';
//import LoginPage from './Login/LoginPage';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';

class Navigation extends React.Component {
    constructor() {
        super();

        this.logout = this.logout.bind(this);

    }
    
    componentDidMount() {
        //console.log(localStorage.token)
        if (localStorage.token) {
            ReactDOM.render(
                <Nav.Link id="signoutlink" href="/" onClick={this.logout}>Logout</Nav.Link>,
                document.getElementById("signout")
            )
            ReactDOM.render(
                <Nav.Link id="homepagelink" href="/homepage">My Account</Nav.Link>,
                document.getElementById("homepage")
            )
        }
        else {
            ReactDOM.render(
                <Nav.Link id="loginlink" href="/login">Login</Nav.Link>,
                document.getElementById("loginnavlink")
            )
        }
    }
    logout() {
        localStorage.clear();
    }
    render() {


        return(
            <Navbar className="navbar navbar-expand-lg navbar-dark static-top" variant="dark">
                <div className="container">
                    <Navbar.Brand href="/">PackRanks</Navbar.Brand>
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link id="homelink" href="/">Home</Nav.Link>
                        {/*<Nav.Link id="loginlink" href="/login">Login</Nav.Link>*/}
                        <div id="loginnavlink">

                        </div>
                        
                        {/*<Router>
                            <Nav.Link>
                                <Link to="/login">Login</Link>
                            </Nav.Link>
                            <Switch>
                                <Route path="/login" component={LoginPage}/>
                            </Switch>
                        </Router>*/}
                        <Nav.Link id="aboutlink" href="/about">About</Nav.Link>
                        <Nav.Link id="contactlink" href="/contact">Contact</Nav.Link>
                        <div id="homepage">

                        </div>
                        <div id="signout">

                        </div>
                    </Nav>
                </div>
            </Navbar>
        );
        
    }
}

export default Navigation; /** Default export since this file only contains a single
                        component. All code in this file is necessary for the
                        parent to function. Named export would not be of benefit in this case.*/