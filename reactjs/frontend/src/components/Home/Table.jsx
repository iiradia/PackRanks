import React from 'react'
import Table from 'react-bootstrap/Table'
import "./css/table.css"
import ReactTooltip from 'react-tooltip';
import {Checkbox} from "@material-ui/core";

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
        data => data.success ? alert("Successfully added course to wishlist")
        : alert("Failed to add course to your wishlist, please try again.")
    )
}

// Put data into each row 
const RenderRow = (props) =>{
    //console.log(props);
    localStorage.setItem("checkedCourses", JSON.stringify([]));
    return props.keys.map((key, index)=>{
        
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
        else if (key === "Professor" || key === "Location" || key==="Course") {

            /* If there is no link, just return professor name. */
            if (props.data[key][1] === 'None') {
                return <td key={props.data[key][0]}><strong>{props.data[key][0]}</strong></td>
            }
            else { 
                /* Else, return hyperlink that opens in new tab. */   
                return <td key={props.data[key][0]}>
                            <a id="tablelinks" className="tablelinks" href={props.data[key][1]} target="_blank">
                                <strong>{props.data[key][0]}</strong>
                            </a>
                        </td>
            }
        }
        //if section and user is authenticated, show option for adding to wishlist
        //TO BE IMPLEMENTED
        //ADD ELSE IF HERE AND CORRECT LOGIC TO PRODUCE TOOLTIP/CALL THE onWishlist() function
        //with props.data as param
        /* If normal element, return normal table */


        else if(key === 'Section' && localStorage.token !== undefined && props.type !== "homepage"){
            return <td key={props.data[key]} id="sectionLink">   
                    <a id="tablelinks" onClick= {() => {onWishlist(props.data)}}>
                        <p data-for="ctool" id="tablelinks" data-tip="Add to Wishlist">
                            <strong>{props.data[key]}</strong>
                        </p>
                        <div id="cdiv">
                            <ReactTooltip id="ctool"/> 
                        </div>
                    </a>  
                </td>
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
        return items.map((row, index)=>{
          return <tr key={index}><RenderRow key={index} data={row} keys={keys} type={this.props.type}/></tr>
        
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
        </div>
    
     );
    }
   }


export default table; 