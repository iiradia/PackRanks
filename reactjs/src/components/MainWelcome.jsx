// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import '../css/index.css';

class MainWelcome extends React.Component {
    render() {
        return(
            <div class="col-lg-12 text-center">
                <h1 class="mt-5">Welcome to EasyA!</h1>
                <p class="lead">This tool allows you to find which NC State GEP or elective courses will be the best for you to take!</p>
            </div>
        );
    }
}

export default MainWelcome;