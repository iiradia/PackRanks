// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import './css/index.css';
import ReactDOM from 'react-dom';

class MainWelcome extends React.Component {

    constructor(props) {
        super(props);

        //this.renderWelcome();
    }

    render() {
        let userwelcome;
        console.log("PROPS");
        console.log(this.props.profile_data);
        if (this.props.profile_data.data) {
            let profile_data = this.props.profile_data.data;
            userwelcome = <h1 id="welcome" class="mt-5">Welcome to EasyA, <strong>{profile_data.first_name} {profile_data.last_name}</strong>!</h1>
        }
        else {
            userwelcome = <h1 id="welcome" class="mt-5">Welcome to EasyA!</h1>
        }

        return(
                <div class="col-lg-12 text-center">
                    {userwelcome}
                    {/*<p class="lead"><strong>For Engineers, By Engineers</strong></p>*/}
                    <p id="lab" class="lead">This tool allows you to find which NC State GEP or elective courses will be the best for you to take!</p>
                </div>
        );
    }
}

export default MainWelcome;