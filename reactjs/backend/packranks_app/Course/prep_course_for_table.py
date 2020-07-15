
GRADIENT = False

def prepare_course(record):
    """
    This helper method prepares the specified course with data from the 
    catalog database in order to be rendered in the PackRanks
    table.
    """

    #json to return
    course_data = {}
    relevant_keys = [
        "course_name",
        "professor",
        "section",
        "semester",
        "prereq_string",
        "location",
        "course_dates",
        "ratemyprof_link",
        "transformed_rating"
    ]

    new_key_features = [
        "location_url",
        "course_title",
        "credit_hours",
        "description",
        "course_link"
    ]
    #assign values
    course_data = {}
    DIGITS = 3
    p = 10**DIGITS
    
    #print(record)
    no_rating_msg = 0
    MAX_RATING = 100

    try:
        transformed_rating = float(record["transformed_official_score"])
        if transformed_rating != float(0):

            if transformed_rating > MAX_RATING:
                transformed_rating = MAX_RATING
            
            course_data["Rating"] = round(transformed_rating)
            
        else:
            try:
                transformed_rating = round(float(record["transformed_rating"]))
                course_data["Rating"] = transformed_rating
            except:
                course_data["Rating"] = no_rating_msg
            
    except:
        try:
            transformed_rating = round(float(record["transformed_rating"]))
            course_data["Rating"] = transformed_rating
        except:
            course_data["Rating"] = no_rating_msg

    course_data["Name"] = record[new_key_features[1]]
    #create course with tooltip info
    try:
        course_data["Catalog Link"] = [
            record[relevant_keys[0]],
            record[new_key_features[4]]
        ]
    except:
        course_data["Catalog Link"] = [
            record[relevant_keys[0]],
            None
        ]
    
    """course_data["Course"]["code"] = record[relevant_keys[0]]
    course_data["Course"]["course_title"] = record[new_key_features[1]]
    course_data["Course"]["credit_hours"] = record[new_key_features[2]]
    course_data["Course"]["descr"] = record[new_key_features[3]]
    """
    #course_data["Credit Hours"] = record[new_key_features[2]]
    
    try:
        ratemyprof_link = record[relevant_keys[-2]]
    except:
        ratemyprof_link = "None"
        
    if ratemyprof_link == "None" or ratemyprof_link == "":
        ratemyprof_link == "None"
        course_data["RateMyProfessor Link"] = [record[relevant_keys[1]],ratemyprof_link]
    else:
        try:
            overall_quality = record["overall_quality"]
            overall_difficulty=record["overall_difficulty"]
            course_data["RateMyProfessor Link"] = [record[relevant_keys[1]],ratemyprof_link,overall_quality,overall_difficulty]
        except:
            try:
                overall_quality = round(record["quality_avg"],1)
                overall_difficulty = round(record["difficulty_avg"],1)
                course_data["RateMyProfessor Link"] = [record[relevant_keys[1]], ratemyprof_link,overall_quality,overall_difficulty]
            except:
                course_data["RateMyProfessor Link"] = [record[relevant_keys[1]],ratemyprof_link]


    #course_data["RateMyProfessor Link"] = [record[relevant_keys[1]],ratemyprof_link]
    
    course_data["Section"] = record[relevant_keys[2]]
    course_data["Prerequisites"] = record[relevant_keys[4]]
    #course_data["RateMyProfessor Link"] = record[relevant_keys[-2]]
    tba_msg = "To Be Announced"

    #append location url if available
    try:
        loc = record[relevant_keys[5]]

        if len(loc) > 0:
            course_data["Location"] = [
                record[relevant_keys[5]],
                record[new_key_features[0]]
            ]
        else:
            course_data["Location"] = [tba_msg, "None"]
    #else put URL as
    except:
        loc = record[relevant_keys[5]]

        if len(loc) > 0:
            course_data["Location"] = [
                record[relevant_keys[5]],
                "None"
            ]
        else:
            course_data["Location"] = [tba_msg, "None"]

    #try:
    #    course_data["Course Dates"] = record[relevant_keys[6]]
    #except:
    #    course_data["Course Dates"] = "Unknown"
    open_seats = str(record["seats_open"])
    total_seats = str(record["seats_total"])
    waitlist = str(record["seats_waitlisted"])
    
    if record["seats_status"] == "Open":
        course_data["Seats"] = f"Open: {open_seats}/{total_seats}"
    elif record["seats_status"] == "Waitlisted":
        course_data["Seats"] = f"Waitlisted: {waitlist}"
    elif record["seats_status"] == "Reserved": 
        course_data["Seats"] = f"Reserved: {open_seats}/{total_seats}"
    else:
        course_data["Seats"] = "Closed"

    course_data["Times"] = record["meeting_time"]
    
    # comment out semester column
    course_data["Semester"] = record[relevant_keys[3]]


    # show course type
    course_data["Course Type"] = record["course_type"]

    #other_notes = record["other_notes"]
    #course_data["Notes"] = "None"
    #for note in other_notes:
    #    if "paired with" in note:
    #        course_data["Notes"] = note
    #        break

    return course_data