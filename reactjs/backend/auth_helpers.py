#imports
from flask_jwt_extended import (
    create_access_token, create_refresh_token
)
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

EMAIL = ""
PASS = ""

with open ("email_data.json", "r") as email_data:
    data =  json.load(email_data)
    EMAIL = data["EMAIL"]
    PASS = data["PASS"]

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
    #create sender, recipient, and subject
    sender = f"PackRanks <{EMAIL}>"
    recipient =  email
    subject = f"Welcome to PackRanks, {first_name}!"

    #create text
    text =  f"Hi {first_name},\n\nThanks for signing up for PackRanks! We're excited to see what content we can provide for you.\n\nIf you ever have any questions or concerns about our application, hit us up at {EMAIL}. Our inbox is always open! Anyway, we'll let you go use PackRanks now. Thanks again for your support!\n\nGO PACK!!\nYour Friends at PackRanks"

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