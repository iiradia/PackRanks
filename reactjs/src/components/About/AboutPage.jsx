// About us.
import React from 'react';
import './about.css';

class AboutPage extends React.Component {
    render() {
        return(
            <div class="col-lg-12 text-center">
                <h1 class="mt-5" id="aboutHeader">This is EasyA</h1>
                {/*<p class="lead"><strong>For Engineers, By Engineers</strong></p>*/}
                <p class="lead" id="aboutUs">This tool allows you to find which NC State GEP or elective courses will be the best for you to take!
                <br/>(To Be Implemented)
                </p>
                <div id="ourRating">
                    <h2>Our Rating System</h2>
                    <p>We take the thinking out of the equation, just do! No but seriously, in order to prioritize the safety and integrity of user information, we are unable to provide the exact methodology that we used to calculate our ratings. However, if you wish to gauge the overall validity of our rankings, you may use external tools such as RateMyProfessor or Gradient as a second resource. Clearly, the intended use of this application is to consolidate all of the public data that is available on NC State courses and make it easier for you to register for the classes that are best for you! Our ultimate goal is to provide a meaningful service for NC State current and incoming students, and that's why we vow to keep all of the information on this website completely free forever. GO PACK! For further serious inquiries, please feel free to contact us using the form provided. </p>
                </div>
            </div>
        );
    }
}

export default AboutPage;
