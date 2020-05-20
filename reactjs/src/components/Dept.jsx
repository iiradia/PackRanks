import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

// need to do:
    // obtain value of selected dept
    // send value of dept to CourseLevel
    // get list of depts from backend
class Dept extends React.Component {
    constructor() {
        super();
        this.getDepts = this.getDepts.bind(this)
        this.DeptList = this.DeptList.bind(this)

        this.setState({
            dept_list: null
        })
    }
    
    getDepts() {
        const GEP = this;
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
                <Select id='deptList' options={deptFinal} onChange={department => console.log(department.label, department.value)} /> {/* add attribute onChange={department => ___} */}
            </div>
        </div>
        )
    };

    render() {
        // this.getDepts()
        // const departments = this.state.dept_list;
        // const departments = this.getDepts().then((result) => {return result});
        // console.log(departments)
        // const deptOptions = departments.map((department, i) => (
        //     { label: department, value: i }
        // ));

        // const DeptList = () => (
        //     <div className="app">
        //         <div className="container">
        //             <Select id='deptList' options={deptOptions} onChange={department => console.log(department.label, department.value)} /> {/* add attribute onChange={department => ___} */}
        //         </div>
        //     </div>
        // );
        this.getDepts();

        return(
            <div id="typeofdept" class="text-center">
                <h2 class="mt-5">Select a Department</h2>
                {/* Gives options for specific department the user is looking for */}
                <label for="typeofdept">Please select the department of the course/elective you are looking for.</label>
                {/* <select id="typeofdept" name = "typeofdept" class="bg-light"> */}
                    {/* <!-- TOBEIMPLEMENTED--> */}

                    <div id="deptlist">

                    </div>
                {/* </select> */}
                <button type="button" class="btn btn-danger" id="whichdept" name="whichdept">Select</button>
            </div>
        );
    }
}
{/* <DeptList selectedDept={document.getElementById('deptList')} /> */}
export default Dept;