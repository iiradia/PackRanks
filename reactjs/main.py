from flask_api import FlaskAPI
from flask import request
from pymongo import MongoClient
from flask_cors import CORS
app = FlaskAPI(__name__)
CORS(app)
from pymongo import MongoClient
import pandas as pd

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
    crowdsourced = MongoClient("mongodb+srv://dbUser:dbpass@crowdsourced-ogexe.mongodb.net/test")
    grades_db = crowdsourced.Coursesnc

    #get which GEP was requested
    gep_requested = request.headers.get("GEP")
    term_requested = request.headers.get("term")

    #if additional breadth, either hum or ss
    if gep_requested == "ADDTL":
        geps_req = ["HUM", "SS"]

    #access  collection with the correct data
    if gep_requested != "HES":
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "gep" :{"$regex": gep_requested},
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested},
                        "seats_open": {"$gt":0}
                    }
                },
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])
    else:
        print(f".{term_requested}.")
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "gep" : {"$regex": gep_requested},
                        "semester": {"$regex": term_requested},
                        "seats_open": {"$gt":0}
                    }
                },
                {
                    "$sort": {"rating": -1}
                },
                {
                    "$limit": 5
                }
        ])

    #json to return
    relevant_data = []
    course_data = {}
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

    #iterate through top 5
    for record in catalog_data:
        #assign values
        course_data = {}

        course_data["Semester"] = record[relevant_keys[3]]
        course_data["Course"] = record[relevant_keys[0]]
        course_data["Professor"] = record[relevant_keys[1]]
        course_data["Section"] = record[relevant_keys[2]]
        course_data["Prerequisites"] = record[relevant_keys[4]]
        course_data["RateMyProfessor Link"] = record[relevant_keys[-1]]
        course_data["Location"] = record[relevant_keys[5]]
        course_data["Course Dates"] = record[relevant_keys[6]]   
        open_seats = str(record["seats_open"])
        total_seats = str(record["seats_total"])
        course_data["seats"] = f"{open_seats}/{total_seats}"

        relevant_data.append(course_data)
        
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
    crowdsourced = MongoClient("mongodb+srv://dbUser:dbpass@crowdsourced-ogexe.mongodb.net/test")
    grades_db = crowdsourced.Coursesnc

    #get which GEP was requested
    print(request.headers)
    dept_requested = request.headers.get("Dept")
    term_requested = request.headers.get("term")
    level_requested = request.headers.get("level")
    if level_requested != "ANY":
        level_requested = int(level_requested)
        level_less_than = level_requested + 100

    #access  collection with the correct data
    if level_requested != "ANY":
        catalog_data = grades_db.catalogncsu.aggregate([
                {
                    "$match" : {
                        "department" : dept_requested,
                        "course_number": {
                            "$gte": level_requested,
                            "$lte": level_less_than
                        },
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested},
                        "seats_open": {"$gt":0}
                    }
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
                {
                    "$match" : {
                        "department" : dept_requested,
                        "course_type": "Lecture", 
                        "semester": {"$regex": term_requested},
                        "seats_open": {"$gt":0}
                    }
                },
                {
                    "$sort": {"rating":-1}
                },
                {
                    "$limit": 5
                }
        ])

    #json to return
    relevant_data = []
    course_data = {}
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
    len_catalog = 0
    #iterate through top 5
    for record in catalog_data:
        #assign values
        course_data = {}

        course_data["Semester"] = record[relevant_keys[3]]
        course_data["Course"] = record[relevant_keys[0]]
        course_data["Professor"] = record[relevant_keys[1]]
        course_data["Section"] = record[relevant_keys[2]]
        course_data["Prerequisites"] = record[relevant_keys[4]]
        course_data["RateMyProfessor Link"] = record[relevant_keys[-1]]
        course_data["Location"] = record[relevant_keys[5]]
        course_data["Course Dates"] = record[relevant_keys[6]]   
        open_seats = str(record["seats_open"])
        total_seats = str(record["seats_total"])
        course_data["seats"] = f"{open_seats}/{total_seats}"

        relevant_data.append(course_data)
        len_catalog += 1
        
    print(relevant_data)
    print(len_catalog)
    #del catalog_data["_id"]
    if len_catalog == 0:
        return []
    return relevant_data


if __name__ == "__main__":
    app.run()