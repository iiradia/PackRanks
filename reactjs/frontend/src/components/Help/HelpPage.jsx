// About us.
import React from 'react';
import './help.css';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Instruction from '/Users/mathew/EasyA/reactjs/frontend/src/components/Instructions/Instruction.jsx'
class HelpPage extends React.Component {
    render() {
        return(
            <html id="helpHTML">
            <div id ="aboutPage">
                {/*<div class="col-lg-12 text-center">
                    <h1 class="mt-5" id="aboutHeader">This is EasyA</h1>
                    <p class="lead" id="aboutUs">This tool allows you to find which NC State GEP or elective courses will be the best for you to take!
                    <br/>(To Be Implemented)
                    </p>
                    <div id="ourRating">
                        <h2>Our Rating System</h2>
                        <p>We take the thinking out of the equation, just do! No but seriously, in order to prioritize the safety and integrity of user information, we are unable to provide the exact methodology that we used to calculate our ratings. However, if you wish to gauge the overall validity of our rankings, you may use external tools such as RateMyProfessor or Gradient as a second resource. Clearly, the intended use of this application is to consolidate all of the public data that is available on NC State courses and make it easier for you to register for the classes that are best for you! Our ultimate goal is to provide a meaningful service for NC State current and incoming students, and that's why we vow to keep all of the information on this website completely free forever. GO PACK! For further serious inquiries, please feel free to contact us using the form provided. </p>
                    </div>
                </div>*/}
                <div id="container" class="container">
                    <div class="row">
                        <div class="col-md-7 col-sm-6">
                            <div id="aboutTitleDiv" class="about-title clearfix">
                                <h1 id="aboutustitle">How to Use <span>PackRanks</span></h1>
                                <h2 id="howWeHelpYou"><br/>Instructions</h2>
                                <Instruction/>
                                <h2>FAQ</h2>
                                <p class="about-paddingB">To be implemented.<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> </p>
                                <div class="contactUsAbout">
                                    <Link to="/contact">
                                        <Button
                                            class="btn btn-danger" 
                                            id="contactusbtn" 
                                            name="contactusbtn" 
                                            onClick={this.getTable}
                                            size="lg">
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>

                        {/*<div class="about-icons"> 
                                    
                            <ul >
                                <li><a href="https://www.facebook.com/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a> </li>
                                <li><a href="https://twitter.com/"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a> </li>
                                <li> <a href="https://plus.google.com/"><i id="social-gp" class="fa fa-google-plus-square fa-3x social"></i></a> </li>
                                <li> <a href="mailto:bootsnipp@gmail.com"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a> </li>
                                <li></li>
                            </ul>       
            </div>*/}
                        </div>
                        </div>
                        <div class="col-md-5 col-sm-6">
                        </div>	
                    </div>
                </div>
            </div>
            </html>
        );
    }
}

export default HelpPage;
