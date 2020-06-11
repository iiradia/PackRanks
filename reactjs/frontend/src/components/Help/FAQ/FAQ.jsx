import React from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import "./faq.css";
// Demo styles, see 'Styles' section below for some notes on use.

 
export default function Example() {
    return (
        <div id="faqDiv">
        <Accordion id="faqAcc" allowZeroExpanded= {true} allowMultipleExpanded={true}>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    How do I search for just one course?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <p id="helpText">
                        To view the easiest sections/professors for one specific course, type in the same course number for both boxes. (Ex: to view only MA 341 sections and professors, select the "Mathematics" department and type "341" for both the minimum and maximum course level range).
                        </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Why don't I see an option to add a course to my wishlist?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div id="divInstruction">
                        <p id="helpText">In order to add a course to your wishlist, you must login
                            with a PackRanks or a Google account. Click on the login
                            button located on the top right of your screen to get started!
                        </p>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    What benefits do I get from making an account?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Great question! When you make an account,
                        you are able to create your own wishlist of courses that you
                        would like to take! In addition, we will send you an email 
                        whenever a course that was closed or waitlisted on your wishlist 
                        opens up!
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Why do I see a course with a higher rating ranked above a course with
                    a lower rating?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        A course with a higher rating that is ranked above a course with a lower rating
                        either has a duplicate professor as a course that is ranked near the top of the list
                        or is a closed section with no more seats available.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    How are ratings calculated?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                        <p>
                            Check out our about page for more information! <a href="/about">About PackRanks</a>
                        </p>
                </AccordionItemPanel>
            </AccordionItem> 
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    What is a GEP?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p id="helpText">
                        GEP stands for <a id="helpText" target="_blank" href="https://oucc.dasa.ncsu.edu/general-education-program-gep/gep-category-requirements/">General Education Program</a>, which is the set
                        of courses all students at NC State must complete prior 
                        to graduation.
                    </p>
                </AccordionItemPanel>
            </AccordionItem> 
            {/*<p>If you have any concerns that remain unresolved after looking at the
                appropriate question, please contact us using the link below!
            </p>*/}
        </Accordion>
        </div>
    );
}


