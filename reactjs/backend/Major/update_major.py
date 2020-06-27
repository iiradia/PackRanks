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

DBSTR = ""
SECRET = ""
with open ("./email_data.json", "r") as data:

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