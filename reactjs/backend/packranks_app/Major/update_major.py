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

# import cleanliness
from packranks_app.Sanitizer.mongo_sanitizer import (is_clean_email,is_clean_query,validate_analytics_auth)


DBSTR = ""
SECRET = ""
with open ("packranks_app/email_data.json", "r") as data:

    data = json.load(data)
    DBSTR = data["DBSTR"]
    SECRET = data["SECRET_KEY"]

#save to database
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc


@app.route("/saveMajor", methods=["GET"])
def save_user_major():
    """
    Method to save a user's chosen major in the database for future use.
    """
    #save token from headers
    token = request.headers["Token"]
    user_data = jwt.decode(token, SECRET, algorithms=['HS256'])["identity"]
    
    user_query = {
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"],
        "email": user_data["email"]
    }

    if not validate_analytics_auth(user_query):
        return json.dumps({"success":False}),400,{"ContentType":"application/json"}

    #save new user major information
    major = request.headers["Major"]
    major_query = {
        "major": major
    }

    #update db for user with inputted major
    user_db_data = grades_db.users.update_one(
        user_query,
        {"$set": major_query}
    )

    return json.dumps({"success": True}), 200, {"ContentType": "application/json"}