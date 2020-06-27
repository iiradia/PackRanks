import React from 'react'
import Table from 'react-bootstrap/Table'
import "./css/table.css"
import ReactTooltip from 'react-tooltip';
import {Checkbox} from "@material-ui/core";
import ReactDOM from 'react-dom';   
import Instruction from '../Help/Instructions/Instruction.jsx'

import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';

function hsl_col_perc(percent, start, end) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;
  
    // Return a CSS HSL string
    return ('hsl('+c+', 100%, 50%)');
}

//when delete checkbox is checked
const checkDelete= (props) => {
    //If item was checked, process
    if (props.checked) {

        //if there are already elements in storage, add it
        if (localStorage.getItem("checkedCourses")) {
            let currStorage = JSON.parse(localStorage.getItem("checkedCourses"));
            currStorage = currStorage.concat(props.data);
            localStorage.setItem("checkedCourses", JSON.stringify(currStorage));
        }
        //else, make it the first item in storage
        else {
            let currS = [props.data]
            localStorage.setItem("checkedCourses", JSON.stringify(currS));
        }
    }
    //if unchecked, remove from localstorage
    else {
        let currS = JSON.parse(localStorage.getItem("checkedCourses"));
        for (var i = 0; i < currS.length; i++) {
            let course = props.data.Course;
            let sem = props.data.Semester;
            let section = props.data.Section;
            if (course[0] === currS[i].Course[0] && sem===currS[i].Semester && section===currS[i].Section) {
                console.log("remove")
                currS.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("checkedCourses", JSON.stringify(currS));
    }
    console.log("set to")
    console.log(localStorage.getItem("checkedCourses"));
}

//when wishlist button is pressed
const onWishlist= (props) => {
    //console.log(props);
    let url = "http://localhost:5000/addWishlist"
    fetch( 
        url, {
            method: "POST",
            body: JSON.stringify(
                {course_data:props,
                token: localStorage.token
                }
            )
        }
    ).then(
       response => response.json()
    ).then(
    (data) => {
        if (data.success) {
            toast.notify(<h5 id="successWish">Successfully added course to your wishlist!</h5>)
        }
        else {
            if (data.duplicate) {
                toast.notify(<h5 style={{color: '#cc0000'}}>This course is already on your wishlist!</h5>)
            }
            else {
                toast.notify(<h5 style={{color: '#cc0000'}}>Failed to add course to your wishlist.</h5>)            }
        }
    })
}

// Put data into each row 
const RenderRow = (props) =>{
    //console.log(props);
    localStorage.setItem("checkedCourses", JSON.stringify([]));
    return props.keys.map((key, index)=>{

        //Use this to generate a unique id for table rows
        var uniq_id = props.data["Semester"] +  props.data["Catalog Link"][0] + props.data["RateMyProfessor Link"][0] + props.data["Section"];
        //console.log(index);
        if (key === "Delete") {
            return <td><Checkbox 
                        style={{color: '#cc0000'}}
                        onChange={e=>checkDelete(
                            {"data":props.data,
                        "checked":e.target.checked}
                            )}/>
                    </td>
        }
        /* Check if key is professor */
        else if (key === "RateMyProfessor Link" || key === "Location" || key==="Catalog Link") {

            /* If there is no link, just return professor name. */
            if (props.data[key][1] === 'None') {
                return <td key={props.data[key][0]}><strong>{props.data[key][0]}</strong></td>
            }

            /*else { 
                /* Else, return hyperlink that opens in new tab. 
                
                if(key === "RateMyProfessor Link"){
                    const overall_prof = "Overall Quality: " + props.data[key][2] + " <br/> Overall Difficulty: " + props.data[key][3]
                    return <td key={props.data[key][0]}>
                                <a id="tablelinks" className="tablelinks" href={props.data[key][1]} target="_blank" data-for="ctool" data-tip={overall_prof}>
        
                                    <strong>{props.data[key][0]}</strong>
                                    <div id="cdiv">
                                        <ReactTooltip id="ctool" multiline={true} effect="solid" place="top"/> 
                                    </div>
                                </a>
                            </td>
                }*/
                
                else{
                    return <td key={props.data[key][0]}>
                            <a id="tablelinks" className="tablelinks" href={props.data[key][1]} target="_blank">
                                <strong>{props.data[key][0]}</strong>
                            </a>
                        </td>
                }
        }
        //if section and user is authenticated, show option for adding to wishlist
        //IMPLEMENTED below
        /* If normal element, return normal table */
        else if(key === "wishlist" && props.type !== "homepage"){

            //if user is logged in, give option for adding to wishlist
            if (localStorage.token!==undefined) {
                return <td key={props.data[key]} id="sectionLink">
                        <a id="wishlistN" onClick= {() => {onWishlist(props.data)}}>
                            Add to Wishlist
                        </a>  
                    </td>
            }

            //if user is not logged in, prompt them to login to use feature
            else {
                return <td key={props.data[key]} id="sectionLink">
                    <a id="wishlistN" href="/login">Login</a>
                </td>
            }
        }

        else if (key==="Rating") {
            let currRating = props.data[key];
            /*let easyNote = "Difficult";
            if (currRating > 65) { 
                easyNote = "Moderately Difficult"
            }
            if (currRating > 69) {
                easyNote = "Medium"
            }
            if (currRating > 79) {
                easyNote = "Easy"
            }
            if (currRating > 89) {
                easyNote = "Very Easy"
            }*/
            //console.log(keyColor);
            return <td id="ratingTable" key={props.data[key]}><strong>{props.data[key]}</strong></td>
        }
        else{
            return <td key={props.data[key]}><strong>{props.data[key]}</strong></td>
        }
    })
   }

class table extends React.Component {
 
    
    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);

        //reset checked courses to empty, this ensures that the courses
        //are properly removed.
        localStorage.setItem("checkedCourses", JSON.stringify([]));
    }
    componentDidMount() {
        if (this.props.type !== "homepage") {
            ReactDOM.render(
                <p id="bugFlawMsg" class="lead">
                    If you notice any bugs or flaws in our product, please contact us using the link at the top right of this page!
                </p>,
                document.getElementById("renderContactForBugs")
            )
        }
    }
    // Gets the keys of the whole table 
    getKeys = function(){
        return Object.keys(this.props.data[0]);
    }
    
    // Gets the headers of table from the keys 
    getHeader = function(){
        var keys = this.getKeys();

        if (this.props.type === "homepage") {
            var delHeader = ["Delete"];
            keys=delHeader.concat(keys);
        }
        //else if (localStorage.token!==undefined){ 
            var wishlistHed = ["wishlist"];
            let keys_first = keys.slice(0, 5);
            let keys_last = keys.slice(5, keys.length);
            keys = keys_first.concat(wishlistHed, keys_last);
            //keys = wishlistHed.concat(keys);
        //}
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }
    
    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();
        
        {/* If homepage, add delete option.*/}
        if(this.props.type === "homepage") {
            var delHeader = ["Delete"];
            keys=delHeader.concat(keys);
            for (let i = 0; i < items.length; i++) {
                items["Delete"] = "";
            }
        }
        //else if (localStorage.token!==undefined){
            var wishlistHed = ["wishlist"];
            let keys_first = keys.slice(0,5);
            let keys_last = keys.slice(5,keys.length);
            keys = keys_first.concat(wishlistHed, keys_last);
            //keys=wishlistHed.concat(keys);
            for (let i = 0; i < items.length; i++) {
                items["wishlist"] = "";
            }
        //}
        return items.map((row, index)=>{
            let uniq_id = row["Catalog Link"][0] + row["RateMyProfessor Link"][0] + row["Section"] + row["Semester"];
            if (uniq_id === "None") {
                uniq_id = Math.random();
            }
            //console.log(uniq_id);
          return <tr key={uniq_id}><RenderRow key={uniq_id} data={row} keys={keys} type={this.props.type}/></tr>
        
        })
      }

    render() {

        return (
        <div>
            <Table striped bordered hover varaint = "dark">
                <thead>
                    <tr>{this.getHeader()}</tr>
                </thead>
                <tbody>
                    {this.getRowsData()}
                </tbody>
            </Table>
            <div id="renderContactForBugs">
            </div>
        </div>
    
     );
    }
   }


export default table; 