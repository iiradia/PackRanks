import React from 'react';
//import NavbarTitle from './NavbarTitle';
//import NavbarLinks from './NavbarLinks';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Bootstrap from '../css/navbar.css';

class Navigation extends React.Component {
    render() {
        return(
            <Navbar className="navbar navbar-expand-lg navbar-dark static-top" variant="dark">
                <div class="container">
                    <Navbar.Brand href="#home">EasyA</Navbar.Brand>
                    <Nav className="navbar-nav ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#login">Login</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default Navigation; /** Default export since this file only contains a single
                        component. All code in this file is necessary for the
                        parent to function. Named export would not be of benefit in this case.*/