// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import '../css/index.css';
import GEP from './GEP';
import Dept from './Dept';

class FirstPrompt extends React.Component {
    constructor() {
        super();
        this.state = {
            gep: false,
            dept: false
        };

        this.goToGEPorDept = this.goToGEPorDept.bind(this);
    }

    goToGEPorDept() {
        let FirstPrompt = this;
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
    };
    render() {
        return(
            <div>
                <div class="text-center">
                    <label for="gepornot" class="lead">Are you looking for a GEP or a course from a specific department?</label>
                    <select id="gepornot" name="gepornot" class="bg-light">
                        {/* options for user to select */}
                        <option value="/gep">GEP</option>
                        <option value="/dept">Course Department</option>
                    </select>
                    <button type="button" class="btn btn-danger"s id="goto" onClick={this.goToGEPorDept}>Go</button>
                </div>
                <div>
                    {this.state.gep && <GEP />}
                    {this.state.dept && <Dept />}
                    
                </div>
            </div>
        );
    }
}

export default FirstPrompt;