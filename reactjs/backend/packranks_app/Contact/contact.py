from flask_api import FlaskAPI
from flask import request
import re
import json
import smtplib
from packranks_app import app
from packranks_app.Sanitizer.mongo_sanitizer import (is_clean_email, is_clean_query)

EMAIL = ""
PASS = ""
with open("packranks_app/email_data.json", "r") as data:
    json_data = json.load(data)
    EMAIL = json_data["EMAIL"]
    PASS = json_data["PASS"]

def send_confirmation_email(sender, password, recipient, name):
    """
    Method to send confirmation email regarding
    contact when user fills out form.
    """
    subject = 'Automated Reply - PackRanks Contact Us Form Submission'
    msg = f"Hey {name},\n\nThank you for contacting PackRanks! We have received your message and will get back to you as soon as possible!\n\nBest Regards,\nPackRanks Team"
    full_msg = f"Subject: {subject}\n\n{msg}"

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(sender, password)

    server.sendmail(sender, recipient, full_msg)
    server.close()

    return

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

    if not is_clean_query(first_name) or not is_clean_query(last_name) or not is_clean_email(email) or not is_clean_query(phone) or not is_clean_query(msg):
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

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

    send_confirmation_email(sender, PASS, email, first_name)

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 