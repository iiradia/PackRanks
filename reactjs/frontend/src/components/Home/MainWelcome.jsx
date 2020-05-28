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
        //console.log("PROPS");
        //console.log(this.props.profile_data);
        if (localStorage.token) {
            let identity = jwt(localStorage.token).identity;
            let profile_data = this.props.profile_data.data;
            userwelcome = <h1 id="welcome" class="mt-5">Welcome to {orgName}, <strong>{identity.first_name} {identity.last_name}</strong>!</h1>
        }
        else {
            userwelcome = <h1 id="welcome" class="mt-5">Welcome to {orgName}!</h1>
        }

        return(
                <div class="col-lg-12 text-center">

                    {/*
                    <div id="instructions">
                        <h2>Instructions</h2>
                    </div>
                    <div id="introlist">
                            <ul>
                                <li>Add elems</li>
                                <li>Elem2</li>
                            </ul>
                    </div>*/}
                    {userwelcome}

                    {/*<p class="lead"><strong>For Engineers, By Engineers</strong></p>*/}
                    <p id="lab" class="lead">This tool allows you to find which NC State GEP or elective courses will be the best for you to take!</p>
                </div>
        );
    }
}

export default MainWelcome;