import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./Footer.css"
class  Footer extends React.Component{

    constructor(){
        super()
    }

    render(){
        console.log('hfbjfd')
        return(
            <div className="fixed-bottom" id="footer">
                <h1>fisdhfpsdfs</h1>
            <MDBFooter>
            <MDBContainer className="text-center">
              <MDBRow>
                <MDBCol>
                  <h5>Policy</h5>
                </MDBCol>
                <MDBCol>
                  <h5>Policy</h5>
                </MDBCol>
                <MDBCol>
                  <h5>Policy</h5>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="http://www.packranks.com"> packranks.com </a>
              </MDBContainer>
            </div>
          </MDBFooter>
          </div>
          )
    }
}



export default Footer; 
