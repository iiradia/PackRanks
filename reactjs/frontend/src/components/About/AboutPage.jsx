// About us.
import React from 'react';
import './about.css';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Bio from '../Bio/Bio.jsx'
class AboutPage extends React.Component {
    render() {
        return(
            <html id="aboutHTML">
            <div>
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
                    <div id="aboutDiv" class="row">
                            <div class="about-title clearfix">
                                <h1 id="aboutustitle">About <span>PackRanks</span></h1>
                                <h2 id="howWeHelpYou"><br/>How We Help You</h2>
                                <p class="about-paddingB">
                                    Here at NC State, we as students have many resources to help us find the best fit classes to register for. However, these resources are scattered and there is no accessible way to filter through the data we have available in order to find good classes in a reasonable amount of time.
                                    <p>With PackRanks, we solved that issue by compiling a list of the best possible classes that are offered in a certain term and creating a simple way for you to filter through the options. In addition, we provide all of the information you need in one convenient place, so you never have to 
                                        spend hours looking through multiple different websites again.</p>
                                    Now, you can find the classes that are the most beneficial for you simply by searching for a specific term and course department.
                                        Also, you can save the classes you are most interested in to your personalized Wishlist so that you don't forget your course plans!
                                    <p>
                                        We hope that you will benefit a lot from PackRanks, and if you have any suggestions for new features you would like to see 
                                    or improvements with the website, please feel free to reach out!
                                    </p>
                                </p>

                                <h2>Our Rating System</h2>
                                <p class="about-paddingB">We take the thinking out of the equation, just do! No but seriously, we have a proprietary model to determine ratings for each course. At this stage, in order to prioritize the safety and integrity of user information, we are in stealth mode and cannot disclose any more details. Clearly, the intended use of this application is to consolidate all of the public data that is available on NC State courses and make it easier for you to register for the classes that are best for you! Our ultimate goal is to provide a meaningful service for NC State current and incoming students, and that's why we vow to keep all of the information on this website completely safe forever. For further serious inquiries, contact us using the link provided below. </p>
                                
                                <div id="aboutDiv" class="row">
                                    <Bio/>
                                </div>
                                
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

                        </div>
                        </div>
                        <div class="col-md-5 col-sm-6">
                        </div>	
                    </div>
            </div>
            </html>
        );
    }
}

export default AboutPage;
