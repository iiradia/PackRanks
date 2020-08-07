from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import json
import random
import datetime
from packranks_app import app
# import the hash algorithm
from passlib.hash import pbkdf2_sha256
NUM_ROUNDS =  100000

#import send reset email
from packranks_app.ForgotPass.send_reset_email import send_reset_email

# import cleanliness
from packranks_app.Sanitizer.mongo_sanitizer import (is_clean_email,is_clean_query,validate_analytics_auth)

#get database string and email pass
DBSTR = ""
EMAIL = ""
PASS = ""

with open ("packranks_app/email_data.json", "r") as data:
    data = json.load(data)
    DBSTR = data["DBSTR"]
    EMAIL = data["EMAIL"]
    PASS = data["PASS"]

#connect to course db
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc


@app.route("/resetLink", methods=["POST"])
def send_reset_link():
    """
    Method to send reset link to user with unique access token.
    Generate token via hashed 128-bit string.
    Save creation time in db as well as hash.
    """
    try:
        #save user data
        user_data = json.loads(request.get_data())
        #save current host url
        host_url = request.origin
        #print(host_url)
        #save recipient email
        recipient_email = user_data["email"]
        
        user_query = {
            "email": recipient_email
        }

        if not is_clean_email(user_query['email']):
            return json.dumps({"success":False}), 400, {"ContentType":"application/json"} 

        #find user via email
        user = grades_db.users.find_one(user_query)

        #get first name of user
        recipient_name = user["first_name"]

        #generate token with random bits
        token_string = str(random.getrandbits(128))

        #hash token with the sha algorithm
        custom_algo = pbkdf2_sha256.using(rounds=NUM_ROUNDS)
        hash_token = custom_algo.hash(token_string.encode("utf-8"))

        #save recipient information to send to reset email.
        recipient_json = {
            "email": recipient_email,
            "name": recipient_name
        }

        #send reset email to user with correct information
        send_reset_email(recipient_json, token_string, host_url)

        #get current time to save with token in db
        curr_time = str(datetime.datetime.now())

        token_info = {
            "hash_token": hash_token,
            "time": curr_time
        }

        #add token information to db
        grades_db.reset_tokens.insert_one(token_info)

        #return that reset link was sent
        return json.dumps({"success":True}), 200, {"ContentType":"application/json"}
    
    #if code fails
    except:
        return json.dumps({'success':False}), 200, {"ContentType":"application/json"}
