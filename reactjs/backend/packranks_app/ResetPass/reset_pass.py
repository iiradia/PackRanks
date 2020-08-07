from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import json
import random
from datetime import datetime
import time
from packranks_app import app

#import helper method
from packranks_app.ResetPass.send_confirmation_reset import send_confirmation_reset
from packranks_app.ResetPass.verify_tokens import verify_token

# import cleanliness
from packranks_app.Sanitizer.mongo_sanitizer import (is_clean_email,is_clean_query,validate_analytics_auth)


# import the hash algorithm
from passlib.hash import pbkdf2_sha256
NUM_ROUNDS =  100000

#number of minutes before token expires
TOKEN_EXPIRATION = 10

#get database string and email pass
DBSTR = ""

with open ("packranks_app/email_data.json", "r") as data:
    data = json.load(data)
    DBSTR = data["DBSTR"]

#connect to course db
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc

@app.route("/resetPass", methods=["POST"])
def reset_password():
    """
    Method to reset user password in database.
    This function also sends an email to the user confirming that
    their password has been changed.
    """
    #save user data
    user_data = json.loads(request.get_data())

    #save each piece of info
    user_email = user_data["email"]
    new_password = user_data["password"]
    token = user_data["token"]

    #call helper method in another file to verify the token
    #'s validity. If it is invalid, return a failure.
    is_token_valid = verify_token(token)
    #print(is_token_valid)
    #if there was no token match, return failure
    if not is_token_valid:
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}
    
    #get the user that requested change
    user_query = {
        "email": user_email
    }

    if not is_clean_email(user_query['email']):
        return json.dumps({"success":False}),400,{"ContentType":"application/json"}
    
    #save new hashed pw
    custom_algo = pbkdf2_sha256.using(rounds=NUM_ROUNDS)
    new_hashed_pw = custom_algo.hash(new_password.encode("utf-8"))
    change_pw_query = {
        "hashed_pw": new_hashed_pw
    }

    #update user password in db
    grades_db.users.update_one(user_query, {"$set": change_pw_query})
    
    #get user's first name
    name = grades_db.users.find_one(user_query)["first_name"]

    #recipient information
    recipient_json = {
        "email": user_email, 
        "name": name
    }
    #send email to user confirming that password was changed
    send_confirmation_reset(recipient_json)

    #return that reset password completed
    return json.dumps({"success":True}), 200, {"ContentType":"application/json"}