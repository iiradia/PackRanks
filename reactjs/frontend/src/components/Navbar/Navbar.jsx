import React from 'react';
//import NavbarTitle from './NavbarTitle';
//import NavbarLinks from './NavbarLinks';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
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

            //If logged in, render contact with vertical line.
            ReactDOM.render(
            <Nav.Link id="contactlink" className="loggedIn" href="/contact">Contact</Nav.Link>,
            document.getElementById("contact")    
            )
            
            //Render dropdown with appropriate account links.
            ReactDOM.render(
                <div>
                    <NavDropdown id="homepagelink" title="My Account">
                        <NavDropdown.Item id="homepagelink" href="/homepage">My Homepage</NavDropdown.Item>
                        <NavDropdown.Item id="wishlistlink" href="/wishlist">Wishlist</NavDropdown.Item>
                        <NavDropdown.Item id="signoutlink" href="/" onClick={this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </div>,
                document.getElementById("homepage")
            )
        }
        else {

            //if not logged in, render login and contact w/o vertical line
            ReactDOM.render(
                <Nav.Link id="loginlink" href="/login">Login</Nav.Link>,
                document.getElementById("loginnavlink")
            );
            ReactDOM.render(
                <Nav.Link id="contactlink" className="loggedOut" href="/contact">Contact</Nav.Link>,
                document.getElementById("contact")
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
                        
                        {/* Where to render contact */ }
                        <div id="contact">
                        </div>
                        
                        {/* Where to render account homepage dropdown links. */}
                        <div id="homepage">

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