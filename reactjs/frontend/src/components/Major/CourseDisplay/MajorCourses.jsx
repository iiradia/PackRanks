import React from 'react';
import ReactDOM from 'react-dom';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {Button} from 'react-bootstrap';
import "./majorcourses.css";
import Table from '../../Home/Table';
// Demo styles, see 'Styles' section below for some notes on use.

class MajorCourses extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            url: "http://localhost:5000",
            term: "2020 Fall Term",
            num_courses: 5
        }

        this.displayCourses = this.displayCourses.bind(this);
        this.loadCourseTable = this.loadCourseTable.bind(this);
    }

    componentDidMount() {
        this.displayCourses();
    }

    //load the table for the item selected
    loadCourseTable(index) {
        
        //if the index is a number, the item is being opened
        if (index.length > 0) {

            //save course that was selected
            let courseSelected = this.props.courses[index]; 

            //notify user that information is loading
            ReactDOM.render(
                <h4>Loading...</h4>,
                document.getElementById(courseSelected)
            )

            //save url to get course info
            const dept_url = this.state.url + "/dept";

            //save dept and course code
            const course_split = courseSelected.split(" ");
            const dept_name = course_split[0];
            const course_num = course_split[1];

            fetch(
                dept_url, {
                    method: "GET",
                    headers: {
                        "Dept": dept_name,
                        "term": this.state.term,
                        "level_min": course_num,
                        "level_max": course_num,
                        "num_courses": this.state.num_courses
                    }
            }
            ).then(
            response => response.json()
            ).then(
                //display data for the course that was clicked on
                coursedata => {
                    //if there is data for the course
                    if (coursedata.length > 0 && coursedata[0] !=="NotNumeric") {
                        ReactDOM.render(
                        <div>
                            <p id="tableNoteMsg" class="lead"><em>Note: If you see a higher rated course that is near the bottom of the list, it is either a closed section or it has the same professor as a course higher in the list.</em></p>
                            <Table data={coursedata}/>
                        </div>, 
                        
                        document.getElementById(courseSelected)
                        )
                    }
                    //else
                    else {
                        ReactDOM.render(
                            <div>
                                <p>Course is either closed or unavailable for the next semester.</p>
                            </div>,
                            document.getElementById(courseSelected)
                        )
                    }
                }
            )
        }
    }

    displayCourses() {

        ReactDOM.render(
            <Accordion onChange={this.loadCourseTable} allowZeroExpanded={true}>

                {/*Loop through courses in the major and display panel*/}
                {this.props.courses.map(
                course => <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {course}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div id={course}>

                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                )}
            </Accordion>,

            //display below major
            document.getElementById("courseDiv")
        )
    }
    render() {
        return (
            <div id="courseDiv">
            </div>
        );
    }
}
export default MajorCourses;


