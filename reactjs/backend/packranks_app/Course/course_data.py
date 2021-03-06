#imports
from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
import json
import pandas as pd
from math import log10
import re
import bson
from packranks_app.Course.prep_course_for_table import prepare_course
from packranks_app import app, limiter
import datetime
import requests

# import helper method for cleanliness
from packranks_app.Sanitizer.mongo_sanitizer import (validate_analytics_auth, is_clean_query, is_clean_email)

NUM_COURSES = 20
HARD_MAX = 10
DBSTR = ""
with open("packranks_app/email_data.json", "r") as data:
    DBSTR = json.load(data)["DBSTR"]

def is_duplicate(prof_data, catalog):
    """
    Helper method to check if two courses are duplicate.
    """
    dup = False

    #iterate through catalog
    for course in catalog:

        #ensure that courses are not duplicates
        if prof_data["professor"] == course["professor"] and prof_data["course_name"] == course["course_name"] and prof_data["section"] == course["section"] and prof_data["semester"] == course["semester"]:
            dup = True

    return dup

def get_current_time():
    """
    Helper method to return current time as string.
    """
    return str(datetime.datetime.now())

def get_location_info(ip_addr):
    """
    Helper method to get location info based on ip.
    """
    loc_url = f'http://ip-api.com/json/{ip_addr}'
    try:
        response = requests.get(loc_url)
        return eval(response.text)
    except:
        return {}


def save_course_data(catalog_data, num_to_show):
    """
    Helper method for /gep and /dept route to save
    data into dictionaries with correct formatting.
    """

    # restrict number of courses to return to 10
    if num_to_show > HARD_MAX:

        # set number of courses to the hard max
        num_to_show = HARD_MAX

    #access MongoDb database
    crowdsourced = MongoClient(DBSTR)
    grades_db = crowdsourced.Coursesnc

    catalog = []
    catalog_full = []
    #iterate through catalog data
    for rec in catalog_data:
        #print(rec)
        catalog_full.append(rec)
        for i in range(len(rec["section"])):
        #print(rec)
        #save relevant data for first section
            prof_data = grades_db.catalogncsu.find_one(
                {"course_name": rec["_id"]["course_name"],
                "professor": rec["_id"]["professor"],
                "semester": rec["_id"]["semester"],
                "section": rec["section"][i]}
            )
            try: 
                if (prof_data["seats_open"] > 0 or prof_data["seats_status"] == "Waitlisted" or prof_data["seats_status"] == "Reserved"):
                    
                    #set duplicate to false
                    dup = is_duplicate(prof_data, catalog)
                    if not dup and len(catalog) < num_to_show:
                        catalog.append(prof_data)
                    break
                else:
                    continue
            except: continue

    #print(catalog)
    if len(catalog) < num_to_show:
        for rec in catalog_full:
            for sec in range(len(rec["section"])):
                prof_data =  grades_db.catalogncsu.find_one(
                    {
                        "course_name": rec["_id"]["course_name"],
                        "professor": rec["_id"]["professor"],
                        "semester": rec["_id"]["semester"],
                        "section": rec["section"][sec]
                    }
                )
                try:
                    #set duplicate to false
                    dup = is_duplicate(prof_data, catalog)
                    #if course is not duplicate and should be added, add it
                    if not dup and len(catalog)<num_to_show:
                        catalog.append(prof_data) 
                except:
                    continue

    relevant_data = []
    problem_sessions = []
    lectures = []
    
    #iterate through top 5
    for record in catalog:

        #prepare course using helper method
        course_data = prepare_course(record)

        #print(record['course_type'])
        if record['course_type'] == 'Lecture':
            lectures.append(course_data)
        else:
            problem_sessions.append(course_data)
    
    #print(problem_sessions)
    # sort such that lectures are above problem sessions
    if len (problem_sessions) > 0:
        problem_sessions = sorted(problem_sessions, key=lambda k: k['Rating'], reverse=True)
    lectures = sorted(lectures, key=lambda k: k['Rating'], reverse=True)

    # add problem sessiosn to lectures
    if len(lectures) > 0:
        lectures.extend(problem_sessions)
        relevant_data = lectures.copy()
    else:
        # if no lectures, show prob sessions
        relevant_data = problem_sessions.copy()

    # once rating is 0, change to no rating
    for item in relevant_data:
        if item['Rating'] == 0:
            item['Rating'] = 'No Rating'
    
    # removed all duplicates - python one-liner
    return relevant_data


@app.route("/getdepts")
def getDeptList():
    """
    This function returns the list of all departments at NCSU
    that we have data for.
    """
    DEPTS = ['INB - Interdepartmental Graduate Biology', 'FIM - Financial Mathematics', 'MT - Medical Textiles', 'IP - Interdisciplinary Perspectives', 'HS - Horticulture Science', 'CRD - Communication Rhetoric & Digital Media', 'EOE - Occupational Education', 'HUMU - Humanities and U.S. Diversity', 'DAN - Dance', 'NR - Natural Resources', 'EA - Environmental Assessment', 'NSGK - Natural Sciences and Global Knowledge', 'CNR - College of Natural Resources', 'ES - Environmental Science', 'FLF - Foreign Language - French', 'ARE - Agricultural and Resource Economics', 'ISE - Industrial and Systems Engineering', 'PEF - Physical Education - Fitness', 'NS - Naval Science', 'PS - Political Science', 'PE - Physical Education', 'REL - Religious Studies', 'FLR - Foreign Language - Russian', 'D - Design', 'DS - Design Studies', 'HUM - Humanities', 'MIE - Management Innovation Entrepreneurship', 'MA - Mathematics', 'AES - Agricultural and Environmental Systems', 'FB - Forest Biomaterials', 'PES - Physical Education - Sports', 'PSY - Psychology', 'SLC - Shelton Leadership Course', 'MS - Military Science', 'TMS - Textile Materials Science', 'BCH - Biochemistry', 'EMS - Math & Science Education', 'SVM - Specialized Veterinary Medicine', 'TTM - Textile Technology Management', 'ADN - Art and Design', 'ECE - Electrical and Computer Engineering', 'HESE - Health Exercise Studies Emergency Medicine', 'NSE - National Student Exchange placeholder courses', 'ECI - Curriculum and Instruction', 'PY - Physics', 'AVS - Arts Village', 'USC - University Studies Course', 'USP - University Scholars Program', 'CS - Crop Science', 'ENG - English', 'IEP - _IEP Intensive English Program', 'VPUS - Visual and Performing Arts and U.S. Div', 'STS - Science, Technology and Society', 'FLA - Foreign Language - Arabic', 'PHI - Philosophy', 'HES - Health and Exercise Studies', 'ENV - Environmental First Year', 'AEC - Applied Ecology', 'SW - Social Work', 'IMS - Integrated Manufacturing Sys', 'GPH - Global Public Health', 'ELM - Elementary Education', 'BMA - Biomathematics', 'FLC - Foreign Language - Chinese', 'EDP - Educational Psychology', 'SSUS - Social Sciences and U.S. Diversity', 'MDS - Multidisciplinary Studies', 'TC - Textile Chemistry', 'LSC - Life Sciences First Year', 'COP - Cooperative Education', 'HON - Honors', 'IPGE - Interdisciplinary Perspectives', 'FLI - Foreign Language - Italian', 'PO - Poultry Science', 'ECD - Counselor Education', 'IS - International Studies', 'MAA - Math in Agriculture and Related Sciences', 'FLG - Foreign Language - German', 'EC - Economics', 'MES - Mechanical Engineering Systems', 'ID - Industrial Design', 'ANT - Anthropology', 'PER - Foreign Language - Persian', 'PSE - Paper Science Engineering', 'VMP - Veterinary Science - VMP', 'JDP - Joint Degree Program placeholder courses', 'ACC - Accounting', 'LAR - Landscape Architecture', 'AEE - Agricultural and Extension Education', 'SSGK - Social Sciences and Global Knowledge', 'NSGE - Natural Sciences', 'DDN - Design courses for Graduate Students', 'FYD - Familiy Life and Youth Development', 'PEO - Physical Education - Other', 'T - Textiles', 'MBA - Business Administration', 'SMT - Sustainable Materials and Technology', 'AGI - Agricultural Institute', 'GES - Genetic Engineering and Society', 'LAT - Foreign Language - Latin', 'BUS - Business Management', 'PEH - Physical Education - Health', 'BAE - Biological and Agricultural Engineering', 'FS - Food Science', 'BMME - Biomedical Engineering', 'EAC - Adult & Higher Education', 'HESR - Health Exercise Studies Racquet', 'GSP - Goodnight Scholars Program', 'BIO - Biological Sciences', 'CE - Civil Engineering', 'ARC - Architecture', 'FPS - Fiber and Polymer Science', 'AS - Aerospace Studies', 'E - Engineering', 'MLS - Liberal Studies', 'CLA - Foreign Language-Classical Studies', 'NE - Nuclear Engineering', 'MEA - Marine, Earth, and Atmospheric Sciences', 'TT - Textile Technology', "EGR - EGR-Engineering Master's", 'MB - Microbiology', 'IPUS - Interdisciplinary Perspectives and U.S. Diversity', 'FOR - Forestry', 'PRK - Park Scholars', 'GTI - NC Global Training Initiative', 'HSS - Humanites and Social Sciences', 'HUMG - Humanities and Global Knowledge', 'PAMS - Physical & Mathematical Sciences', 'GEO - Geography', 'THE - Theatre', 'WRT - Professional Writing', 'ELP - Educ Leadership & Program Eval', 'HEST - Health Exercise Studies Team', 'JEM - Joint Engineering Mechatronics', 'HI - History', 'PMS - Physical & Mathematical Sci', 'SOC - Sociology', 'MAE - Mechanical & Aerospace Engr', 'HA - History of Art', 'FLE - Foreign Language - English', 'GR - Graduate Special Categories', 'GC - Graphic Communications', 'HESF - Health Exercise Studies Fitness', 'FTD - Fashion and Textile Design', 'CHE - Chemical Engineering', 'VPH - Veterinary Public Health', 'ECG - Graduate Economics', 'ET - Environmental Technology', 'LPS - Leadership in the Public Sector', 'EMA - Entrepreneurship in Music and the Arts', 'MUS - Music', "WGS - Women's and Gender Studies", 'MIS - International Studies', 'PEC - Physical Education - Coaching', 'BSC - Biological Sciences', 'TE - Textile Engineering', 'USD - U.S. Diversity', 'WPS - Wood and Paper Science', 'FTM - Fashion and Textile Management', 'PP - Plant Pathology', 'FW - Fisheries & Wildlife Sciences', 'FL - Foreign Languages', 'IDS - Interdisciplinary Studies', 'MSE - Materials Science and Engineering', 'VPGE - Visual and Performing Arts', 'CH - Chemistry', 'TED - Technology Education', 'HESM - Health and Exercise Studies Minor', 'ED - Education', 'TDE - Technology Engineering and Design Education', 'CBS - Comparative Biological Science', 'SSC - Soil Science', 'CSSC - Crop and Soil Sciences', 'ENT - Entomology', 'BME - Biomedical Engineering', 'GRK - Foreign Language - Greek', 'OR - Operations Research', 'TOX - Toxicology', 'PB - Plant Biology', 'FSA - Food Science', 'CSC - Computer Science', 'BIT - Biotechnology', 'II - Inter-Institutional', 'EI - Entrepreneurship Initiative', 'BAET - Biological and Agricultural Engineering Technology', 'GN - Genetics', 'PRT - Parks, Recreation, and Tourism Management', 'YFCS - Youth, Family, and Community Science', 'ZO - Zoology', 'VMB - Veterinary Science - VMB', 'HESA - HESA - Health Exercise Aquatics', 'FM - Feed Mill', 'ECO - Ecology', 'NTR - Nutrition', 'FLJ - Foreign Language - Japanese', 'FLN - Foreign Language - Hindi', 'FLP - Foreign Language - Portuguese', 'M - Management', 'PCC - Polymer and Color Chemistry', 'GD - Graphic Design', 'PA - Public Administration', 'AFS - Africana Studies', 'IPGK - Interdisciplinary Perspectives and Global Knowledg', 'ST - Statistics', 'ARS - Arts Studies', 'HESD - Health Exercise Studies Dance', 'VMC - Veterinary Medicine-Companion Animal & Sp Species', 'LOG - Logic', 'PHY - Physiology', 'AA - Advanced Analytics', 'ANS - Animal Science', 'NW - Nonwovens', 'COS - College of Sciences', 'GIS - Geographic Information Systems', 'NPS - Nonprofit Studies', 'COM - Communication', 'ALS - Agriculture and Life Sciences', 'BEC - Biomanufacturing Training Education Center', 'HESO - Health Exercise Studies Outdoor', 'SAO - Study Abroad Office', 'FCS - Family and Consumer Sciences', 'IMM - Immunology', 'FLS - Foreign Language - Spanish', 'HESS - Health Exercise Studies Specialty', 'BBS - Bioprocessing']
    DEPTS = sorted(DEPTS)
    DEPT_CODE = [i.split("-")[0].strip() for i in DEPTS]
    depts_dict = {"dept":DEPTS, "dept_code":DEPT_CODE}
    #{"depts":DEPTS, "dept_code":DEPT_CODE}]

    return depts_dict

@app.route("/gep")
@limiter.limit("50/hour")
def gepRoute():
    """
    This function receives a call from the GEP component of 
    the ReactJS and returns a JSON of the top 5 courses from the 
    database based on the metrics calculated.
    """
    
    #access MongoDb database
    crowdsourced = MongoClient(DBSTR)
    grades_db = crowdsourced.Coursesnc

    #get which GEP was requested
    gep_requested = request.headers.get("GEP")
    term_requested = request.headers.get("term")
    num_to_show = int(request.headers.get("num_courses"))
    ip_addr = request.access_route[0]
    loc_info = get_location_info(ip_addr)

    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    try:
        os_info = user_agent.split(')')[0].split('(')[1].strip()
    except:
        os_info = "Unknown"
    # write calls to analytics
    analytics_to_add = {
        "type_of_call": "GEP",
        "gep_requested": gep_requested,
        "term_requested": term_requested,
        "num_courses": num_to_show,
        "timestamp": get_current_time(),
        "os_info": os_info,
        "ip_address": ip_addr,
        "location": loc_info
    }

    # check that analytics is clean
    if not validate_analytics_auth(analytics_to_add):
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

    # add analytics to db
    grades_db.analytics_user_data.insert_one(analytics_to_add)

    course_types = ['Lecture']
    if gep_requested == "HES":
        course_types.append("Problem Session")
    course_type_s = '|'.join(course_types)
    #if additional breadth, either hum or ss
    if gep_requested == "ADDTL":
        #print("ADDLT")
        geps_req = ["HUM", "SS"]
        geps_regex = '|'.join(geps_req)
    else:
        geps_req = [gep_requested]
        geps_regex = "|".join(geps_req)

    #access  collection with the correct data
    catalog_data = grades_db.catalogncsu.aggregate([
        {
            "$match" : {
                "gep" :{"$regex": geps_regex},
                "course_type": {"$regex": course_type_s}, 
                "semester": {"$regex": term_requested},
                "professor": { "$ne": "Staff"}
            }
        },
        #group by professor and add unique sections and raw_official_scores 
        #to aggregation
        {
            "$group": {
                "_id": {
                    "course_name": "$course_name",
                    "professor": "$professor",
                    "semester": "$semester"
                },
                "section": {
                    "$addToSet": "$section"
                },
                "raw_official_score": {
                    "$addToSet": "$raw_official_score"
                }
            }
        },
        {
            "$unwind": "$raw_official_score"
        },
        {
            "$sort": {"raw_official_score":-1}
        },
        {
            "$limit": NUM_COURSES
        }
    ])
        
    relevant_data = save_course_data(catalog_data, num_to_show)
    return relevant_data
    

@app.route("/dept")
@limiter.limit("100/day;50/hour")
def deptRoute():
    """
    This function receives a call from the Dept component of 
    the ReactJS and returns a JSON of the top 5 courses from the 
    database based on the metrics calculated.
    It takes into account the level, department, and term that 
    the course is offered in.
    """
    # set valid coures types
    VALID_COURSE_TYPES = ["Lecture", "Problem Session"]

    #access MongoDb database
    crowdsourced = MongoClient(DBSTR)
    grades_db = crowdsourced.Coursesnc

    #get which GEP was requested
    #print(request.headers)
    dept_requested = request.headers.get("Dept")
    term_requested = request.headers.get("term")
    level_min = request.headers.get("level_min")
    level_max = request.headers.get("level_max")
    num_to_show = int(request.headers.get("num_courses"))
    ip_addr = request.access_route[0]
    loc_info = get_location_info(ip_addr)
    
    # get user agent
    user_agent = str(request.headers.get("User-Agent"))
    try:
        os_info = user_agent.split(')')[0].split('(')[1].strip()
    except:
        os_info = "Unknown"

    # write calls to analytics
    analytics_to_add = {
        "type_of_call": "Dept",
        "dept_requested": dept_requested,
        "term_requested": term_requested,
        "level_min": level_min,
        "level_max": level_max,
        "num_courses": num_to_show,
        "timestamp": get_current_time(),
        "os_info": os_info,
        "ip_address": ip_addr,
        "location": loc_info
    }

    # check that analytics is clean
    if not validate_analytics_auth(analytics_to_add):
        return json.dumps({"success":False}), 400, {"ContentType":"application/json"}

    # add analytics to db
    grades_db.analytics_user_data.insert_one(analytics_to_add)
    
    
    if (not str.isnumeric(level_min) and level_min!="ANY") or (not str.isnumeric(level_max) and level_max!="ANY") :
        return ["NotNumeric"]

    if (level_min!="ANY" and level_max!="ANY"):
        level_l = [int(level_min), int(level_max)]
        if level_l[1] < level_l[0]:
            return ["Min>Max"]
        if len([i for i in level_l if i<100 or i>899 and i!="ANY"])>0: 
            return ["NotNumeric"]

    # check if health
    if "HES" in dept_requested:
        course_types = ["Lecture", "Problem Session"]

    # temporary fix, still need to figure out which depts
    # should not show problem sessions
    elif 'ACC' in dept_requested:
        course_types = ["Lecture"]
    else:
        course_types = VALID_COURSE_TYPES

    course_type_search = '|'.join(course_types)

    # convert level min and max to valid
    if level_min == 'ANY':
        level_min = 100
    if level_max == 'ANY':
        level_max = 899

    level_min = int(level_min)
    level_max = int(level_max)

    #access  collection with the correct data
    catalog_data = grades_db.catalogncsu.aggregate([
        {
            "$match" : {
                "department" : dept_requested,
                "course_number": {
                    "$gte": level_min,
                    "$lte": level_max
                },
                "course_type": {"$regex": course_type_search}, 
                "semester": {"$regex": term_requested},
                "professor": { "$ne": "Staff"}
            }
        },
        #group by professor and add unique sections and raw_official_scores 
        #to aggregation
        {
            "$group": {
                "_id": {
                    "course_name": "$course_name",
                    "professor": "$professor",
                    "semester": "$semester"
                },
                "section": {
                    "$addToSet": "$section"
                },
                "raw_official_score": {
                    "$addToSet": "$raw_official_score"
                }
            }
        },
        {
            "$unwind": "$raw_official_score"
        },
        {
            "$sort": {"raw_official_score":-1}
        },
        {
            "$limit": NUM_COURSES
        }
    ])
            
    #save data to dictionary
    relevant_data = save_course_data(catalog_data, num_to_show)
     
    #del catalog_data["_id"]
    if len(relevant_data) == 0:
        return []
    return relevant_data
