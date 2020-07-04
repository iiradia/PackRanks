import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css'
const FooterPage = () => {
  return (
    <div className="footer-copyright text-center py-3 fixed-bottom" id="footer">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} PackRanks
      </MDBContainer>
  </div>
    
  );
}

export default FooterPage;