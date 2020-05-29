#imports
from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
from __main__ import app
import json
import pandas as pd
from math import log10
import re
from prep_course_for_table import prepare_course

DBSTR = ""
with open("email_data.json", "r") as data:
    DBSTR = json.load(data)["DBSTR"]

def save_course_data(catalog_data):
    """
    Helper method for /gep and /dept route to save
    data into dictionaries with correct formatting.
    """
    #access MongoDb database
    crowdsourced = MongoClient(DBSTR)
    grades_db = crowdsourced.Coursesnc

    catalog = []
    catalog_full = []
    #iterate through catalog data
    for rec in catalog_data:
        print(rec)
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
            if prof_data["seats_open"] > 0:
                catalog.append(prof_data)
                break
            else:
                continue

    #print(catalog)
    if len(catalog) < 5:
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
                #print(prof_data)
                if prof_data not in catalog and len(catalog)<5:
                    print(f"Adding")
                    catalog.append(prof_data) 

    relevant_data = []
    
    #iterate through top 5
    for record in catalog:
        
        #prepare course using helper method
        course_data = prepare_course(record)
        
        relevant_data.append(course_data)
    
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

    #if additional breadth, either hum or ss
    if gep_requested == "ADDTL":
        print("ADDLT")
        geps_req = ["HUM", "SS"]
    print(gep_requested)
    #access  collection with the correct data
    if gep_requested != "HES" and gep_requested != "ADDTL":
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "gep" :{"$regex": gep_requested},
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])
        
        relevant_data = save_course_data(catalog_data)
        return relevant_data
    elif gep_requested == "ADDTL":
        #print("Searching addtl")
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "gep" : {"$in": ["['HUM']", "['SS']"]},
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])
        relevant_data = save_course_data(catalog_data)
        return relevant_data

    else:
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "gep" : {"$regex": gep_requested},
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                {
                    "$sort": {"rating": -1}
                },
                {
                    "$limit": 5
                }
        ])
        
        relevant_data = save_course_data(catalog_data)
        return relevant_data

    #print("Saving")
    #for i in catalog_data:
    #    print(f"Found {i}")
    #save data to dictionary
    relevant_data = save_course_data(catalog_data)
    print(relevant_data)
    #del catalog_data["_id"]
    return relevant_data



@app.route("/dept")
def deptRoute():
    """
    This function receives a call from the Dept component of 
    the ReactJS and returns a JSON of the top 5 courses from the 
    database based on the metrics calculated.
    It takes into account the level, department, and term that 
    the course is offered in.
    """
    #access MongoDb database
    crowdsourced = MongoClient(DBSTR)
    grades_db = crowdsourced.Coursesnc

    #get which GEP was requested
    #print(request.headers)
    dept_requested = request.headers.get("Dept")
    term_requested = request.headers.get("term")
    level_min = request.headers.get("level_min")
    level_max = request.headers.get("level_max")
    if level_max < level_min and str.isnumeric(level_max) and str.isnumeric(level_min):
        return ["Invalid"]

    #access  collection with the correct data
    if level_min != "ANY" and level_max != "ANY":
        level_min = int(level_min)
        level_max = int(level_max)
        print(level_min, level_max)
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "department" : dept_requested,
                        "course_number": {
                            "$gte": level_min,
                            "$lte": level_max
                        },
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])
    elif level_min == "ANY" and level_max != "ANY":
        level_max = int(level_max)
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "department" : dept_requested,
                        "course_number": {
                            "$lte": level_max
                        },
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])
        

    elif level_max == "ANY" and level_min != "ANY":
        level_min = int(level_min)
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "department" : dept_requested,
                        "course_number": {
                            "$gte": level_min
                        },
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                {
                    "$sort": {"rating":-1}
                },

                {
                    "$limit": 5
                }
        ])
    else:
        catalog_data = grades_db.catalogncsu.aggregate([
                #match dept as needed
                {
                    "$match" : {
                        "department" : dept_requested,
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested}
                    }
                },
                #group by professor and add unique sections and ratings 
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
                        "rating": {
                            "$addToSet": "$rating"
                        }
                    }
                },
                {
                    "$unwind": "$rating"
                },
                #sort by ratings for each professor/course
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])
            
    #save data to dictionary
    relevant_data = save_course_data(catalog_data)
     
    #del catalog_data["_id"]
    if len(relevant_data) == 0:
        return []
    return relevant_data
