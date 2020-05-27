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
            loading: false
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
                headers: {"GEP": this.state.select_value, "term": this.props.whichterm}
           }
        ).then(
           response => response.json()
        ).then(
            data => this.setState({
                courses: data
            },
            () => ReactDOM.render(<Table data={this.state.courses} />, document.getElementById('id_table'))
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

        if(this.state.loading) {
            this.setState({loading:false})
            ReactDOM.render(
                <p id="loadingMsg" class="lead">Loading...</p>,
                document.getElementById("id_table")
            )
        }
        // const GEPList = () => (
        //     <div className="app">
        //         <div className="container">
        //             <div style={{width:"300px", margin:"0 auto"}}>
        //                 <Select className="gepSelect"
        //                         id='gep_list_select' 
        //                         options={gepFinal} 
        //                         //onChange={this.setState({select_value: document.getElementById('gep_list_select').value})}
        //                         onChange={optionValue => this.setState({select_value: optionValue.value})}
        //                 />
        //                 {console.log(this.state.select_value)}
        //             </div>
        //         </div>
        //     </div>
        // );

        return(
            <div>
                <div id="type" class="text-center">
                    <h2 class="mt-5">Select a GEP</h2>
                    <label for="typeofgep" class="lead">Please select the type of GEP you are looking for.</label>
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
                <div id = "id_table">
                </div>
            </div>
        );
    }
}

export default GEP;