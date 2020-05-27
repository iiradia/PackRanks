//imports
import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../Home/Table';
import jwt from 'jwt-decode';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './wishlist.css';

class Wishlist extends React.Component {

    constructor() {
        super();
        
        this.removeCourses = this.removeCourses.bind(this);

        this.viewWishlist();
    }

    removeCourses() {
        //set courses to delete to selected courses
        let cToDelete = JSON.parse(localStorage.getItem("checkedCourses"))
        //filter out courses that should be removed from array 
        let newCourses = this.state.courses.filter(({Course, Semester, Section}) =>
            !cToDelete.some(exclude => exclude.Course[0] === Course[0] &&exclude.Semester===Semester&&exclude.Section===Section)
        );
        console.log(newCourses);
        //reset checked courses
        localStorage.setItem("checkedCourses", JSON.stringify([]));
        //update db with call to API
        let url = "http://localhost:5000/resetWishlist"
        fetch( 
            url, {
                method: "POST",
                body: JSON.stringify(
                    {wishlist:newCourses,
                    token: localStorage.token
                    }
                )
            }
        ).then(
        response => response.json()
        )
        ReactDOM.render(<p></p>, document.getElementById("wishlist"))
        //render new table
        if (newCourses.length > 0) {
            ReactDOM.render(<Table data={newCourses} type="homepage" />, document.getElementById('delWish'))
        }
        else {
            ReactDOM.render(<p></p>, document.getElementById("delWish"))
        }
    }

    viewWishlist() {
        const UserPage = this;
        let url = "http://localhost:5000/viewWishlist";
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
            data.length > 0 ?
            () => {ReactDOM.render(<Table data={this.state.courses} type="homepage" />, document.getElementById('wishlist'))}
            : alert("You have no saved wishlist courses.")
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