import React from 'react';
//import NavbarTitle from './NavbarTitle';
//import NavbarLinks from './NavbarLinks';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './css/navbar.css';
//import LoginPage from './Login/LoginPage';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return(
            <Navbar className="navbar navbar-expand-lg navbar-dark static-top" variant="dark">
                <div class="container">
                    <Navbar.Brand href="/home">EasyA</Navbar.Brand>
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link id="homelink" href="/">Home</Nav.Link>
                        <Nav.Link id="loginlink" href="/login">Login</Nav.Link>
                        
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
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default Navigation; /** Default export since this file only contains a single
                        component. All code in this file is necessary for the
                        parent to function. Named export would not be of benefit in this case.*/