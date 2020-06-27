import React from "react";
import './Bio.css'
import HarshalPicture from './ProfileImages/HarshalPic.jpeg'
import MathewPicture from './ProfileImages/MathewPic.jpeg'
import IshaanPicture from './ProfileImages/IshaanPic.jpeg'
import AnthonyPicture from './ProfileImages/AnthonyPic.jpeg'
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


function Bio(){// Ishaan - Returning scooter, Mathew - Not turning on his camera 

  return(
    <div class="wrapper">
    <h1 id="teamTitle">Our Team</h1>
    <div class="our_team">


        {/* Harshal's Profile*/}
        <div class="team_member">
          <div class="member_img">
             <img id="profileImage" src={HarshalPicture} alt="our_team"/>
             <div class="social_media">
               <div class="facebook item">
                  <a href="https://www.linkedin.com/in/harshal-suthar/" target = "_blank">
                    <LinkedInIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                  </a> 
              </div>
               <div class="twitter item">
                 <a href="https://github.com/h-suthar" target = "_blank">
                    <GitHubIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                 </a>
              </div>
               <div class="instagram item">
                  <a href="mailto: hksuthar@ncsu.edu" target = "_blank">  
                    <MailIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                  </a>
              </div>
             </div>
          </div>
          <h3>Harshal Suthar</h3>
          <span>Software Engineer</span>
          <p>He likes CHUNKYYYYYY RAGUUUUUU</p>
        </div>

        
        {/* Mathew's Profile */}
        <div class="team_member">
           <div class="member_img">
             <img id="profileImage" src={MathewPicture} alt="our_team" target = "_blank"/>
             <div class="social_media">
               <div class="facebook item">
                 <a href="https://www.linkedin.com/in/mathewchandancsu/"> 
                    <LinkedInIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                 </a>
               </div>
               <div class="twitter item">
                 <a href="https://github.com/MathewChanda" target = "_blank">
                    <GitHubIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                 </a>
              </div>
               <div class="instagram item">
                <a href="mailto: mvchanda@ncsu.edu" target = "_blank">  
                    <MailIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                </a>
              </div>
             </div>
          </div>
          <h3>Mathew Chanda</h3>
          <span>Software Engineer</span>
          <p>Don't ask him to turn on his camera during a zoom call</p>
      </div>


      {/* Ishaan's Profile*/}
        <div class="team_member">
           <div class="member_img">
             <img id="profileImage" src={IshaanPicture} alt="our_team" target = "_blank"/>
             <div class="social_media">
               <div class="facebook item">
                 <a href = "https://linkedin.com/in/ishaan-radia" target = "_blank">
                    <LinkedInIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                  </a>
              </div>
               <div class="twitter item">
                  <a href="https://github.com/iiradia" target = "_blank"> 
                    <GitHubIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                  </a>
              </div>
               <div class="instagram item">
                  <a href="mailto: iiradia@ncsu.edu" target = "_blank">  
                      <MailIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/> 
                  </a>
              </div>
             </div>
          </div>
          <h3>Ishaan Radia</h3>
          <span>Software Engineer</span>
          <p>He's probably returning another electric scooter right now</p>
      </div>


      {/* Anthony's Profile*/}
        <div class="team_member">
           <div class="member_img">
             <img id="profileImage" src={AnthonyPicture} alt="our_team" target = "_blank"/>
             <div class="social_media">
               <div class="facebook item">
                <a href="https://www.linkedin.com/in/anthony-wang-3aa134164/" target = "_blank"> 
                    <LinkedInIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/> 
                </a>
              </div>
               <div class="twitter item">
                  <a href="https://www.linkedin.com/in/anthony-wang-3aa134164/" target = "_blank"> 
                    <GitHubIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                  </a>
              </div>
              <div class="instagram item">
                <a href = "mailto: awang25@ncsu.edu" target = "_blank">
                    <MailIcon fontSize="large" style={{ color: "#cc0000", margins: 40}}/>
                 </a> 
              </div>
             </div>
          </div>
          <h3>Anthony Wang</h3>
          <span>Consultant</span>
          <p>Why is he even on here? He didn't write any of the code!</p>
      </div>  

    </div>
</div>
  )
}
export default Bio; 