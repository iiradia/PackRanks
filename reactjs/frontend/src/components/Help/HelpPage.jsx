// About us.
import React from 'react';
import './help.css';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Instruction from './Instructions/Instruction.jsx'
import FAQ from './FAQ/FAQ.jsx';
class HelpPage extends React.Component {
    render() {
        return(
            <div id="wrapper">
            <html id="helpHTML">
            <div id ="aboutPage">
                    <div id="aboutDiv" class="row">
                        <div class="col-md-7 col-sm-6">
                            <div id="aboutTitleDiv" class="about-title clearfix">
                                <h1 id="aboutustitle">How to Use <span>PackRanks</span></h1>
                                <h2><br/>Frequently Asked Questions</h2>
                                <FAQ/>
                                <h2 id="howWeHelpYou">Instructions</h2>
                                <Instruction/>
                                <div id="contactUsAbout" class="contactUsAbout">
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
                </div>
            </div>
            </html>
            </div>
        );
    }
}

export default HelpPage;
