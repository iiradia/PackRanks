from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
from flask_cors import CORS
app = FlaskAPI(__name__)
CORS(app)
from pymongo import MongoClient
import pandas as pd


@app.route("/gep")
def gepRoute():
    """
    This function receives a call from the GEP component of 
    the ReactJS and returns a JSON of the top 5 courses from the 
    database based on the metrics calculated.
    """
    #access MongoDb database
    crowdsourced = MongoClient("mongodb+srv://dbUser:dbpass@crowdsourced-ogexe.mongodb.net/test")
    grades_db = crowdsourced.Coursesnc

    #get which GEP was requested
    gep_requested = request.headers.get("GEP")

    #if additional breadth, either hum or ss
    if gep_requested == "ADDTL":
        geps_req = ["HUM", "SS"]

    #access  collection with the correct data
    catalog_data = grades_db.catalogncsu.find({
        "gep": {"$regex": gep_requested}
    })

    for course_record in catalog_data:
        print(course_record)
        
    #del catalog_data["_id"]

    return {"request data":catalog_data["course_number"]}


if __name__ == "__main__":
    app.run()