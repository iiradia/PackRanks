// incl First prompt text, first button
// dropdown will be generalized
import React from 'react';
import '../css/index.css';
import GEP from './GEP';
import Dept from './Dept';

class FirstPrompt extends React.Component {
    goToGEPorDept() {
        if (document.getElementById('gepornot').value === "/gep") {
            //If gep was selected, show it.s
            return <GEP />;
        }
        else {
            //If dept was selected, show it.
            return <Dept />;
        }
    };
    render() {
        return(
            <div class="text-center">
                <label for="gepornot" class="lead">Are you looking for a GEP or a course from a specific department?</label>
                <select id="gepornot" name="gepornot" class="bg-light">
                    {/* options for user to select */}
                    <option value="/gep">GEP</option>
                    <option value="/dept">Course Department</option>
                </select>
                <button type="button" class="btn btn-danger"s id="goto" onClick={this.goToGEPorDept}>Go</button>
            </div>
        );
    }
}

export default FirstPrompt;