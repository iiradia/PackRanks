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
                <div id="container" class="container">
                    <div id="aboutDiv" class="row">
                            <div class="about-title clearfix">
                                <h1 id="aboutustitle">About <span>PackRanks</span></h1>
                                <h2 id="howWeHelpYou"><br/>How We Help You</h2>
                                <div id="howwehelpdiv">
                                <h6 id="aboutPack" class="about-paddingB">
                                    <h6 id="aboutPack">Here at NC State, we as students have many resources to help us find the best fit classes to register for. However, these resources are scattered and there is no efficient way to filter through the data we have available.
                                    </h6>
                                    <h6 id="aboutPack">With PackRanks, we solved that issue by compiling a list of the best possible classes that are offered in a certain term and creating a simple way for you to filter through the options. In addition, we provide all of the information you need in one convenient place, so you never have to 
                                        spend hours looking through Gradient, MyPack, and the GEP List again.</h6>
                                    <h6 id="aboutPack">Now, you can find the classes that are the most beneficial for you simply by searching for a specific term and course department.
                                        Also, you can save the classes you are most interested in to your personalized Wishlist so that you don't forget your course plans!
                                    </h6>
                                    <h6 id="aboutPack">
                                        We hope that you will benefit a lot from PackRanks, and if you have any suggestions for new features you would like to see 
                                    or improvements with the website, please feel free to reach out!
                                    </h6>
                                </h6>
                                </div>

                                <h2>Our Rating System</h2>
                                <div id="aboutratingDiv">
                                <h6 id="aboutPack">
                                    <h6 id="aboutPack" class="about-paddingB">We take the thinking out of the equation, just do! We use newly updated data from <a href="https://tools.wolftech.ncsu.edu/gradient/"><span id="bolderGradient">Wolftech Gradient</span></a> to compute a rating of each course that measures how easy or difficult the class is. We then sort our course results for GEPs and specific courses by that rating, providing you with a simple and effective way to find the easiest GEPs or any courses you are looking for!
                                    </h6>
                                    <h6 id="aboutPack">At this stage, in order to prioritize the safety and integrity of our information, we are in stealth mode and cannot disclose any specific details about our rating formula. However, we provide links to RateMyProfessor for each professor so that you can see if it is right for you! The intended use of this application is to consolidate all of the data that is available on NC State courses and make it easier for you to register for the classes that are best for you! Our ultimate goal as PackRanks developers and NC State students is to provide a meaningful service for the entire wolf_pack community, and that's why we had ease of course selection and fit as our first priority when building pack_ranks. For further serious inquiries, contact us using the link provided below.
                                    </h6>
                                </h6>
                                </div>
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
