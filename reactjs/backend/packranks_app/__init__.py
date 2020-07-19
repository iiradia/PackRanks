from flask_api import FlaskAPI
from flask import request
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager
from multiprocessing import Process
import json
app = FlaskAPI(__name__)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

SECRET_KEY=""

with open("packranks_app/email_data.json", "r") as d:
    data = json.load(d)
    SECRET_KEY = data["SECRET_KEY"]

app.config["SECRET_KEY"] = SECRET_KEY

CORS(app)
jwt = JWTManager(app)

#import flask files within project
from packranks_app.Contact import contact
from packranks_app.Authentication import auth
from packranks_app.Course import course_data, rating_upvotes
from packranks_app.Wishlist import wishlist
#from packranks_app.Wishlist.wishlist_reminder import check_wishlist_courses
from packranks_app.ForgotPass import forgot_password
from packranks_app.ResetPass import reset_pass
from packranks_app.Major import check_major, update_major

if __name__ == "__main__":
    #p = Process(target=check_wishlist_courses)
    #p.start()
    #app.run(use_reloader=False)
    #p.join()
    app.run()