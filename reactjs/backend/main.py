from flask_api import FlaskAPI
from flask import request
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager
app = FlaskAPI(__name__)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=1)

app.config["SECRET_KEY"] = 'lCObatvHLVE4v514SS54YQ'

CORS(app)
jwt = JWTManager(app)
import contact
import auth
import course_data
import wishlist


if __name__ == "__main__":
    app.run()