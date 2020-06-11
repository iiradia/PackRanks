from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
from __main__ import app
import json
import hashlib
# import the hash algorithm
from passlib.hash import pbkdf2_sha256
NUM_ROUNDS =  100000

DBSTR = ""
with open ("email_data.json", "r") as data:
    DBSTR = json.load(data)["DBSTR"]

crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc
#import helpers
from auth_helpers import (
    get_user_token, send_signup_email
)

@app.route("/googleauth", methods=["POST"])
def google_auth():
    """
    Method to handle user signing in via Google.
    This method will either connect the user to their account in the database,
    or create a new account for them.
    """
    google_user_data = eval(request.get_data())

    user_query = {
        "email": google_user_data["email"]
    }
    #attempt to find user with information given
    google_user = grades_db.users.find_one(user_query)

    if google_user == None:
        """
        Options:  
            - here we can add a user to the database with no password, and 
            thus no one can access their account unless they sign in with their Google account

            - alternatively, we could redirect a user to a signup page on the frontend
            where they can enter a password
        """
        #save user information
        try:
            user = {
                "first_name": google_user_data["first_name"],
                "last_name": google_user_data["last_name"],
                "email": google_user_data["email"],
                "hashed_pw":"",
                "wishlist": {}
            }
        except:
            user = {
                "first_name": google_user_data["first_name"],
                "last_name": "",
                "email": google_user_data["email"],
                "hashed_pw":"",
                "wishlist": {}
            }

        #add user to db
        grades_db.users.insert_one(user)

        #send the user an email
        send_signup_email(google_user_data["first_name"], google_user_data["email"])

        #try to find existing user
        current_user = grades_db.users.find_one(user)

        #get user info
        user_info = get_user_token(current_user)
        user_info["type"] = "SignUp"
        
        #return that user was signed up
        return json.dumps(user_info), 200, {"ContentType":"application/json"}

    else:
        """
        Send user to their homepage
        """
        user_info = get_user_token(google_user)

        return json.dumps(user_info), 200,
        {'ContentType':'application/json'}


    return json.dumps({'success':False}), 404, {"ContentType":"application/json"}

@app.route("/login", methods=["POST"])
def login():
    """
    Method to handle user logging in from main page.
    If they login successfully, return success to 
    frontend.
    """
    #get user data
    login_data = eval(request.get_data())
    login_pwd = login_data["password"].encode("utf-8")
    #print(login_data)

    #save user information
    user_query = {
        "email":login_data["email"]
    }
    #try to find existing user
    current_user = grades_db.users.find_one(user_query)
    if current_user == None:
        return json.dumps({'success':False}), 404, {"ContentType":"application/json"}

    #if no existing user, add to db
    else:
        # verifying the password
        user_hashed_pw = current_user["hashed_pw"]
        
        #if user is using google, must sign in through google instead.
        if user_hashed_pw == "":
            return json.dumps({'success':False}), 404, {"ContentType":"application/json"}
        
        is_authenticated = pbkdf2_sha256.verify(login_pwd, user_hashed_pw)
        if not is_authenticated:
            return json.dumps({'success':False}), 404, {"ContentType":"application/json"}
        
        #get current user's info
        user_info = get_user_token(current_user)

        return json.dumps(user_info), 200,
        {'ContentType':'application/json'}


@app.route("/signup", methods=["POST"])
def sign_up():
    """
    Method to enter new user information in the 
    database and hash authenticated password.
    """
    #get user data
    user_data = eval(request.get_data())
    #print(user_data)

    #use hash library to hash the password
    # generate new salt, and hash a password
    custom_algo = pbkdf2_sha256.using(rounds=NUM_ROUNDS)
    hashed_pw = custom_algo.hash(user_data["password"].encode("utf-8"))
    #print(hashed_pw)

    #save user information
    user = {
        "first_name":user_data["first_name"],
        "last_name":user_data["last_name"],
        "email":user_data["email"],
        "hashed_pw":hashed_pw,
        "wishlist": {}
    }

    #try to find existing user
    current_user = grades_db.users.find_one({"email":user["email"]})
    if current_user != None:
        return json.dumps({'success':False}), 404, {"ContentType":"application/json"}

    #if no existing user, add to db
    else:
        grades_db.users.insert_one(user)

        #send user confirmation email!
        first_name = user["first_name"]
        last_name = user["last_name"]
        email = user["email"]

        #send an email to user who signed up
        send_signup_email(first_name, email)

        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 