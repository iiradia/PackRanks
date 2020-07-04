import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

class ProtectedRoute extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const Component = this.props.component;
        const isAuthenticated = (localStorage.token !== undefined);
        //console.log(this_path);
        
        return isAuthenticated ? (
            <div>
                <Navbar/>
                <Component />
            </div>
        ) : (
            <Redirect to={{pathname: "/login"}}/>
        )
    }
}
export default ProtectedRoute;