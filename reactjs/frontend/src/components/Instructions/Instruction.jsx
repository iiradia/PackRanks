import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.

 
export default function Example() {
    return (
        <Accordion allowZeroExpanded= {true} allowMultipleExpanded={true}>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    To find GEPs
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div id="divInstruction">
                        <p>1. First, select the term of the course you are looking for</p>
                        <p>2. Then, select "GEP" from the second dropdown box</p>
                        <p>3. Next, from the third dropdown, select which GEP you wish to take. You may also search for a GEP in the same dropdown.</p>
                        <p>4. Now, select the maximum number of courses you would like to view. Note you may not see all of the courses that you request to view since some courses have limited sections or a small number of professors.</p>
                        <p>5. Finally, click the "Select" button to view a list of the easiest courses in a specific GEP based on the options you chose.</p>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    To Search by Dept
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div id="divInstruction">
                        <p>1. Select the term of the course you are looking for</p>
                        <p>2. Select "Department" from the second dropdown box</p>
                        <p>3. Select the department of your desired course. Since this is a very large list, we recommend searching for the department within the same dropdown.</p>
                        <p>4. Next, choose the course level range of the courses you would like to view. You may select the preset dropdown options OR type in a custom course level range (such as "112" to "365").</p>
                        <p style={{'font-size':'12px'}}><em>*PROTIP:* to view the easiest sections/professors for one specific course, type in the same course number for both boxes. (Ex: to view only MA 341 sections and professors, select the "Mathematics" department and type "341" for both the minimum and maximum course level range).</em></p>
                        <p style={{'font-size':'12px'}}><em>*PROTIP*:  Choose the "ANY" option for both minimum and maximum course levels ranges to view the easiest courses of that specific department.</em></p>
                        <p>5. Now, select the maximum number of courses you would like to view. Note you may not see all of the courses that you request to view since some courses have limited sections or a small number of professors.</p>
                        <p>6. Finally, click the "Select" button to view a list of the easiest courses in a specific Department or for a specific course based on the options you chose.</p>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Using the Wishlist
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <p>Note: You must login or create an account to use the Wishlist feature</p>
                        <p>1. Follow the above steps to view GEP or Department specific courses</p>
                        <p>2. Once you are viewing a list of easiest courses, and you have logged into your account, you should see a column called "Add to Wishlist" with an "Add to Wishlist" option for every course in the list.</p>
                        <p>3. Click "Add to Wishlist" for any course in the list to add it to your Wishlist.</p>
                        <p>4. If a specific course section with a certain professor is already on your Wishlist, you will receive a notification telling you so.</p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    To View Your Wishlist
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <p>Note: You must login or create an account to use the Wishlist feature</p>
                        <p>1. Follow the above steps to view GEP or Department specific courses</p>
                        <p>2. Once you are viewing a list of easiest courses, and you have logged into your account, you should see a column called "Add to Wishlist" with an "Add to Wishlist" option for every course in the list.</p>
                        <p>Your Wishlist is separated based on the term of the course. These courses will be saved to your account so that you can view them anytime, even if you logout. They will remain on your Wishlist until you remove them (See To Remove Courses From Wishlist).</p>
                        <p>4. If a specific course section with a certain professor is already on your Wishlist, you will receive a notification telling you so.</p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    To Remove Courses From Wishlist:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <p>Note: You must login or create an account to use the Wishlist feature</p>
                        <p>1. View your Wishlist by clicking on the My Account tab on the navigation bar, and then on "Wishlist" within the dropdown.</p>
                        <p>2. Once you are viewing a list of easiest courses, and you have logged into your account, you should see a column called "Add to Wishlist" with an "Add to Wishlist" option for every course in the list.</p>
                        <p>3. Click the checkbox under the "Remove" column for any courses you wish to remove.</p>
                </AccordionItemPanel>
            </AccordionItem> 
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Course Details
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <img src="" alt="image"></img>
                </AccordionItemPanel>
            </AccordionItem> 
        </Accordion>
    );
}


