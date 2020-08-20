from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import json
from packranks_app import app
import datetime
# import the hash algorithm
from passlib.hash import pbkdf2_sha256

# for OAuth verification
from google.oauth2 import id_token
from google.auth.transport import requests

# import helper for cleanliness
from packranks_app.Sanitizer.mongo_sanitizer import (validate_analytics_auth, is_clean_email, is_clean_query)


NUM_ROUNDS =  100000

DBSTR = ""
CLIENT_IDS = ""

with open ("packranks_app/email_data.json", "r") as data:
    dat = json.load(data)

    DBSTR = dat["DBSTR"]
    CLIENT_IDS = dat["CLIENT_IDS"]

crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc
#import helpers
from packranks_app.Authentication.auth_helpers import (
    get_user_token, 
    send_signup_email,
    update_os_ip,
    get_current_time,
    get_location_info
)

def add_analytics_auth(type_of_call, type_of_auth, email, first_name, last_name, os_info, ip_addr):
    """
    Helper method that takes in all parameters and inserts analytics in db.
    """
    timestamp = get_current_time()

    # write calls to analytics for google signup
    analytics_to_add = {
        "type_of_call": type_of_call,
        "type_of_auth": type_of_auth,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "timestamp": timestamp,
        "os_info": os_info,
        "ip_address": ip_addr,
        "location": get_location_info(ip_addr)
    }

    # check that analytics is valid
    if not validate_analytics_auth(analytics_to_add):
        return False

    # add analytics to db
    grades_db.analytics_user_data.insert_one(analytics_to_add)

    return True


@app.route("/googleauth", methods=["POST"])
def google_auth():
    """
    Method to handle user signing in via Google.
    This method will either connect the user to their account in the database,
    or create a new account for them.
    """
    google_user_data = json.loads(request.get_data())

    try:
        token = google_user_data['token']
        idinfo = {}
        
         # Specify the CLIENT_ID of the app that accesses the backend:
        for client_id in CLIENT_IDS:
            try:
                idinfo = id_token.verify_token(token, requests.Request(), client_id)
                break
            except: pass
    
        # save information based on token
        user_email = idinfo['email']
        user_first = idinfo['given_name']
        user_last = idinfo['family_name']

    except:
        return 'Invalid token', 400
     
    user_query = {
        "email": google_user_data["email"]
    }
    
    # check that the user email is equivalent to the token
    if user_query['email'] != user_email:
    
        return 'Account does not match token', 400
    
    ip_addr = request.access_route[0]
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    try:
        os_info = user_agent.split(')')[0].split('(')[1].strip()
    except:
        os_info = "Unknown"
    
    # protects against noSQL injection
    if not is_clean_email(user_query['email']):
    
        #return that user made invalid email
        return json.dumps({"success":False, "message": "email was not clean."}), 400, {"ContentType":"application/json"}
    
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
        user = {
                "first_name": google_user_data["first_name"],
                "last_name": "",
                "email": google_user_data["email"],
                "hashed_pw":"",
                "wishlist": {},
                "os_info": [os_info],
                "ip_address_list": [ip_addr],
                "timestamp": get_current_time(),
                "location": get_location_info(ip_addr),
                "account_type": "Google"
            }
        
        try:
            user["last_name"] = google_user_data["last_name"]
        except:
            pass

        # check that user info is valid
        if not validate_analytics_auth(user):
            return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

        #add user to db
        grades_db.users.insert_one(user)

        #send the user an email
        send_signup_email(google_user_data["first_name"], google_user_data["email"])

        #try to find existing user
        current_user = grades_db.users.find_one(user)

        #get user info
        user_info = get_user_token(current_user)
        user_info["type"] = "SignUp"

        # write calls to analytics for google signup
        analytics = add_analytics_auth("SignUp", "Google", google_user_data["email"], google_user_data["first_name"], google_user_data["last_name"], os_info, ip_addr)
        
        # if analytics was malicious, return false
        if not analytics:
            return json.dumps({"success":False}), 400, {"ContentType":'application/json'}

        #return that user was signed up
        return json.dumps(user_info), 200, {"ContentType":"application/json"}

    else:
        """
        Send user to their homepage
        """
        user_info = get_user_token(google_user)
        
        # ensure that os and ip are clean
        if not is_clean_query(os_info) or not is_clean_query(ip_addr):
        
            return json.dumps({"success":False, "message": "IP/OS was not clean."}), 400, {"ContentType":"application/json"}
        
        # update os and ip address in db
        update_os_ip(google_user, os_info, ip_addr)

        # write calls to analytics for google signup
        analytics = add_analytics_auth("Login", "Google", google_user_data["email"], google_user_data["first_name"], google_user_data["last_name"], os_info, ip_addr)
        
        # if analytics was malicious, return false
        if not analytics:
        
            return json.dumps({"success":False, "message": "Analytics was not clean."}), 400, {"ContentType":'application/json'}
        
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
    login_data = json.loads(request.get_data())
    login_pwd = login_data["password"].encode("utf-8")
    ip_addr = request.access_route[0]
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    try:
        os_info = user_agent.split(')')[0].split('(')[1].strip()
    except:
        os_info = "Unknown"

    #save user information
    user_query = {
        "email":login_data["email"]
    }

    # protects against noSQL injection
    if not is_clean_email(user_query['email']):

        #return that user made invalid email
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}


    #try to find existing user
    current_user = grades_db.users.find_one(user_query)
    if current_user == None:
        return json.dumps({'success':False}), 404, {"ContentType":"application/json"}

    #if no existing user, add to db
    else: 

        # try to find hashed pw
        try:
            user_hashed_pw = current_user['hashed_pw']
        except: 
            user_hashed_pw = ""
        
        # try to find dollar sign indices
        try:
            dollar_sign_indices = current_user['dollar_sign_indices']
        except:
            dollar_sign_indices = []

        # ensure that os and ip are clean
        if not is_clean_query(os_info) or not is_clean_query(ip_addr):
            return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

        # update os and ip information
        update_os_ip(current_user, os_info, ip_addr)
        
        #if user is using google, must sign in through google instead.
        if user_hashed_pw == "":
            return json.dumps({'success':False}), 404, {"ContentType":"application/json"}
        
        # modify the user hashed pwd to include indices
        user_hashed_pw = list(user_hashed_pw)
        for idx in dollar_sign_indices:
            user_hashed_pw.insert(idx, '$')

        user_hashed_pw = ''.join(user_hashed_pw)
        is_authenticated = pbkdf2_sha256.verify(login_pwd, user_hashed_pw)
        if not is_authenticated:
            return json.dumps({'success':False}), 404, {"ContentType":"application/json"}
        
        #get current user's info
        user_info = get_user_token(current_user)

        # write calls to analytics
        analytics = add_analytics_auth("Login", "PackRanks", login_data["email"], current_user["first_name"], current_user["last_name"], os_info, ip_addr)

        # if analytics was malicious, return false
        if not analytics:
            return json.dumps({"success":False}), 400, {"ContentType":'application/json'}

        return json.dumps(user_info), 200,
        {'ContentType':'application/json'}


@app.route("/signup", methods=["POST"])
def sign_up():
    """
    Method to enter new user information in the 
    database and hash authenticated password.
    """
    #get user data
    user_data = json.loads(request.get_data())
    ip_addr = request.access_route[0]
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    try:
        os_info = user_agent.split(')')[0].split('(')[1].strip()
    except:
        os_info = "Unknown"

    #use hash library to hash the password
    # generate new salt, and hash a password
    custom_algo = pbkdf2_sha256.using(rounds=NUM_ROUNDS)
    hashed_pw = custom_algo.hash(user_data["password"].encode("utf-8"))

    # remove dollar sign and save indices
    dollar_sign_indices = [i for i,j in enumerate(list(hashed_pw)) if j=='$']    
    hashed_pw = hashed_pw.replace('$', '')

    #save user information
    user = {
        "first_name":user_data["first_name"],
        "last_name":user_data["last_name"],
        "email":user_data["email"],
        "hashed_pw":hashed_pw,
        "wishlist": {},
        "os_info": [os_info],
        "ip_address_list": [ip_addr],
        "timestamp": get_current_time(),
        "location": get_location_info(ip_addr),
        "account_type": "PackRanks"
    }

    # check that user info is valid
    if not validate_analytics_auth(user):
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

    #try to find existing user
    current_user = grades_db.users.find_one({"email":user["email"]})
    if current_user != None:
        return json.dumps({'success':False}), 404, {"ContentType":"application/json"}

    #if no existing user, add to db
    else:
        
        # save dollar sign indices and save in db
        user['dollar_sign_indices'] = dollar_sign_indices
        grades_db.users.insert_one(user)

        #send user confirmation email!
        first_name = user["first_name"]
        last_name = user["last_name"]
        email = user["email"]

        #send an email to user who signed up
        send_signup_email(first_name, email)

        # write calls to analytics
        analytics = add_analytics_auth("SignUp", "PackRanks", user_data["email"], user_data["first_name"], user_data["last_name"], os_info, ip_addr)

        # if analytics was malicious, return false
        if not analytics:
            return json.dumps({"success":False}), 400, {"ContentType":'application/json'}

        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 