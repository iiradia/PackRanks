//imports
import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../Home/Table';
import jwt from 'jwt-decode';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './major.css';
import Select from 'react-select';

import toast from 'toasted-notes'; 
import 'toasted-notes/src/styles.css';

import MajorCourses from './CourseDisplay/MajorCourses';

class Major extends React.Component {

    constructor() {
        super();

        this.state = {
            url: "http://packranks-backend.herokuapp.com",
            major: "",
            courses: []
        }
        
        this.checkUserMajor = this.checkUserMajor.bind(this);
        this.renderMajorCourses = this.renderMajorCourses.bind(this);
        this.requestAMajor = this.requestAMajor.bind(this);
        this.displayMajors = this.displayMajors.bind(this);
        this.saveMajor = this.saveMajor.bind(this);
        
        this.checkUserMajor();
    }

    //method that saves the user major that was selected
    saveMajor() {
        //save user major that was selected
        const major = this.state.major;

        const check_url = this.state.url + "/saveMajor";

        //call db with major to save major info for user
        fetch (
            check_url, {
                method: "GET",
                headers: {"token": localStorage.token, "major": major}
            }
        ).then(
            response => response.json()
        ).then (
            //once the process is complete, render the user major information
            (data) => {
                this.checkUserMajor();
            }
        )

    }

    //method that displays all majors in the college selected
    displayMajors(college) {

        //url to get list of majors from backend
        const check_url = this.state.url + "/getMajorList"

        //fetch list of majors from backend
        fetch (
            check_url, {
                method: "GET",
                headers: {"college": college}
            }
        ).then(
            response => response.json()
        ).then(
            //save list of majors given college
            data => {
                let majors = data.majors;

                //save labels for each college mapped to values
                const majorFinal = [];
                for (var i = 0; i < majors.length; i++) {
                    majorFinal[i] = {label: majors[i],
                                value: majors[i]}
                }
                ReactDOM.render(
                    <div>
                        <div id="majorSelect">
                            <label for="whichmajor" class="lead">Please select a major from the dropdown.</label>
                            <div id="whichmajor" style={{width:"300px", margin:"0 auto"}}>
                                <Select className="numMajorSelect"
                                        id='num_major_select' 
                                        options={majorFinal} 
                                        //defaultValue={numCourses[0]}
                                        onChange={optionValue => this.setState({major:optionValue.value})}
                                />
                            </div>
                        </div>
                        
                        {/* button to select a specific major */}
                        <div id="whichgepdiv">
                            <Button
                                class="btn btn-danger" 
                                id="whichmajorbtn" 
                                name="whichmajorbtn" 
                                onClick={this.saveMajor}
                                size="lg">
                                Confirm
                            </Button>
                        </div>
                    </div>,
                    document.getElementById("majorCollege")
                )
            }
        )
    }

    //method that checks if a user has a major
    //if they do, displays pertinent info
    //else, displays prompt to select a major
    checkUserMajor() {
        const identity = jwt(localStorage.token).identity;
        //get user email and url to call
        const email = identity.email;
        const check_url = this.state.url + "/checkMajor";

        //check if the user has a major
        fetch( 
            check_url , {
                method: "GET",
                headers: {"token": localStorage.token }
            }
        ).then(
        response => response.json()
        ).then(
            (data) => {

                //if the user has a major
                if (data.success) {
                    this.setState({
                        major: data.major,
                        courses: data.courses
                        },
                        //code after major and courses is set

                        //method that shows courses for the user's major
                        ()=>{this.renderMajorCourses(data);}
                    )
                }
                //if the user has not selecfted a major
                else {
                    //method that prompts the user to select a major
                    this.requestAMajor();
                }
            }
        )
    }

    //Method that renders the course information for a given major
    renderMajorCourses(data) {

        const major = data.major;
        const major_courses = data.courses;
        let identity = jwt(localStorage.token).identity;

        ReactDOM.render(
            <div>
                <div id="majordisplay">
                    <h2 id="yourMajor"><em>{identity.first_name}'s Major:</em> <strong>{major}</strong></h2>
                    <div id="changeMajorDiv">
                        <Button className = "btn btn-danger"
                            id="changeMajor"
                            name="changeMajor"
                            size="lg"
                            onClick={this.requestAMajor}>
                                Change Your Major
                        </Button>
                    </div>
                </div>
                <MajorCourses major={major} courses={major_courses}/>
            </div>,
            document.getElementById("majorInfo")
        )
    }

    //Method that prompts the user to select their major
    requestAMajor() {

        //save all college options for majors
        const collegeOptions = ['Agricultural Institute', 'Agriculture & Life Sciences',
            'Design', 'Education', 'Engineering', 'Humanities & Social Sciences',
            'Management', 'Natural Resources', 'Sciences', 'Textiles'];
        const collegeLabels = collegeOptions.map((option) => (
            {label: option}
        ));

        //save codes for each college in NCSU
        const collegeOptionValues =  ["CDI", "CALS", "DN", "CED", "COE", "CHASS", "MGMT", "CNR", "COS", "TEX"];
        const collegeValues = collegeOptionValues.map((optionValue) => (
            {value: optionValue}
        ));

        //save labels for each college mapped to values
        const collegeFinal = [];
        for (var i = 0; i < collegeLabels.length; i++) {
            collegeFinal[i] = {label: collegeLabels[i].label,
                           value: collegeValues[i].value}
        }

        ReactDOM.render(
            <div id="type" class="text-center">
                    <h2 class="mt-5">Select a Major</h2>
                    <label for="typeofgep" class="lead">Please select the college that your major is in.</label>
                    
                    {/* selectable options for colleges at ncsu */}
                    {/* */}
                    <div id="selectAMajor" style={{width:"300px", margin:"0 auto"}}>
                        <Select className="collegeSelect"
                                id='college_list_select' 
                                options={collegeFinal} 
                                //onChange={this.setState({select_value: document.getElementById('gep_list_select').value})}
                                onChange={optionValue => this.displayMajors(optionValue.value)}
                        />
                    </div>

                    {/* Div that will show user majors for the college selected*/}
                    <div id="majorCollege">

                    </div>
                    
                </div>,
            document.getElementById("majorInfo")
        )
    } 

    render() {
        let identity = jwt(localStorage.token).identity;
        return (
            <div>
                <h1 id="welcome" className="mt-5">Your Major Information</h1>
                
                <div id="backtohomepage">
                        {/* Added link to wishlist */}
                        <Link to="/homepage">
                            <Button
                            className="btn btn-danger" 
                                    id="backtohmpg" 
                                    name="backtohmpg" 
                                    size="lg">
                                Back
                            </Button>
                        </Link>
                </div>

                <div id="majorInfo">

                </div>

            </div>
        )
    }
}
export default Major;