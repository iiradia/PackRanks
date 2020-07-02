from flask_api import FlaskAPI
from flask import request
from flask_jwt_extended import (
    create_access_token, create_refresh_token
)
from flask_jwt_extended.tokens import decode_jwt
from pymongo import MongoClient
import json
import jwt
from packranks_app import app

DBSTR = ""
SECRET = ""
with open ("packranks_app/email_data.json", "r") as data:

    data = json.load(data)
    DBSTR = data["DBSTR"]
    SECRET = data["SECRET_KEY"]

#save to database
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc

@app.route("/checkMajor", methods=["GET"])
def check_user_major():
    """
    Method to check whether a given user in the DB has selected
    a major. If not, it returns false and the frontend prompts 
    the user to select a major. If so, it returns true and the
    frontend gives back information for the major to the user.
    """
    #save token from headers
    token = request.headers["Token"]
    user_data = jwt.decode(token, SECRET, algorithms=['HS256'])["identity"]
    
    user_query = {
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"],
        "email": user_data["email"]
    }
    #find wishlist for user
    user_db_data = grades_db.users.find_one(
        user_query
    )
    #check for major
    try:
        #save major name
        user_major = user_db_data["major"]

        #save major query
        major_query = {
            "major": user_major
        }
        #save major courses
        major_courses = grades_db.majordatancsu.find_one(major_query)["courses"]

        return_json = {
            "major": user_major,
            "courses": major_courses,
            "success": True
        }
            
        #return info on user major and courses
        return json.dumps(return_json), 200, {'ContentType':'application/json'}
        
    #if the user does not have a major
    except:

        return json.dumps({"success": False}), 500, {"ContentType":"application/json"}


#@app.route("/getMajorList", methods=["GET"])
def get_major_list():
    """
    Method that gets a list of majors for the given college
    selected. It searches the majors database for majors within
    that college.
    """ 
    
    #save college info
    college = request.headers["College"]

    college_query = {
        "college": college
    }

    #save majors based on college
    major_list = grades_db.majordatancsu.find(college_query)

    #save majors in college
    majors_in_college = []

    #iterate through majors
    for major in major_list:
        
        majors_in_college.append(major["major"])

    return_json = {
        "success": True,
        "majors": majors_in_college
    }
    
    #return majors and sucess
    return json.dumps(return_json), 200, {"ContentType": "application/json"}