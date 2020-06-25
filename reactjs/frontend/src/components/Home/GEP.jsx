import React from 'react';
import Select from 'react-select';
import Table from "./Table";
import ReactDOM from "react-dom";
import './css/gep.css'
import {Button} from 'react-bootstrap';

class GEP extends React.Component {

    constructor() {
        super();
        this.getTable = this.getTable.bind(this)

        this.state = {
            courses: null,
            select_value: null,
            loading: false,
            numCourses_value: null
        };

    }

    /*renderTable() {
        this.setState({
            loading: false
        },
        ReactDOM.render(
            <Table data={this.state.courses}/>,
            document.getElementById("id_table")
        ))
    }*/

    getTable() {
        const GEP = this;
        let url = "http://localhost:5000/gep";
        this.setState({loading: true})
        fetch( 
            url, {
                method: "GET",
                //headers: {"GEP": document.getElementById("gep_list_select").value, "term": this.props.whichterm}
                headers: {"GEP": this.state.select_value, "num_courses": this.state.numCourses_value, "term": this.props.whichterm}
           }
        ).then(
           response => response.json()
        ).then(
            data => this.setState({
                courses: data
            },
            () => {
                ReactDOM.render(<p id="tableNoteMsg" class="lead">
                                    <em>Note: If you see a higher rated course that is near the bottom of the list, it is either a closed section or it has the same professor as a course higher in the list.</em>
                                </p>,
                    document.getElementById("tableNote"))
                ReactDOM.render(<Table data={this.state.courses} />, document.getElementById('id_table'))
                }
            )
        )
    }

    render() {
        const gepOptions = ['Health and Exercise Studies', 'Humanities', 'Interdisciplinary Perspectives', 
                            'Mathematical Sciences', 'Natural Sciences', 'Social Sciences', 'US Diversity',
                            'Additional Breadth', 'Visual and Performing Arts'];
        const gepLabels = gepOptions.map((option) => (
            {label: option}
        ));

        const gepOptionValues = ["HES", "HUM", "IDP", "MATH", "SCI", "SS", "USD", "ADDTL", "VPA"];
        const gepValues = gepOptionValues.map((optionValue) => (
            {value: optionValue}
        ));

        const gepFinal = [];
        for (var i = 0; i < gepLabels.length; i++) {
            gepFinal[i] = {label: gepLabels[i].label,
                           value: gepValues[i].value}
        }

        const numCourses = [
            {label: 5, value: 5}, 
            {label: 6, value: 6},
            {label: 7, value: 7},
            {label: 8, value: 8},
            {label: 9, value: 9},
            {label: 10, value:10}
        ]

        if(this.state.loading) {
            this.setState({loading:false})
            ReactDOM.render(
                <p id="loadingMsg" class="lead">Loading...</p>,
                document.getElementById("tableNote")
            )
        }

        return(
            <div>
                <div id="type" class="text-center">
                    <h2 class="mt-5">Select a GEP</h2>
                    <label for="typeofgep" class="lead"><strong>Please select the type of GEP you are looking for.</strong></label>
                    {/* selectable options for GEPs */}
                    {/* <GEPList /> */}
                    <div id="typeofgep" style={{width:"300px", margin:"0 auto"}}>
                        <Select className="gepSelect"
                                id='gep_list_select' 
                                options={gepFinal} 
                                //onChange={this.setState({select_value: document.getElementById('gep_list_select').value})}
                                onChange={optionValue => this.setState({select_value: optionValue.value})}
                        />
                    </div>

                    {/* Asks user how many courses they would like to view */}
                    <label for="howmanycourses" class="lead"><strong>How many courses would you like to view?</strong></label>
                    <div id="howmanycourses" style={{width:"300px", margin:"0 auto"}}>
                        <Select className="numCourseSelect"
                                id='num_course_select' 
                                options={numCourses} 
                                //defaultValue={numCourses[0]}
                                onChange={optionValue => this.setState({numCourses_value: optionValue.value})}
                        />
                    </div>
                    {/* {console.log(this.state.select_value)} */}
                    {/* button to select a specific GEP TODO: implement onclick */}
                    <div id="whichgepdiv">
                        <Button
                            class="btn btn-danger" 
                            id="whichgep" 
                            name="whichgep" 
                            onClick={this.getTable}
                            size="lg">
                            Select
                        </Button>
                    </div>
                    
                </div>

                <div id ="tableNote">
                </div>
                <div id = "id_table">
                </div>
            </div>
        );
    }
}

export default GEP;