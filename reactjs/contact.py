from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import pandas as pd
from math import log10
import re
from __main__ import app
import json
import smtplib

EASYA_EMAIL = "easyamongodb@gmail.com"
EASYA_PASS = "crowdsourcing2020!"

@app.route("/contact", methods=["POST"])
def contact_us():
    """
    Method to process contact input from frontend
    and send email to EasyA developers with inputted
    message.
    """

    contact_data = eval(request.get_data())
    first_name = contact_data["first_name"]
    last_name = contact_data["last_name"]
    email = contact_data["email"]
    phone = contact_data["phone_no"]
    msg = contact_data["message"]

    sender = EASYA_EMAIL
    recipient = EASYA_EMAIL
    subject = f"EasyA Message From - {first_name} {last_name}"

    text = f"{msg}\n\nFrom, {first_name} {last_name}.\n\nSent via {email}. Phone Number: {phone}"

    message = f"Subject: {subject}\n\n{text}"
    #message["Subject"] = subject
    #message["From"] = EASYA_EMAIL
    #message["To"] = EASYA_EMAIL

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(EASYA_EMAIL, EASYA_PASS)
    #server.starttls()
    server.sendmail(sender, recipient, message)
    server.close()

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 