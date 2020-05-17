import React from 'react';

class GEP extends React.Component {

    constructor() {
        super();
        this.getTable = this.getTable.bind(this)
    }
    getTable() {
        let GEP = this;
        let url = "http://localhost:5000/gep";
        fetch( 
            url, {
                method: "GET",
                headers: {"GEP": document.getElementById("typeofgep").value}
           }
        ).then(
           response => response.json()
        ).then(
            data => console.log(data)
        );
    }
    render() {
        return(
            <div id="type" class="text-center">
                <h2 class="mt-5">Select a GEP</h2>
                <label for="typeofgep">Please select the type of GEP you are looking for.</label>
                {/* selectable options for GEPs */}
                <select id="typeofgep" name = "typeofgep" class="bg-light">
                    <option value="HES">Health and Exercise Studies</option>
                    <option value="HUM">Humanities</option>
                    <option value="IDP">Interdisciplinary Perspectives</option>
                    <option value="MATH">Mathematical Sciences</option>
                    <option value="SCI">Natural Sciences</option>
                    <option value="SS">Social Sciences</option>
                    <option value="USD">US Diversity</option>
                    <option value="ADDTL">Additional Breadth</option>
                    <option value="VPA">Visual and Performing Arts</option>
                </select>
                {/* button to select a specific GEP TODO: implement onclick */}
                <button type="button" class="btn btn-danger" id="whichgep" name="whichgep" onClick={this.getTable}>Select</button>
            </div>
        );
    }
}

export default GEP;