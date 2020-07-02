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

def send_confirmation_reset(recipient_json):
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

    #create text
    message = f'''
    <html>
        <head></head>
        <body>
            <b>Hi {name},</b>
            <br/><br/>
            Your password for PackRanks was recently reset. 
            If you made this change, please disregard this email.
            <br/><br/>
            If you did not recently change your password,
            reply to this email immediately to let us know.
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