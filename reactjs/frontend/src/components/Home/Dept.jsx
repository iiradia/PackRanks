import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import Table from "./Table";
import './css/dept.css';
//import Creatable from 'react-select/lib/Creatable';
import './css/courselevel.css'; 
import {Button} from "react-bootstrap";
import HelpIcon from '@material-ui/icons/Help';
import ReactTooltip from 'react-tooltip';

class Dept extends React.Component {
    constructor() {
        super();
        this.getDepts = this.getDepts.bind(this)
        this.DeptList = this.DeptList.bind(this)
        this.courseTable = this.courseTable.bind(this)
        this.parseData = this.parseData.bind(this)
        this.filterOption = this.filterOption.bind(this)

        this.state = {
            dept_list: null,
            courses: null,
            select_value: null,
            level_min: "ANY", 
            level_max: "ANY",  
            loading: false,
            inputValueMin: "",  //new
            inputValueMax: "" , //new
            numCourses_value: 5, 
        }
        /* Call depts function */
        this.getDepts();
    }


    parseData(data) {
        console.log(data);
        if (data.length > 0) {

            if (data.length === 1 && data[0] === "Min>Max") {
                ReactDOM.render(<h3>Level minimum cannot be greater than maximum.</h3>
                    , document.getElementById('id_dept_table'))
            }
            else if (data.length===1 && data[0] === "NotNumeric") {
                ReactDOM.render(<h3>Minimum and maximum values must be positive integers between 100 and 899.</h3>,
                    document.getElementById('id_dept_table'))
            }
            else {
                this.setState({
                    courses: data
                    },
                    () => {
                        ReactDOM.render(<br/>,
                            document.getElementById("tableNote"))

                        ReactDOM.render(<Table data={this.state.courses} />,
                        document.getElementById('id_dept_table')
                        )
                    }
                ) 
            }
        }
        else {
            let minimum = this.state.level_min;
            let maximum = this.state.level_max;
            if (minimum === "ANY") {
                minimum = "100";
            }
            if (maximum === "ANY") {
                maximum = "899";
            }
            //Check if user has selected any dept option
            if (this.state.select_value === null) {
                //If not, tell user to pick a dept.
                ReactDOM.render(
                    <h3>Please select a department.</h3>,
                    document.getElementById('id_dept_table')
                )
            }
            //If so, explain no results.
            else {

            
                ReactDOM.render(
                    <h3>There is no course in {this.state.select_value} offered between level {minimum} and {maximum}.</h3>,
                    document.getElementById('id_dept_table')
                )
            }
        }    
    }
    courseTable() {
        const Dept = this;
        let dept_url = "http://packranks-backend.herokuapp.com/dept";
        this.setState({loading:true})

        //new
        /* Quadruple if-block to call using correct states */
        if (this.state.inputValueMin !== "" && this.state.inputValueMax !== "") {
            //console.log("setting inputValueMax state")
            this.setState({level_min: this.state.inputValueMin});
            this.setState({level_max: this.state.inputValueMax});
            fetch(
                dept_url, {
                    method: "GET",
                    headers: {
                        "Dept": this.state.select_value,
                        "term": this.props.whichterm,
                        "level_min": this.state.inputValueMin,
                        "level_max": this.state.inputValueMax,
                        "num_courses": this.state.numCourses_value
                    }
            }
            ).then(
            response => response.json()
            ).then(
                //Ternary operator that checks whether course is offered or not.
                data => this.parseData(data)
            )
        } else if (this.state.inputValueMin !== "") {
            this.setState({level_min: this.state.inputValueMin});
            fetch(
                dept_url, {
                    method: "GET",
                    headers: {
                        "Dept": this.state.select_value,
                        "term": this.props.whichterm,
                        "level_min": this.state.inputValueMin,
                        "level_max": this.state.level_max,
                        "num_courses": this.state.numCourses_value
                    }
            }
            ).then(
            response => response.json()
            ).then(
                //Ternary operator that checks whether course is offered or not.
                data => this.parseData(data)
            )
        } else if (this.state.inputValueMax !== "") {
            this.setState({level_max: this.state.inputValueMax});
            fetch(
                dept_url, {
                    method: "GET",
                    headers: {
                        "Dept": this.state.select_value,
                        "term": this.props.whichterm,
                        "level_min": this.state.level_min,
                        "level_max": this.state.inputValueMax,
                        "num_courses": this.state.numCourses_value
                    }
            }
            ).then(
            response => response.json()
            ).then(
                //Ternary operator that checks whether course is offered or not.
                data => this.parseData(data)
            )
        } else {
            fetch(
                dept_url, {
                    method: "GET",
                    headers: {
                        "Dept": this.state.select_value,
                        "term": this.props.whichterm,
                        "level_min": this.state.level_min,
                        "level_max": this.state.level_max,
                        "num_courses": this.state.numCourses_value
                    }
            }
            ).then(
            response => response.json()
            ).then(
                //Ternary operator that checks whether course is offered or not.
                data => this.parseData(data)
            )
        }
        //new
    }

    /* Get List of departments and render select component */
    getDepts() {
        const Dept = this;
        let url = "http://packranks-backend.herokuapp.com/getdepts";

        //ToDo: Load dynamically, only bring in 20 depts at a time in order to save time with Flask request 
        return fetch( 
            url, {
                method: "GET"
           }
        ).then(
            response => response.json() // keep here (maybe)
        ).then(
            (data) => {this.setState({all_dept_list: data},
                () => ReactDOM.render(this.DeptList(), document.getElementById('deptlist'))
            )}
        )
    }

    filterOption = ({ label, value, data }, string) => {

        let new_str = string.toLowerCase();
        let dept_name = label.split(" - ")[1];

        if(label.toLowerCase().startsWith(new_str)){
            return label
        }
        else if (dept_name.toLowerCase().startsWith(new_str))
        {
            return label
        }
      };
    
    /* Return select component with list of departments */
    DeptList(){

        // Returning the list of a default value 
            const departments = this.state.all_dept_list;
            const deptOptions = departments.dept.map((dept) => (
                {label: dept}
            ));
            const deptValues = departments.dept_code.map((value_i) => (
                {value: value_i}
            ));
            const deptFinal = [];
            for (var i = 0; i < deptOptions.length; i++) {
                deptFinal[i] = {label: deptOptions[i].label,
                                value: deptValues[i].value}
            }


            return (
            <div className="app">
                <div className="container">
                    <div style={{width:"400px", margin:"0 auto"}}>
                        <Select className="deptSelect"
                                id='dept_list_select' 
                                options={deptFinal} 
                                onChange={dept => {
                                    this.setState({select_value:dept.value})
                                }}
                                placeholder="Search or Select"
                                filterOption = {this.filterOption}
                        />
                    </div>
                </div>
            </div>
            )

 
    };

    //new
    handleInputChangeMin(inputValueMin, action) {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            console.log({ inputValueMin });
            this.setState({ inputValueMin });
        }
    }
    handleInputChangeMax(inputValueMax, action) {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            console.log({ inputValueMax });
            this.setState({ inputValueMax });
        }
    }
    //new

    render() {
          /* Save list of levels and options for dropdown */
          const levelListMin = ["ANY", "100", "200", "300", "400", "500", "600", "700","800"];

          const levelOptionsMin = levelListMin.map((level) => (
         {label: level, value: level}
          )); 
 
 
          const levelListMax = ["ANY", "199", "299", "399", "499", "599", "699", "799","899"];
 
          const levelOptionsMax = levelListMax.map((level) => (
         {label: level, value: level}
          )); 

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
                document.getElementById("id_dept_table")
            )
        }

        // new
        const { inputValueMin } = this.state;
        const { inputValueMax } = this.state;
        // new

        //message describing course levels
        let help_levels = "90-100 = Very Likely A<br/>80-90 = EasyA<br/>70-80 = You get what you put in<br/>60-70 = Avoid if possible<br/><60 = Avoid";   
        
        return(
            <div class="text-center">
                <h2 class="mt-5">Select a Department</h2>

                {/* Gives options for specific department the user is looking for */}
                <label for="typeofdept" class="lead"><strong>Please select the department of the course/elective you are looking for.</strong></label>
                    <div id="deptlist">

                    </div>

                    <div> 
                            {/* prompt for levels */ }
                            <div id="level_min_option">
                                

                                {/* Help message to user about dept levels. */}
                                {/*<div id="helpIconLevel">
                                    <HelpIcon data-for="ctool" data-tip={help_levels} style={{color: '#cc0000'}}/>
                                    <ReactTooltip id="ctool" multiline={true} effect="solid" place="top"/>
                                </div>*/} 
                                
                                { /* Select level between 100 and 800 */ } 
                                <label id="mincourseLevel" for="level_min" class="lead"><strong>Minimum Course Level</strong></label>
                        
                                <Select
                                    id="level_min"
                                    defaultValue={[{label: 'ANY', value: 'ANY'}]}
                                    options={levelOptionsMin}
                                    onChange={level => this.setState({level_min: level.value})}
                                    inputValue={inputValueMin}
                                    onInputChange={this.handleInputChangeMin.bind(this)}
                                    noOptionsMessage={() => null}
                                />
                            </div>

                            {/* prompt for levels */ }
                            <label for="level_max" class="lead"><strong>Maximum Course Level</strong></label>

                            { /* Select level between 100 and 800 */ }
                            <div id="level_max_option">
                                <Select
                                    id="level_max" 
                                    defaultValue={[{label: 'ANY', value: 'ANY'}]}
                                    options={levelOptionsMax}
                                    onChange={level => this.setState({level_max: level.value})}
                                    inputValue={inputValueMax}
                                    onInputChange={this.handleInputChangeMax.bind(this)}
                                    noOptionsMessage={() => null}
                                />
                            </div>
                    </div>
                
                    {/* Asks user how many courses they would like to view */}
                    <label for="howmanycourses" class="lead"><strong>How many courses would you like to view?</strong></label>
                    <div id="howmanycourses" style={{width:"300px", margin:"0 auto"}}>
                        <Select className="numCourseSelect"
                                id='num_course_select' 
                                options={numCourses}
                                isSearchable={false}
                                defaultValue={[{label: 5, value: 5}]} 
                                //defaultValue={numCourses[0]}
                                onChange={optionValue => this.setState({numCourses_value: optionValue.value})}
                        />
                    </div>

                {/* Button to generate table */}
                <div id="whichdeptdiv">
                    <Button
                            variant="outline-light" 
                            id="whichdept" 
                            name="whichdept" 
                            onClick={this.courseTable}
                            size="lg">
                        Select
                    </Button>
                </div>

                <div id ="tableNote">
                </div>
                { /* Div for course table */ }
                <div id="id_dept_table">

                </div>
            </div>
        );
    }
}
{/* <DeptList selectedDept={document.getElementById('deptList')} /> */}
export default Dept;