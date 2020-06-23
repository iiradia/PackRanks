from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import json
import random
from datetime import datetime
import time

# import the hash algorithm
from passlib.hash import pbkdf2_sha256
NUM_ROUNDS =  100000

#number of minutes before token expires
TOKEN_EXPIRATION = 10
#get database string and email pass
DBSTR = ""

with open ("./email_data.json", "r") as data:
    data = json.load(data)
    DBSTR = data["DBSTR"]

#connect to course db
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc

def verify_age(db_token, token_time):
    """
    Helper method for reset password that verifies the age
    of a reset token.
    If the token is older than 10 minutes, deletes it from db.
    Else, returns true.
    """
    is_token = False
    #get current time
    curr_time = datetime.now()

    #convert time in db to datetime
    token_datetime = datetime.strptime(token_time, '%Y-%m-%d %H:%M:%S.%f')

    #convert to Unix timestamp
    curr_ts = time.mktime(curr_time.timetuple())
    token_ts = time.mktime(token_datetime.timetuple())

    #time since token was generated
    token_age = int(curr_ts - token_ts) / 60

    is_token = token_age <= TOKEN_EXPIRATION

    #remove this token from db
    grades_db.reset_tokens.delete_one(db_token)

    return is_token

def verify_token(token):
    """
    This is a helper method for reset password.
    Given the token to verify, it verifies that the token
    is present in the database and that it is less than 10
    minutes old.
    """
    #set the validity to false
    is_token_valid = False
    
    #find db tokens
    db_tokens = grades_db.reset_tokens.find()

    if db_tokens == None:
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

    for db_token in db_tokens:
        #get token in db
        hash_token = db_token["hash_token"]
        #check if token is a match
        is_match = pbkdf2_sha256.verify(token, hash_token)
    
        #verify that token is less than 10 minutes old
        #else delete it
        age = verify_age(db_token, db_token["time"])
        
        #print(db_token)
        if is_match and age: 
            #print("match")
            is_token_valid = True
            #remove this token from db
            grades_db.reset_tokens.delete_one(db_token)

            break
        
    return is_token_valid