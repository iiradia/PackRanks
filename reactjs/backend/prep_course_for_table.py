
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
    transformed_rating = record[relevant_keys[-1]]

    #course_data["Rating"] = round(transformed_rating, 3)
    course_data["Rating"] = round(transformed_rating)
    
    course_data["Name"] = record[new_key_features[1]]
    #create course with tooltip info
    try:
        course_data["Course"] = [
            record[relevant_keys[0]],
            record[new_key_features[4]]
        ]
    except:
        course_data["Course"] = [
            record[relevant_keys[0]],
            None
        ]
    
    """course_data["Course"]["code"] = record[relevant_keys[0]]
    course_data["Course"]["course_title"] = record[new_key_features[1]]
    course_data["Course"]["credit_hours"] = record[new_key_features[2]]
    course_data["Course"]["descr"] = record[new_key_features[3]]
    """
    #course_data["Credit Hours"] = record[new_key_features[2]]

    course_data["Professor"] = [record[relevant_keys[1]], record[relevant_keys[-2]]]
    course_data["Section"] = record[relevant_keys[2]]
    course_data["Prerequisites"] = record[relevant_keys[4]]
    #course_data["RateMyProfessor Link"] = record[relevant_keys[-2]]
    
    #append location url if available
    try:
        course_data["Location"] = [
            record[relevant_keys[5]],
            record[new_key_features[0]]
        ]
    #else put URL as
    except:
        course_data["Location"] = [
            record[relevant_keys[5]],
            "None"
        ]

    #try:
    #    course_data["Course Dates"] = record[relevant_keys[6]]
    #except:
    #    course_data["Course Dates"] = "Unknown"
    open_seats = str(record["seats_open"])
    total_seats = str(record["seats_total"])
    course_data["seats open"] = f"{open_seats}/{total_seats}"

    course_data["Semester"] = record[relevant_keys[3]]

    return course_data