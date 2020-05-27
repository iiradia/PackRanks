from flask_api import FlaskAPI
from flask import request
from flask_jwt_extended import (
    create_access_token, create_refresh_token
)
from pymongo import MongoClient
from __main__ import app
import json
import hashlib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

crowdsourced = MongoClient("mongodb+srv://dbUser:dbpass@crowdsourced-ogexe.mongodb.net/test")
grades_db = crowdsourced.Coursesnc
EASYA_EMAIL = "easyamongodb@gmail.com"
EASYA_PASS = "crowdsourcing2020!"

@app.route("/login", methods=["POST"])
def login():
    """
    Method to handle user logging in from main page.
    If they login successfully, return success to 
    frontend.
    """
    #get user data
    login_data = eval(request.get_data())
    #print(login_data)

    #use hash library to hash the password
    hashGenerator = hashlib.sha512()
    hashGenerator.update(login_data["password"].encode('utf-8'))
    hashed_pw = hashGenerator.hexdigest()
    #print(hashed_pw)

    #save user information
    user_query = {
        "email":login_data["email"]
    }

    #try to find existing user
    current_user = grades_db.users.find_one(user_query)
    if current_user == None or current_user["hashed_pw"] != hashed_pw:
        return json.dumps({'success':False}), 404, {"ContentType":"application/json"}

    #if no existing user, add to db
    else:
        #what to return to frontend
        del current_user["hashed_pw"]
        del current_user["_id"]
        access_token = create_access_token(identity=current_user)
        refresh_token = create_refresh_token(identity=current_user)

        json_to_return = {
            "success":True,
            "token":access_token,
            "refresh":refresh_token
        }

        return json.dumps(json_to_return), 200,
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
    hashGenerator = hashlib.sha512()
    hashGenerator.update(user_data["password"].encode('utf-8'))
    hashed_pw = hashGenerator.hexdigest()
    #print(hashed_pw)

    #save user information
    user = {
        "first_name":user_data["first_name"],
        "last_name":user_data["last_name"],
        "email":user_data["email"],
        "hashed_pw":hashed_pw,
        "wishlist": []
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

        sender = f"PackRanks <{EASYA_EMAIL}>"
        recipient =  email
        subject = f"Welcome to PackRanks, {first_name}!"

        text =  f"Hi {first_name},\n\nThanks for signing up for PackRanks! We're excited to see what content we can provide for you.\n\nIf you ever have any questions or concerns about our application, hit us up at {EASYA_EMAIL}. Our inbox is always open! Anyway, we'll let you go use PackRanks now. Thanks again for your support!\n\nGO PACK!!\nYour Friends at PackRanks"

        message = f"Subject: {subject}\n\n{text}"
    
        msg = MIMEMultipart()
        msg["From"] = sender
        msg["To"] = recipient
        msg["Subject"] = subject
        msg.attach(MIMEText(text, "plain"))


        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(EASYA_EMAIL, EASYA_PASS)
        #server.starttls()
        server.sendmail(sender, recipient, msg.as_string())
        server.close()

        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 