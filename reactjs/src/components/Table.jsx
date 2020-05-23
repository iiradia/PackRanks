import React from 'react'
import Table from 'react-bootstrap/Table'
import "../css/table.css"
import ReactHover from 'react-hover';

// Put data into each row 
const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{

        /* Check if key is professor */
        if (key === "Professor" || key === "Location") {

            /* If there is no link, just return professor name. */
            if (props.data[key][1] === 'None') {
                return <td key={props.data[key][0]}><strong>{props.data[key][0]}</strong></td>
            }
            else { 
                /* Else, return hyperlink that opens in new tab. */   
                return <td key={props.data[key][0]}>
                            <a href={props.data[key][1]} target="_blank">
                                <strong>{props.data[key][0]}</strong>
                            </a>
                        </td>
            }
        }
        /*else if (key === "Course") {
            
            const title = props.data[key]["course_title"];
            const code = props.data[key]["code"];
            const descr = props.data[key]["descr"];
            const titleStr = 
            <p>Course Title: {title}<br>{descr}</br></p>;

            const optionsCursorTrueWithMargin = {
                followCursor:true,
                shiftX:0,
                shiftY:50
            }
            /*<td id="cdiv">
            <strong><p data-tip={titleStr} data-for="ctool">{code}</p></strong>
            <div style={{width:50}}>
                <ReactTooltip
                    id="ctool" 
                    place="right" 
                    effect="solid"
                    backgroundColor={"white"} 
                />

            </div>
        </td>
            
            return  <td id="ctool">
                        <ReactHover options={optionsCursorTrueWithMargin}>
                            <ReactHover.Trigger type="trigger">
                                <td id="cdiv">
                                    <strong>{code}</strong>
                                </td>
                            </ReactHover.Trigger>
                            <ReactHover.Hover id="ctool" type="hover">
                                <p id="hovertxt">Course Title: {title}<br />{descr}</p>
                            </ReactHover.Hover>
                        </ReactHover>
                   </td>
        }*/
        /* If normal element, return normal table */
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
    }

    
    
    // Gets the keys of the whole table 
    getKeys = function(){
        return Object.keys(this.props.data[0]);
    }
    
    // Gets the headers of table from the keys 
    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }
    

    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
          
            
          return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        
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