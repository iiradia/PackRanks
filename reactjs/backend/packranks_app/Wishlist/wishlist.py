from flask_api import FlaskAPI
from flask import request
from flask_jwt_extended import (
    create_access_token, create_refresh_token
)
from flask_jwt_extended.tokens import decode_jwt
from pymongo import MongoClient
import json
import jwt
from collections import defaultdict
from packranks_app import app
import datetime
import requests

DBSTR = ""
SECRET = ""
with open ("packranks_app/email_data.json", "r") as data:
    d = json.load(data)
    DBSTR = d["DBSTR"]
    SECRET = d["SECRET_KEY"]
#save to databas
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc

"""
In the future, maybe add a feature that sends user confirmation email about
wishlist update and then sends recommended similar courses to user?
"""
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

def add_analytics_wishlist(type_of_wishlist, email, first_name, last_name, os_info, ip_addr):
    """
    Helper method that takes in all parameters and inserts analytics in db.
    """
    timestamp = get_current_time()

    # write calls to analytics for google signup
    analytics_to_add = {
        "type_of_call": "Wishlist",
        "type_of_wishlist": type_of_wishlist,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "timestamp": timestamp,
        "os_info": os_info, 
        "ip_address": ip_addr,
        "location": get_location_info(ip_addr)
    }
    # add analytics to db
    grades_db.analytics_user_data.insert_one(analytics_to_add)

@app.route("/resetWishlist", methods=["POST"])
def reset_wishlist():
    """
    Method to reset the wishlist to what the user inputted
    after deleting selected items.
    """
    #save data
    data = eval(request.get_data())

    #decode token and save new wishlist data
    new_wishlist = data["wishlist"]
    user_data = jwt.decode(data["token"], SECRET, algorithms=["HS256"])["identity"]
    #print(user_data)
    
    #use user_query as it removes wishlist and searches
    #for the correct user whose info was provided
    user_query = {
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"],
        "email": user_data["email"]
    }
    #update db with new wishlist
    update_wishlist = grades_db.users.update_one(
        user_query,
        {"$set": {"wishlist": new_wishlist}}
    )

    return json.dumps({"success":True}), 200, {"ContentType":"application/json"}

@app.route("/addWishlist", methods=["POST"])
def add_course_to_wishlist():
    """
    Method to process input from frontend containing course
    to add to wishlist and which user the course is for.
    """
    #save data
    data = eval(request.get_data())
    ip_addr = request.access_route[0]
    
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    os_info = user_agent.split(')')[0].split('(')[1].strip()

    #decode token and save course to add to wishlist
    wishlist_course_data = data["course_data"]
    user_data = jwt.decode(data["token"], SECRET, algorithms=['HS256'])["identity"]
    
    user_query = {
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"],
        "email": user_data["email"]
    }

    #current wishlist
    current_wishlist = grades_db.users.find_one(user_query)["wishlist"]

    #check for duplicates in wishlist
    for wishlist_term in current_wishlist.keys():
        for wishlist_item in current_wishlist[wishlist_term]:
            if wishlist_item == wishlist_course_data:
                return json.dumps({"success":False, "duplicate":True}), 404, {"ContentType": "application/json"}

    #term_to_update
    term_to_update = wishlist_course_data["Semester"]

    try:
        current_wishlist[term_to_update].append(wishlist_course_data)
    except:
        current_wishlist[term_to_update] = [wishlist_course_data]
    #update db with wishlist course
    add_wishlist = grades_db.users.update_one(
        user_query,
        {"$set": {"wishlist": current_wishlist}}, 
        upsert=True
    )

    # write calls to analytics for google signup
    add_analytics_wishlist("Add", user_data["email"], user_data["first_name"], user_data["last_name"], os_info, ip_addr)

    #return true if successful
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route("/viewWishlist", methods=["GET"])
def view_wishlist():
    """
    Method to display the wishlist for a particular user whose 
    token is sent by the frontend.
    """
    token = request.headers["Token"]
    ip_addr = request.access_route[0]
    
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    os_info = user_agent.split(')')[0].split('(')[1].strip()

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
    
    #collect wishlist from data
    wishlist = user_db_data["wishlist"]

    #go through each term and ensure that 
    #it has courses
    for term in list(wishlist):
        
        #if term is empty, remove it from the items
        #to be rendered to the user.
        if len(wishlist[term]) == 0:
            del wishlist[term] 

    # write calls to analytics for google signup
    add_analytics_wishlist("View", user_data["email"], user_data["first_name"], user_data["last_name"], os_info, ip_addr)


    #print(wishlist)
    return json.dumps(wishlist), 200, {'ContentType':'application/json'}