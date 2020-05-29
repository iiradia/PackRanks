from flask_api import FlaskAPI
from flask import request
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager
#from multiprocessing import Process
app = FlaskAPI(__name__)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

app.config["SECRET_KEY"] = 'lCObatvHLVE4v514SS54YQ'

CORS(app)
jwt = JWTManager(app)
import contact
import auth
import course_data
import wishlist
from wishlist_reminder import check_wishlist_courses

if __name__ == "__main__":
    #p = Process(target=check_wishlist_courses)
    #p.start()
    #app.run(use_reloader=False)
    #p.join()
    app.run()