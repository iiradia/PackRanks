import React from "react";
import UserCard from 'react-ui-cards'
function Bio(){
  return(
    <div id="headDiv" class="list-inline">
    {/*class="col-xl-3 col-sm-6 mb-5"*/}
    {/*class="bg-white rounded shadow-sm py-5 px-4"*/}
    <div id="mathewDiv" class="list-inline-item">
      <img src= {"https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg"} alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
        <h5 class="mb-0">Mathew Chanda</h5><span >Software Engineer at Google</span>
        <ul class="social mb-0 list-inline mt-3">
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
        </ul>
    </div>
    <div id="anthonyDiv" class="list-inline-item">
      <img src= {"https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg"} alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
        <h5 class="mb-0">Anthony Wang</h5><span >Rising Star @ NCSU Statistics</span>
        <ul class="social mb-0 list-inline mt-3">
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-facebook-f"></i></a></li>
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-linkedin"></i></a></li>
        </ul>
    </div>
</div>
  )
}


export default Bio; 