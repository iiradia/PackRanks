#imports
from flask_jwt_extended import (
    create_access_token, create_refresh_token
)
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import requests
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256
import datetime
from packranks_app import app

from packranks_app.Sanitizer.mongo_sanitizer import (is_clean_query, is_clean_email)

EMAIL = ""
PASS = ""
DBSTR = ""

with open ("packranks_app/email_data.json", "r") as email_data:
    data =  json.load(email_data)
    EMAIL = data["EMAIL"]
    PASS = data["PASS"]
    DBSTR = data["DBSTR"]

# connect to database
crowdsourced = MongoClient(DBSTR)
grades_db = crowdsourced.Coursesnc

def update_os_ip(user, os, ip):
    """
    Helper method to check if current os and ip is recorded for user. 
    If not, record it in database for that user.
    """
    try:
        os_recorded = user["os_info"]
        ip_address_list = user["ip_address_list"]

    except:
        # if user did not exist
        grades_db.users.update_one(user, {"$push": {"os_info": os}})
        grades_db.users.update_one(user, {"$push": {"ip_address_list":ip}})

        return 
        
    update_user = {}

    if os not in os_recorded:
        grades_db.users.update_one(user, {'$push': {'os_info': os}})
    if ip not in ip_address_list:
        grades_db.users.update_one(user, {'$push': {'ip_address_list': ip}})
    
    return

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

def get_user_token (user): 
    """
    Helper method that takes in user dictionary, deletes necessary columns,
    and returns the json that should be returned to the frontend.
    """
    #what to return to frontend
    del user["hashed_pw"]
    del user["_id"]
    access_token = create_access_token(identity=user)
    refresh_token = create_refresh_token(identity=user)

    json_to_return = {
        "success":True,
        "token":access_token,
        "refresh":refresh_token
    }

    return json_to_return

def send_signup_email(first_name, email):
    """
    Helper method to send an email to a user who just signed up 
    welcoming them to PackRanks.
    """

    # if not valid queries, just return without sending email
    if not is_clean_query(first_name) or not is_clean_email(email):
        return 

    #create sender, recipient, and subject
    sender = f"PackRanks <{EMAIL}>"
    recipient =  email
    subject = f"Welcome to PackRanks, {first_name}!"

    #create text
    text =  f"Hi {first_name},\n\nThanks for signing up for PackRanks! We're excited to see what content we can provide for you.\n\nIf you ever have any questions or concerns about our application, please reach out to us at {EMAIL}. Our inbox is always open! Anyway, we'll let you go use PackRanks now. Thanks again for your support!\n\nGO PACK!!\nYour Friends at PackRanks"

    message = f"Subject: {subject}\n\n{text}"

    msg = MIMEMultipart()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(text, "plain"))

    #send message
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(EMAIL, PASS)
    #server.starttls()
    server.sendmail(sender, recipient, msg.as_string())
    server.close()

    return 