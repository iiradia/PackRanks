#imports
from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import json
import pandas as pd
from packranks_app import app
import datetime
import jwt

from packranks_app.Sanitizer.mongo_sanitizer import (validate_analytics_auth)

DBSTR = ""
SECRET = ""
with open("packranks_app/email_data.json", "r") as data:
    d=json.load(data)
    DBSTR = d["DBSTR"]
    SECRET = d["SECRET_KEY"]

# Connect to database
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc


def get_current_time():
    """
    Helper method to return current time as string.
    """
    return str(datetime.datetime.now())

def get_location_info(ip_addr):
    """
    Helper method to get location info based on ip.
    """
    loc_url = f'http://ip-api.com/json/{ip_addr}'
    try:
        response = requests.get(loc_url)
        return eval(response.text)
    except:
        return {}

def add_analytics_upvote(course, email, first_name, last_name, os_info, ip_addr):
    """
    Helper method that takes in all parameters and inserts analytics in db.
    """
    timestamp = get_current_time()

    # write calls to analytics for google signup
    analytics_to_add = {
        "type_of_call": "Upvote",
        "course_info": course,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "timestamp": timestamp,
        "os_info": os_info, 
        "ip_address": ip_addr,
        "location": get_location_info(ip_addr)
    }

    if not validate_analytics_auth(analytics_to_add):
        return False

    # add analytics to db
    grades_db.analytics_user_data.insert_one(analytics_to_add)

    return True


@app.route('/upvoteCourse', methods=['POST'])
def upvote_course():
    """
    Method that attempts to upvote course for given user.
    """
    #save data
    data = eval(request.get_data())
    ip_addr = request.access_route[0]
    
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    os_info = user_agent.split(')')[0].split('(')[1].strip()

    #decode token and save course to add to wishlist
    course_data = data["course_data"]
    user_data = jwt.decode(data["token"], SECRET, algorithms=['HS256'])["identity"]
    
    user_query = {
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"],
        "email": user_data["email"]
    }

    if not validate_analytics_auth(user_query):
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}
    
    # save information to uniquely identify course
    course_query = {
        "course_name": course_data['Catalog Link'][0],
        "semester": course_data['Semester'],
        "section": course_data['Section'],
        "professor": course_data['RateMyProfessor Link'][0]
    }

    # get user information on whether they have upvoted this course
    user = grades_db.users.find_one(user_query)
    user_has_upvoted = False

    # get current upvotes
    try:
        current_upvotes = grades_db.catalogncsu.find_one(course_query)['user_upvotes']
    except:
        current_upvotes = 0

    try:
        user_upvoted_courses = user['user_upvoted_courses']
    except:
        user_upvoted_courses = []

    for course in user_upvoted_courses:
        course_info = {
            "course_name": course_data['Catalog Link'][0],
            "semester": course_data['Semester'],
            "section": course_data['Section'],
            "professor": course_data['RateMyProfessor Link'][0]
        }
        if course_info == course_query:
            user_has_upvoted = True
            break

    # add analytics for the upvote
    analytics = add_analytics_upvote(course_query, user_data['email'], user_data['first_name'], user_data['last_name'], os_info, ip_addr)
    
    if not analytics:
        return json.dumps({"success":False}),400,{"ContentType":"application/json"}

    if not user_has_upvoted:
        # add course to list of courses user has upvoted
        grades_db.users.update_one(user_query, {"$push": {"user_upvoted_courses": course_data}})

        # upvote course
        grades_db.catalogncsu.update_one(course_query, {"$set": {"user_upvotes": current_upvotes+1}})
    
    else:
        return json.dumps({"success":False}), 200, {"ContentType": "application/json"}
    
    return json.dumps({"success":True}), 200, {"ContentType": "application/json"}
    