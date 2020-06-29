//imports
import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../Home/Table';
import jwt from 'jwt-decode';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './wishlist.css';

import toast from 'toasted-notes'; 
import 'toasted-notes/src/styles.css';

class Wishlist extends React.Component {

    constructor() {
        super();
        
        this.removeCourses = this.removeCourses.bind(this);
        this.renderWishlistTerms = this.renderWishlistTerms.bind(this);

        this.viewWishlist();
    }

    renderWishlistTerms(data) {
        /* Method to show the different terms in wishlist
        as tables
        */
       //Loop through each term returned by flask
       let i = 0;
        Object.keys(data).map( (key) => { 
            console.log(key);
            const term_div = document.getElementById("wishlist").appendChild(document.createElement('div'));
            /* Set id of the key on the term div */
            term_div.setAttribute("id", key);
            //<Table data={data[key]} type="homepage" />
            //Render many rows of the table based on terms 
            ReactDOM.render(
                <div id={key}>
                    <h2 id="termWishlistHeader">{key}</h2>
                    <Table id="termWishlist" data={data[key]} type="homepage" />
                </div>,
                term_div
            )
            i += 1;
        })
        if (i === 0) {
            ReactDOM.render(<h3 id="termWishlistHeader">Empty wishlist.</h3>, document.getElementById("wishlist"))
        }

    }
    removeCourses() {
        //set courses to delete to selected courses
        let cToDelete = JSON.parse(localStorage.getItem("checkedCourses"))
        
        if (cToDelete.length === 0) {
            toast.notify(<h5 style={{color: '#cc0000'}}>No courses to delete.</h5>)
            return
        }
        //filter out courses that should be removed from array 
        //console.log(this.state.courses);
        
        //Iterate through items that should be deleted
        for (var i = 0; i < cToDelete.length; i++) {

            //save course that should be deleted
            let currDelete = cToDelete[i];
            //save the current semester and all courses
            //currently in the wishlist for that semester
            let currSem = cToDelete[i]["Semester"];
            let currentTermArray = this.state.courses[currSem];
            
            //iterate through courses currently in the wishlist for
            //that semester
            for (var courseIdx = 0; courseIdx < currentTermArray.length; courseIdx++) {

                //compare information for course to delete
                //with information for current course inwishlist
                const currCourse = currentTermArray[courseIdx]["Catalog Link"][0];
                const currProf = currentTermArray[courseIdx]["RateMyProfessor Link"][0];
                const currSection = currentTermArray[courseIdx]["Section"];

                //if information matches, remove course from state
                // and save state
                if (currCourse===currDelete["Catalog Link"][0] && currProf===currDelete["RateMyProfessor Link"][0] && currSection===currDelete["Section"]) {
                    currentTermArray.splice(courseIdx, 1);
                    this.state[currSem] = currentTermArray;
                    this.forceUpdate();
                }
            }
        }

        //reset checked courses
        localStorage.setItem("checkedCourses", JSON.stringify([]));
        //update db with call to API
        let url = "http://packranks-backend.herokuapp.com/resetWishlist"
        //reset the wishlist with the updated state, 
        //with the removed courses no longer in the state
        fetch( 
            url, {
                method: "POST",
                body: JSON.stringify(
                    {wishlist:this.state.courses,
                    token: localStorage.token
                    }
                )
            }
        ).then(
        response => response.json()
        )
        //Removes all current term elements so they can be reset
        //resets wishlist internal elements to null so they can be re-rendered
        document.getElementById("wishlist").innerHTML = "";
        
        //call function to render remaining courses if there
        //are any.
        this.viewWishlist();
    }

    viewWishlist() {
        const UserPage = this;
        let url = "http://packranks-backend.herokuapp.com/viewWishlist";
        fetch( 
            url, {
                method: "GET",
                headers: {"token": localStorage.token }
            }
        ).then(
        response => response.json()
        ).then(
            data => this.setState({
                courses: data
            },
            () => {
                // Code to show wishlist by terms 
                //call function to render wishlist items
                //by the term they are in.
                this.renderWishlistTerms(data);
            }
            )
        )
    }

    render() {
        let identity = jwt(localStorage.token).identity;
        return (
            <div>
                <h1 id="welcome" className="mt-5"><strong>{identity.first_name}'s</strong> Wishlist</h1>
                
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

                <div id="termName">

                </div>
                <div id="wishlist">

                </div>

                <div id="delWish">

                </div>

                <div id="deleteItems">
                        {/* Added delete wishlist course functionality. */}
                        <Button
                            className="btn btn-danger" 
                            id="delWishlist"
                            name="delWishlist" 
                            size="lg"
                            onClick={this.removeCourses}>
                            Delete Selected Rows from Wishlist
                        </Button>
                </div>

            </div>
        )
    }
}
export default Wishlist;