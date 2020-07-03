# PackRanks
This website provides a comprehensive assortment of course options for a user who is identifying a potential academic path, based on multifarious quantifiable metrics and third-party services that provide numerical professor metadata.

<strong>Project Website:</strong> http://packranks.com

<!-- TABLE OF CONTENTS -->
## Table of Contents
* [About](#about)
    * [The Problem](#the-problem)
    * [Approach](#approach)
        * [Research](#research)
        * [Design](#design)
        * [Test](#test)
        * [Iterate](#iterate)
    * [Solution](#solution)
    * [Built With](#built-with)
* [Usage](#usage)
    * [Searching for Courses](#searching-for-courses)
    * [Table](#table)
    * [Rating System](#rating-system)
    * [Wishlist](#wishlist)
    * [Additional Features](#addtitional-features)
* [Authors](#authors)
* [License](#license)

<!-- ABOUT THE PROJECT -->
## About
### The Problem
Course registration is a complicated and tedious process.

When students plan their courses for the upcoming semester, there are many important factors to consider. However, pertinent information is decentralized across many resources.

The university’s course planning interface MyPack Portal is infamously difficult to navigate and forces students to reference multiple external sources. PackRanks addresses these shortcomings, and provides a venue for crystal <strong>clear</strong> and pristine <strong>quality</strong> information that NC State students value.

NC State undergraduates need a more extensive and easy-to-use course search tool to simplify the tedious and overcomplicated course discovery process.

### Approach
#### Research
* We began our research process by identifying potential academic and extracurricular needs for NC State students.
* As members of the NC State community, we utilized our everyday experiences to highlight areas for improvement in students' <strong>academic planning.</strong>

#### Design
* Once we pinpointed the exact need that PackRanks could fill in the course planning space, we immediately collaborated on the best way to deliver a <strong>simplistic</strong> user experience.
* We determined which websites we would need to extract data from to serve as the backbone of PackRank's <strong>comprehensive information distribution.</strong> 
* Although at the start of our project, we had a limited knowledge of creating a full-stack project, through PackRanks we all built an applied understanding of the intricacies of <strong>web scraping</strong> and web development [technologies](#built-with).

#### Test
* Throughout the PackRanks development process, we utilized strong database quality assurance methodologies as well as end-to-end testing.
* We implemented a <strong>diabolical testing strategy</strong> that involved coverage of all test cases and endpoints so that we could diagnose exactly where any bugs are coming from. 
* With the current release of PackRanks, we are using a <strong>crowdsourced</strong> approach to focus our attention on crucial features that most impact the user experience.  

#### Iterate
* In future iterations of PackRanks, we aim to gather as much <strong>feedback</strong> from the community as possible and integrate the NC State community's ideas with the next version of PackRanks.
* We have created an exhaustive <strong>Continuous Integration & Delivery (CI/CD)</strong> plan for subsequent releases of PackRanks, to ensure a streamlined and convenient process for both the development team and the users.

### Solution
We built <a target="_blank" href="http://packranks.com/login">PackRanks</a>, a web app that allows students to find and plan their courses for the upcoming semester, combining a comprehensive course search with a meticulous email notification service to provide up-to-date and accurate information in a convenient and practical manner.

PackRanks aims to help students feel more informed and confident when choosing courses, while simultaneously aggregating an abundance of resources into a concise presentation.

Discover the power of PackRanks in our [Features](#features) section!

<!-- describe project in detail:
    goal, audience, why we made it, what it does -->

### Built With
* [React](https://reactjs.org/)
* [Python](https://python.org)
* [Selenium](https://pypi.org/project/selenium)
* [Flask](https://pypi.org/project/Flask)
* [MongoDB](https://www.mongodb.com)
* [Heroku](https://www.heroku.com)
* [Bootstrap](https://getbootstrap.com)
* [Material-UI](https://material-ui.com/)
* ...

## Features
#### Rank Courses by Difficulty
You can customize which set of courses you are looking for and view a wealth of information presented in a ranked table. Additionally, PackRanks enables you to efficiently find classes that fulfill general education requirements.
<p align="center">
 <img src="" width="800">
 <br>
 <em>Course Table</em>
</p>

#### Save Prospective Courses
You can add a course to your Wishlist to view it later, and to receive open-seat notifications. Plan your upcoming semesters' schedules, and, in the near future, simplify the intricacies of NC State degree requirements through our degree plan feature!
<p align="center">
 <img src="" width="800">
 <br>
 <em>Wishlist</em>
</p>

#### Get Notified When Seats Open
Get an email notification whenever a seat in a waitlisted or closed class in your Wishlist becomes open. Never miss out on a notable course opportunity!
<p align="center">
 <img src="" width="800">
 <br>
 <em>Email notification</em>
</p>

#### Upcoming Features
* Degree Audit
* Class Preferences
* Mock-Scheduler

## Usage
### Searching For Courses
<p align="center">
 <img src="" width="800">
 <br>
 <em></em>
</p>

1. Select term
2. Search for GEP or by course department
3. GEP:
    3a. select GEP
    4a. choose number of courses to view
4. Department:
    3b. search for or select department
    4b. enter course number range (or same number for a specific course)
    5b. choose number of courses to view

### Table
<p align="center">
 <img src="images/PackRanksTableGEPHUM.JPG" width="800">
 <br>
 <em>Populated Table</em>
</p>

* The PackRanks table displays all pertinent information regarding a group of NC State courses, including links to multiple websites providing further specific details.

#### Columns
* Rating
    * The Rating column, sorted in descending order, displays a conclusive rating based on grade distribution data from <a target="_blank" href="https://tools.wolftech.ncsu.edu/gradient">Wolftech Gradient</a>, North Carolina State University's official source for professor and course section grading data. More information on our rating can be found in our [Rating](#rating-system) section.
* Name
    * The Name column contains the name of the course listed in order to provide more information about its contents.
* Catalog Link
    * The Catalog Link column contains the course code (e.g. ENG 101) as well as a link to that section's NC State course catalog entry, which contains precise information such as a course description directly from the university.
* RateMyProfessor Link
    * The RateMyProfessor Link column has the name of the professor teaching the course listed, as well as a link to their <a target="_blank" href="https://www.ratemyprofessors.com">RateMyProfessor</a> profile. RateMyProfessor is a professor review site with crowdsourced data from millions of students nationwide.
* Section
    * The Section column provides the unique section number for the course listed, which can be used to identify it when registering online.
* Wishlist
    * The Wishlist column consists of an option to add the course to the user's wishlist (if the user is logged in), or a link to the login page if the user is not currently authenticated.
* Prerequisites
    * The Prerequsites column contains a statement on all courses necessary to complete before taking the course listed. This information is taken directly from NC State's website, and is periodically updated.
* Location
    * The Location column states where the class will be taught. If the location is at an on-campus building location, the column also shows a link to the Google Maps page for that location.
* Seats
    * The Seats column displays the current status of the course (whether it is open or not) as well as the current number of seats remaining. This information is constantly being scraped from NC State's official website and the table is updated accordingly.
* Times
    * The Times column displays the times the course is taught, or TBD if it has not been determined by administrators.
* Semester
    * The Semester column displays the semester for which the current section is being taught.
* Notes
    * The Notes column contains any additional information that might be relevant to the course displayed (this data is also taken from NC State's website and updated accordingly).

### Rating System
* We designed the rating system to be simple for users to understand as well as to be the most <strong>accurate</strong> measure of difficulty for NC State courses.
* We use newly updated data from Wolftech Gradient to compute a rating of each course that measures how easy or difficult the class is.
* We sort our course results for GEPs and specific courses by that rating, providing users with a simple and effective way to find the easiest GEPs or any courses they are looking for!

### Wishlist
* We created the Wishlist as a convenient way for users to store all the details on courses that they are interested in taking in future semesters.
* We implemented a feature that reminds a user when a closed course on their Wishlist opens a new seat! This way, users will never miss opportunities to register for class they are interested in taking.
* We are currently working on an extension to the Wishlist such that users can plan out their entire course of study simply by entering their major! This feature would combine the core functionality of PackRanks with major and degree plans offered at NC State. 

<!-- CONTRIBUTING -->
## Authors

* **Ishaan Radia** - Junior at North Carolina State University studying Statistics and Computer Science. - [LinkedIn](https://linkedin.com/in/ishaan-radia) - [GitHub](https://github.com/iiradia)

* **Mathew Chanda** - Sophomore at North Carolina State University studying Computer Science - [LinkedIn](https://www.linkedin.com/in/mathewchandancsu/) - [GitHub](https://github.com/MathewChanda)

* **Harshal Suthar** - Sophomore at North Carolina State University studying Computer Science - [LinkedIn](https://www.linkedin.com/in/harshal-suthar/) - [GitHub](https://github.com/h-suthar)

* **Anthony Wang** - Sophomore at North Carolina State University studying Statistics - [LinkedIn](https://www.linkedin.com/in/anthony-wang-3aa134164/) - [GitHub](https://github.com/AndongW)

<!-- License??? -->