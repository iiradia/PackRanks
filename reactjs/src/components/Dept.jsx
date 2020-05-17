import React from 'react';

class Dept extends React.Component {
    render() {
        return(
            <div id="typeofdept" class="text-center">
                <h2 class="mt-5">Select a Department</h2>
                {/* Gives options for specific department the user is looking for */}
                <label for="typeofdept">Please select the department of the course/elective you are looking for.</label>
                <select id="typeofdept" name = "typeofdept" class="bg-light">
                    {/* <!-- TOBEIMPLEMENTED--> */}
                </select>
                <button type="button" class="btn btn-danger" id="whichdept" name="whichdept">Select</button>
            </div>
        );
    }
}

export default Dept;