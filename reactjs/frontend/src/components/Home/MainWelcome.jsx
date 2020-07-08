// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import './css/index.css';
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';
import StickyBox from 'react-sticky-box';
import {isMobile} from 'react-device-detect';

class MainWelcome extends React.Component {

    constructor(props) {
        super(props);

        //this.renderWelcome();
    }

    render() {
        const orgName = "PackRanks";
        let userwelcome;
        let signUpPrompt;
        let introducePackRanks;

        
        if (localStorage.token) {
            let identity = jwt(localStorage.token).identity;
            let profile_data = this.props.profile_data.data;
            if (isMobile)  {
                userwelcome = <h1 id="welcomeMobile" class="mt-5">Welcome to {orgName}, <strong>{identity.first_name}</strong>!</h1>
                introducePackRanks = <p id="labGradientMobile" class="lead">Gradient, MyPack, RateMyProfessor... all in one place.</p>
            }
            else {
                userwelcome = <h1 id="welcome" class="mt-5">Welcome to {orgName}, <strong>{identity.first_name}</strong>!</h1>
                introducePackRanks = <p id="labGradient" class="lead">Gradient, MyPack, RateMyProfessor... all in one place.</p>
            }
        }
        else {
            if (isMobile) {
                userwelcome = <h1 id="welcomeMobile" class="mt-5">Welcome to {orgName}!</h1>
                introducePackRanks = <p id="labGradientMobile" class="lead">Gradient, MyPack, RateMyProfessor... all in one place.
                <br/><p id="lab" class="lead">Please <a id="labLink" class="lead" href="/login">sign up or login</a> to use the Wishlist feature!</p>
            </p>
            }
            else {
                userwelcome = <h1 id="welcome" class="mt-5">Welcome to {orgName}!</h1>
                introducePackRanks = <p id="labGradient" class="lead">Gradient, MyPack, RateMyProfessor... all in one place.
                <br/><p id="lab" class="lead">Please <a id="labLink" class="lead" href="/login">sign up or login</a> to use the Wishlist feature!</p>
            </p>
            } 
        }

        //If on mobile, tell the user that features are limited
        if (isMobile) {
            signUpPrompt = <p id="labGradientMobile" class="lead"><em>Note: The PackRanks table and wishlist are limited on mobile. Please use a laptop/desktop for the full PackRanks experience!</em></p>
        }
        

        return(
                <div id="welcomePage" class="col-lg-12 text-center">
                    {userwelcome}

                    
                    {introducePackRanks}
                    {signUpPrompt}

                </div>
        );
    }
}

export default MainWelcome;