import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import StickyFooter from 'react-sticky-footer';
import './Footer.css'
const FooterPage = () => {
  return (
      <div id="footer">
    <StickyFooter
    bottomThreshold={533}
    normalStyles={{
    backgroundColor: "#999999",
    padding: "2rem"
    }}
    stickyStyles={{
    backgroundColor: "rgba(255,255,255,.8)",
    padding: "2rem"
    }}
>
    Add any footer markup here
</StickyFooter>
</div>
  );
}

export default FooterPage;