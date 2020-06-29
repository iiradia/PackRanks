import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL = ""
PASS = ""

with open ("packranks_app/email_data.json", "r") as email_data:
    data =  json.load(email_data)
    EMAIL = data["EMAIL"]
    PASS = data["PASS"]

def send_reset_email(recipient_json, token, host_url):
    """
    Helper method for send_reset_link() that sends
    a reset email to the specified recipient with 
    a link with the token.
    """
    #create sender, recipient, and subject
    sender = f"PackRanks <{EMAIL}>"
    recipient =  recipient_json["email"]
    name = recipient_json["name"]
    subject = f"Reset Password Link"

    #get reset link
    reset_link = host_url + "/reset/" + recipient + "/" + str(token)

    #create text
    message = f'''
    <html>
        <head></head>
        <body>
            <b>Hi {name},</b>
            <br/><br/>
            You recently requested to reset your password for
            your PackRanks account. Click <a href={reset_link}>
            this link</a> to reset it.
            <br/><br/>
            If you did not request a password reset, please ignore
            this email or reply to let us know. This password reset
            is only valid for the next 10 minutes.
            <br/><br/>
            Thanks,<br/>
            The PackRanks Team
        </body>
    </html>
    '''

    msg = MIMEMultipart()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "html"))

    #send message
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(EMAIL, PASS)
    #server.starttls()
    server.sendmail(sender, recipient, msg.as_string())
    server.close()

    return 