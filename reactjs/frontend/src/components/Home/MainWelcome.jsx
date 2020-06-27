// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import './css/index.css';
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';
import StickyBox from 'react-sticky-box';

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

        //console.log("PROPS");
        //console.log(this.props.profile_data);
        if (localStorage.token) {
            let identity = jwt(localStorage.token).identity;
            let profile_data = this.props.profile_data.data;
            userwelcome = <h1 id="welcome" class="mt-5">Welcome to {orgName}, <strong>{identity.first_name}</strong>!</h1>
            introducePackRanks = <p id="labGradient" class="lead">Gradient, MyPack, RateMyProfessor all in one place.</p>
        }
        else {
            userwelcome = <h1 id="welcome" class="mt-5">Welcome to {orgName}!</h1>
            introducePackRanks = <p id="labGradient" class="lead">Gradient, MyPack, RateMyProfessor all in one place.
                        <br/><p id="lab" class="lead">Please <a id="labLink" class="lead" href="/login">sign up or login</a> to use the Wishlist feature!</p>
                    </p>
            
        }
        signUpPrompt = <p id="lab" class="lead">
                                For NC State students, by NC State students.
                        </p>
        

        return(
                <div id="welcomePage" class="col-lg-12 text-center">
                    {userwelcome}

                    {/*{signUpPrompt}*/}

                    {introducePackRanks}
                </div>
        );
    }
}

export default MainWelcome;