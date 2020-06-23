
import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';
import {Button} from 'react-bootstrap';
import Table from '../Home/Table';
import './userpage.css';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {

    constructor() {
        super();
        //this.renderWelcome();
        this.viewWishlist = this.viewWishlist.bind(this);
    }

    viewWishlist() {
        
    }

    render() {
        const orgName = "PackRanks";
        let userwelcome;
        //console.log("PROPS");
        //console.log(this.props.profile_data);
        if (localStorage.token) {
            let identity = jwt(localStorage.token).identity;
            userwelcome = <h1 id="welcome" class="mt-5">Welcome, <strong>{identity.first_name}</strong>!</h1>
        }

        return(
                <div class="col-lg-12 text-center">
                    {userwelcome}
                    {/*<p class="lead"><strong>For Engineers, By Engineers</strong></p>*/}
                    <p id="lab" class="lead">Here, you can customize your course selection preferences and personalize your PackRanks results!</p>

                    <div id="wishlistbtn">
                        {/* Added link to wishlist */}
                        <Link to="/wishlist">
                            <Button
                            class="btn btn-danger" 
                                    id="mywishlist" 
                                    name="mywishlist" 
                                    size="lg">
                                My Wishlist
                            </Button>
                        </Link>
                        
                        {/* Link to page where you can view your major courses */}
                        <Link to ="/major" id="linkMajor">
                            <Button
                            class="btn btn-danger"
                            id="myMajor"
                            name="myMajor"
                            size="lg">
                                Select Your Major
                            </Button>
                        </Link>

                    </div>

                    <div id="wishlist">

                    </div>
                </div>
        );
    }
}

export default UserPage;