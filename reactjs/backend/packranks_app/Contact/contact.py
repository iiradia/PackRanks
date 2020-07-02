from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import pandas as pd
from math import log10
import re
import json
import smtplib
from packranks_app import app

EMAIL = ""
PASS = ""
with open("packranks_app/email_data.json", "r") as data:
    json_data = json.load(data)
    EMAIL = json_data["EMAIL"]
    PASS = json_data["PASS"]

@app.route("/contact", methods=["POST"])
def contact_us():
    """
    Method to process contact input from frontend
    and send email to EasyA developers with inputted
    message.
    """

    contact_data = json.loads(request.get_data().decode("utf-8"))
    #print(contact_data)
    #del contact_data["re_captcha"]

    #print(contact_data)
    first_name = contact_data["first_name"]
    last_name = contact_data["last_name"]
    email = contact_data["email"]
    phone = contact_data["phone_no"]
    msg = contact_data["message"]

    sender = EMAIL
    recipient = EMAIL
    subject = f"PackRanks Message From - {first_name} {last_name}"

    text = f"{msg}\n\nFrom, {first_name} {last_name}.\n\nSent via {email}. Phone Number: {phone}"

    message = f"Subject: {subject}\n\n{text}"
    #message["Subject"] = subject
    #message["From"] = EASYA_EMAIL
    #message["To"] = EASYA_EMAIL

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(EMAIL, PASS)
    #server.starttls()
    server.sendmail(sender, recipient, message)
    server.close()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 