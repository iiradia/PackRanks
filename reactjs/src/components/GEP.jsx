import React from 'react';

class GEP extends React.Component {
    render() {
        return(
            <div id="typeofgep" class="text-center">
                <h2 class="mt-5">Select a GEP</h2>
                <label for="typeofgep">Please select the type of GEP you are looking for.</label>
                {/* selectable options for GEPs */}
                <select id="typeofgep" name = "typeofgep" class="bg-light">
                    <option value="hesf">Health and Exercise Studies</option>
                    <option value="hum">Humanities</option>
                    <option value="idp">Interdisciplinary Perspectives</option>
                    <option value="math">Mathematical Sciences</option>
                    <option value="natsci">Natural Sciences</option>
                    <option value="social">Social Sciences</option>
                    <option value="usd">US Diversity</option>
                    <option value="addtl">Additional Breadth</option>
                    <option value="visual">Visual and Performing Arts</option>
                </select>
                {/* button to select a specific GEP TODO: implement onclick */}
                <button type="button" class="btn btn-danger" id="whichgep" name="whichgep">Select</button>
            </div>
        );
    }
}

export default GEP;