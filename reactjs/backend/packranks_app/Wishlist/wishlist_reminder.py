#imports
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import Chrome
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver import DesiredCapabilities
import time
from time import sleep
from pymongo import MongoClient
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from packranks_app.Course.prep_course_for_table import prepare_course
import json
from packranks_app import app

EMAIL = ""
PASS = ""
DBSTR = ""

with open ("packranks_app/email_data.json", "r") as email_data:
    data =  json.load(email_data)
    EMAIL = data["EMAIL"]
    PASS = data["PASS"]
    DBSTR = data["DBSTR"]

def setup_seleniumdriver():
    """
    Helper method for scrape_course_info, sets up selenium chromedriver
    with correct parameters for Headless Chrome usage.
    """
    #make sure the browser doesn't open
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1080")
    capabilities = DesiredCapabilities.CHROME.copy()
    capabilities["acceptSslCerts"] = True
    capabilities["acceptInsecureCerts"] = True
    #create driver with params
    driver = Chrome(options=chrome_options, desired_capabilities=capabilities)

    return driver

def scrape_course_info(course_info):
    """
    This helper method uses Selenium to scrape the prioritized course and return
    the new information to be updated.
    """
    course_code = course_info["Course"][0]
    dept = course_code.split(" ")[0]
    #driver = setup_seleniumdriver()

    #go to catalog website and find browse menu
    #driver.get("https://www.acs.ncsu.edu/php/coursecat/directory.php")
    
    #find list of depts
    #browse_menu = driver.find_element_by_id("browse-menu")  
    #browse_depts = browse_menu.find_elements_by_tag_name("a")

    #current_dept = [i.get_attribute("data-value") for i in browse_depts if (i.get_attribute("data-value").split("-")[0].strip() == dept)][0]
    print(f"Code: {course_code} Dept: {dept}")
    #print(f"Dept found: {current_dept}")
    print("INFO\n")
    #print(course_info)

def notify_user_open(user, course):
    """
    Helper method for check wishlist that emails user 
    that the specified course on their wishlist has opened!
    """
    course_code = course["Course"][0]
    course_name = course["Name"]
    #create sender, recipient, and subject
    sender = f"PackRanks <{EMAIL}>"
    recipient =  user["email"]
    first_name = user["first_name"]
    subject = f"{course_code} from your Wishlist is now OPEN!!"

    #create text
    text =  f"Hi {first_name},\n\nWe noticed that the course {course_code} was closed when you added it to your Wishlist. However, a seat has just opened up!!\n\nIf you are still interested in taking {course_code}, head to MyPack right now and enroll in it!\n\nNote: This is an automated message sent by our servers when we detect an open seat in a course on your Wishlist! We are always looking out for your academic needs :)\n\n\nYour Friends at PackRanks"

    message = f"Subject: {subject}\n\n{text}"

    msg = MIMEMultipart()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(text, "plain"))

    #send message
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(EMAIL, PASS)
    #server.starttls()
    server.sendmail(sender, recipient, msg.as_string())
    server.close()

    return 


def check_wishlist_courses():
    """
    Function to constantly iterate through all user wishlists, find the courses
    that are closed, and compare them to the updated database to see if a course
    has opened up.
    """
    #get access to db
    crowdsourced = MongoClient(DBSTR)
    grades_db = crowdsourced.Coursesnc
    
    while True:

        #save db variables
        user_db = grades_db.users
        course_db = grades_db.catalogncsu

        #get list of usres
        all_users = user_db.find()

        #iterate through user
        for user in all_users:
            
            user_wishlist = user["wishlist"]
            user_wishlist_closed = []

            #iterate through user wishlist to find ones that are closed
            for term in user_wishlist:
                term_arr = user_wishlist[term]

                for course in term_arr:
                    seats = course["Seats"]

                    #if course is waitlisted, add it to list
                    if "Waitlist" in seats:
                        user_wishlist_closed.append(course)
                    #if course is open, check if seats is 0
                    elif "Open" in seats:
                        seats_open = int(seats.split(":")[1].split("/")[0].strip())

                        if seats_open == 0:
                            user_wishlist_closed.append(course)
                    elif "Closed" in seats:
                        user_wishlist_closed.append(course)
                    
            #find all user courses that are full in wishlist
            #user_wishlist_closed = [dict(i) for i in user_wishlist if dict(i)["seats open"].split("/")[0] == "0"]
            
            #iterate through each closed course
            for course in user_wishlist_closed:
                #print(course)
                
                #query course in catalog database
                course_query = {
                    "course_name": course["Catalog Link"][0],
                    "section": course["Section"],
                    "semester": course["Semester"]
                }

                course_in_catalog = course_db.find_one(course_query)
                
                updated_seats_open = course_in_catalog["seats_open"]
                seats_total = course_in_catalog["seats_total"]
                
                #print(course_in_catalog)
                """
                Here, scrape the course information for each course in waitlist
                so we can see directly which prioritized courses have changed.
                """
                #updated_course_info = scrape_course_info(course)

                if updated_seats_open > 0: 

                    #send an email to the user that the course has opened up
                    notify_user_open(user, course)

                    #update db to include new seats
                    user_db.update_one(
                        {
                            "_id": user["_id"],
                            "wishlist": {
                                "$elemMatch": course 
                            }
                        },
                        {
                            "$set": {
                                "wishlist.$.seats open": f"{updated_seats_open}/{seats_total}"
                            }
                        }

                    )

                    user_name = user["email"]
                    course_name = course["Course"][0]
                    print(f"Notifying {user_name} that course {course_query} has opened!!")
    
            