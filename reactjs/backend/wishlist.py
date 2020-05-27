from flask_api import FlaskAPI
from flask import request
from flask_jwt_extended import (
    create_access_token, create_refresh_token
)
from flask_jwt_extended.tokens import decode_jwt
from pymongo import MongoClient
from __main__ import app
import json
import jwt

#save to database
crowdsourced = MongoClient("mongodb+srv://dbUser:dbpass@crowdsourced-ogexe.mongodb.net/test")
grades_db = crowdsourced.Coursesnc
SECRET = 'lCObatvHLVE4v514SS54YQ'

"""
In the future, maybe add a feature that sends user confirmation email about
wishlist update and then sends recommended similar courses to user?
"""

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

    #decode token and save course to add to wishlist
    wishlist_course_data = data["course_data"]
    user_data = jwt.decode(data["token"], SECRET, algorithms=['HS256'])["identity"]
    
    user_query = {
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"],
        "email": user_data["email"]
    }
    #update db with wishlist course
    add_wishlist = grades_db.users.update_one(
        user_query,
        {"$push": {"wishlist": wishlist_course_data}}
    )

    #print(wishlist_course_data)
    #print(user_data)
    #return true if successful
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route("/viewWishlist", methods=["GET"])
def view_wishlist():
    """
    Method to display the wishlist for a particular user whose 
    token is sent by the frontend.
    """
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
    print(user_query)

    #collect wishlist from data
    wishlist = user_db_data["wishlist"]
    #print(wishlist)

    return json.dumps(wishlist), 200, {'ContentType':'application/json'}