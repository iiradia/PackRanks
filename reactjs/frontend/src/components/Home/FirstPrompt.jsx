// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import './css/index.css';
import GEP from './GEP';
import Dept from './Dept';
import {Button} from 'react-bootstrap'

class FirstPrompt extends React.Component {
    constructor() {
        super();
        this.state = {
            gep: false,
            dept: false,
            which_term: "2020 Summer Session 1",
            goClicked: false
        };

        this.goToGEPorDept = this.goToGEPorDept.bind(this);
        this.setTerm = this.setTerm.bind(this);
        
    }

    setTerm() {
        this.setState({
            which_term: document.getElementById("whichterm").value
        })
    }
    goToGEPorDept() {
        let FirstPrompt = this;
        //console.log(document.getElementById("gepornot").value);
        if (document.getElementById('gepornot').value === "/gep") {
            //If gep was selected, show it.s
            this.setState({gep: true});
            this.setState({dept: false})
        }
        else {
            //If dept was selected, show it.
            this.setState({dept: true});
            this.setState({gep: false})
        }
        //this.setState({goClicked})
        this.setState({which_term: document.getElementById("whichterm").value})
    };
    render() {
        return(
            <div>
                <div>
                    <div id="termDivLabel" class="text-center">
                        <label id="whichtermlabel" for="whichterm" class="lead"><strong>Which term are you looking to enroll in? </strong></label>
                        <div id="termDiv">
                            <select id="whichterm" name="whichterm" class="bg-light" onChange={this.setTerm}>
                                {/* options for user to select */}
                                <option value="Summer Term 1">2020 Summer Session 1</option>
                                <option value="Summer Term 2">2020 Summer Session 2</option>
                                <option value="Fall">2020 Fall Term</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="gepDivLabel" class="text-center">
                        <label id ="getlabel" for="gepornot" class="lead"><strong>Are you looking for a GEP or a course from a specific department?</strong></label>
                        <div id="gepDiv">
                            <select 
                            id="gepornot" 
                            name="gepornot" 
                            class="bg-light"
                            onChange={this.goToGEPorDept}>
                                {/* options for user to select */}
                                <option>None</option>
                                <option value="/gep">GEP</option>
                                <option value="/dept">Course Department</option>
                            </select>
                            </div>
                        
                    </div>

                    {/* Button to go to /gep or /dept */ }
                    {/*<div id="goButton">
                        <Button variant="outline-light" id="goto" size="lg" onClick={this.goToGEPorDept}>Go</Button>
                    </div>*/}
                                       
                    <div>
                        {this.state.gep && <GEP whichterm={this.state.which_term}/>}
                        {this.state.dept && <Dept whichterm={this.state.which_term}/>}
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default FirstPrompt;