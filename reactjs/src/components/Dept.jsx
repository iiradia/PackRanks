import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class Dept extends React.Component {
    // const departments = ['asdf', 'asd', 'etc'];
    // const deptOptions = departments.map((department, i) => {
    //     return (
    //         { key: 'dept_' + {i}, value: 'dept_' + {i}, text: {department} }
    //     )
    // };
        
    render() {
        return(
            <div id="typeofdept" class="text-center">
                <h2 class="mt-5">Select a Department</h2>
                {/* Gives options for specific department the user is looking for */}
                <label for="typeofdept">Please select the department of the course/elective you are looking for.</label>
                <select id="typeofdept" name = "typeofdept" class="bg-light">
                    {/* <!-- TOBEIMPLEMENTED--> */}
                    {/* <Dropdown 
                        placeholder='Select Department'
                        fluid
                        search
                        selection
                        options={this.deptOptions}
                    /> */}
                </select>
                <button type="button" class="btn btn-danger" id="whichdept" name="whichdept">Select</button>
            </div>
        );
    }
}

export default Dept;