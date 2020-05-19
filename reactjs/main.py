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
    if gep_requested != "HES":
        catalog_data = grades_db.catalogncsu.aggregate([
            {"$match" :{"gep" :{"$regex": gep_requested},
            "course_type": "Lecture"}},
            {"$sort": {"rating":-1}},
            {"$limit": 5}
        ])
    else:
        catalog_data = grades_db.catalogncsu.aggregate([
            {"$match" :{"gep" :{"$regex": gep_requested}}},
            {"$sort": {"rating":-1}},
            {"$limit": 5}
        ])

    #json to return
    relevant_data = []
    relevant_keys = [
        "course_name",
        "professor",
        "section",
        "semester",
        "prereq_string",
        "location",
        "course_dates",
        "ratemyprof_link"
    ]

    for record in catalog_data:

        course_data = { key: record[key] for key in relevant_keys}
        
        open_seats = str(record["seats_open"])
        total_seats = str(record["seats_total"])
        course_data["seats"] = f"{open_seats}/{total_seats}"

        relevant_data.append(course_data)
        
    #del catalog_data["_id"]
    print(relevant_data)
    return relevant_data


if __name__ == "__main__":
    app.run()