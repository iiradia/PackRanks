from flask_api import FlaskAPI
from flask import request
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager
from multiprocessing import Process
app = FlaskAPI(__name__)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

app.config["SECRET_KEY"] = 'lCObatvHLVE4v514SS54YQ'

CORS(app)
jwt = JWTManager(app)

#import flask files within project
from Contact import contact
from Authentication import auth
from Course import course_data
from Wishlist import wishlist
from Wishlist.wishlist_reminder import check_wishlist_courses
from ForgotPass import forgot_password
from ResetPass import reset_pass

if __name__ == "__main__":
    p = Process(target=check_wishlist_courses)
    p.start()
    app.run(use_reloader=False)
    p.join()
    #app.run()