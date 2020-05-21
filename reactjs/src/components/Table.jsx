import React from 'react'
import Table from 'react-bootstrap/Table'
import "../css/table.css"

// Put data into each row 
const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        if(key === "RateMyProfessor Link" && props.data[key] !== 'None'){
            return <td key = {props.data[key]}><a href={props.data[key]} target="_blank">Rate My Professor Link</a></td>
        }

        else{
            return <td key={props.data[key]}>{props.data[key]}</td>
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