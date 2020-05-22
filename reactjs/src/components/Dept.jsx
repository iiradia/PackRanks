import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import Table from "./Table";
import '../css/dept.css';
import CourseLevel from './CourseLevel'; 



// need to do:
    // obtain value of selected dept
    // send value of dept to CourseLevel
    // get list of depts from backend
class Dept extends React.Component {
    constructor() {
        super();
        this.getDepts = this.getDepts.bind(this)
        this.DeptList = this.DeptList.bind(this)
        this.courseTable = this.courseTable.bind(this)

        this.state = {
            dept_list: null,
            courses: null,
            select_value: null,
            level_value: null
        }
        /* Call depts function */
        this.getDepts();
    }

    courseTable() {
        const Dept = this;
        let dept_url = "http://localhost:5000/dept";
        //let select_value = document.getElementById("dept_list_select").value;
        //let level_value = document.getElementById("levelprompt").value;
        fetch( 
            dept_url, {
                method: "GET",
                headers: {
                    "Dept": this.state.select_value,
                    "term": this.props.whichterm,
                    "level_min": 
                    "level_max":
                    "level": this.state.level_value
                }
           }
        ).then(
           response => response.json()
        ).then(
            //Ternary operator that checks whether course is offered or not.
            data => {data.length > 0 ? this.setState({
                    courses: data
                },
            () => ReactDOM.render(<Table data={this.state.courses} />,
                document.getElementById('id_dept_table')
                )
            ) 
            : 
            ReactDOM.render(
                <h3>There is no course in {this.state.select_value} offered during {this.props.whichterm} with level {this.state.level_value}.</h3>,
                 document.getElementById('id_dept_table')
            )
        }
        )
    }

    /* Get List of departments and render select component */
    getDepts() {
        const Dept = this;
        let url = "http://localhost:5000/getdepts";
        return fetch( 
            url, {
                method: "GET"
           }
        ).then(
            response => response.json() // keep here (maybe)
        ).then(
            (data) => {this.setState({dept_list: data},
                () => ReactDOM.render(this.DeptList(), document.getElementById('deptlist'))
            )}
        )
    }
    
    /* Return select component with list of departments */
    DeptList(){
        const departments = this.state.dept_list;
        //console.log(departments);
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
        //console.log(deptFinal);
        return (
        <div className="app">
            <div className="container">
                <div style={{width:"400px", margin:"0 auto"}}>
                    <Select className="deptSelect"
                            id='dept_list_select' 
                            options={deptFinal} 
                            onChange={dept => this.setState({select_value:dept.value})}
                    />
                </div>
            </div>
        </div>
        )
    };

    render() {
        return(
            <div class="text-center">
                <h2 class="mt-5">Select a Department</h2>
                {/* Gives options for specific department the user is looking for */}
                <label for="typeofdept" class="lead">Please select the department of the course/elective you are looking for.</label>
                {/* <select id="typeofdept" name = "typeofdept" class="bg-light"> */}
                    {/* <!-- TOBEIMPLEMENTED--> */}

                    <div id="deptlist">

                    </div>

                    <CourseLevel/>

                {/* Button to generate table */}
                <div>
                    <button type="button"
                            class="btn btn-danger" 
                            id="whichdept" 
                            name="whichdept" 
                            onClick={this.courseTable}>
                        Select
                    </button>
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