from packranks_app.Course.generate_rating import gen_rating

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

    course_data["Rating"] = gen_rating(record["course_name"].split(" ")[0], record.get("grades"))

    '''
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
    '''

    # try to get user upvotes
    try:
        user_upvotes = record['user_upvotes']
        course_data['Rating'] = [course_data['Rating'],user_upvotes]
    except:
        """
        Add code here that returns original upvotes as 0
        """
        pass


    course_data["Name"] = record[new_key_features[1]]
    course_string = record[relevant_keys[0]] + " - " + record[relevant_keys[2]]
    #create course with tooltip info
    try:
        course_data["Catalog Link"] = [
            course_string,
            record[new_key_features[4]]
        ]
        if 'vailable' in course_data['Catalog Link'][1]:
            course_data['Catalog Link'][1] = None
    except:
        course_data["Catalog Link"] = [
            course_string,
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

    if 'Staff' in course_data["RateMyProfessor Link"][0]:
        course_data["RateMyProfessor Link"][0] = 'Staff'

    #course_data["RateMyProfessor Link"] = [record[relevant_keys[1]],ratemyprof_link]

    course_data["Section"] = record[relevant_keys[2]]

    if 'Also listed' in record[relevant_keys[4]]:
        course_data["Prerequisites"] = record[relevant_keys[4]].split('Section')[0].strip()
    else:
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

    if record["seats_status"].lower() == "open":
        course_data["Seats"] = f"Open: {open_seats}/{total_seats}"
    elif record["seats_status"].lower() == "waitlisted":
        course_data["Seats"] = f"Waitlisted: {waitlist}"
    elif record["seats_status"].lower() == "reserved":
        course_data["Seats"] = f"Reserved: {open_seats}/{total_seats}"
    else:
        course_data["Seats"] = "Closed"

    try:
        course_data['Times'] = record['meeting_days'] + " " + record['meeting_time']
    except:
        course_data["Times"] = record["meeting_time"]
    
    course_data['Times'] = course_data['Times'].replace('<br/>', '')

    # comment out semester column
    course_data["Semester"] = record[relevant_keys[3]]


    # show course type
    course_data["Course Type"] = record["course_type"]

    # add double counting for GEPs
    #print(record)
    course_data['Counts For'] = ""
    try:
        geps_valid = record['gep'].split(" ")
        for gep in geps_valid:

            gep_abbrv = gep.strip('[').strip(']').strip("'") + ", "
            course_data['Counts For'] += gep_abbrv

        # remove trailing comma
        course_data['Counts For'] = course_data['Counts For'][:-2]
    except:
        pass
    # check if course data counts for is empty
    if len(course_data['Counts For']) < 1:
        course_data['Counts For'] = 'None'

    
    """
    Combining columns to appear more compact next to grades
    """
    """
    course_data["Logistics"] = [course_data["Location"], 
                                course_data["Seats"], 
                                course_data["Times"],
                                course_data["Course Type"],
                                course_data["Counts For"]]
    del course_data["Location"]
    del course_data["Seats"]
    del course_data["Times"]
    del course_data["Course Type"]
    del course_data["Counts For"]

    course_data["Basic Info"] = [course_data["Rating"],
                                        course_data["Name"]]
    
    del course_data["Rating"]
    del course_data["Name"]
    """

    #other_notes = record["other_notes"]
    #course_data["Notes"] = "None"
    #for note in other_notes:
    #    if "paired with" in note:
    #        course_data["Notes"] = note
    #        break
    
    grades = {
        "A": "#228B22",
        "B": "#FFE4B5",
        "C": "#6A2135",
        "D": "#ff9966",
        "F": "#ff6600",
        "S": "#99ccff",
        "U": "#cc9900"
    }
    
    """
    wrong logic, cant use grade pct
    need to sum up only the grades i need and manually compute pct
    """

    data = [["Grade", "Frequency"]]
    for grade in grades.keys():
        
        if record.get("grades") and type(record.get("grades").get(grade)) == int:
            #if int(record["grades"][grade]) > 0:
                data.append([grade, int(record["grades"][grade])])
                """
                    "title": grade,
                    "value": int(record["grades_pct"][grade]),
                    "pct": str(int(record["grades_pct"][grade])) + "%",
                    "color": grades[grade]    
                """
                """
                [["Grade", "Frequency"],
                ["A", 50],
                ["B", 20],
                ["C", 0],
                ["D", 10],
                ["F", 0]]

                A B D

                A B C D F
                """

    # add grade data to semester
    course_data["Grade Data"] = data
    print(course_data["Grade Data"])

    # add grade data to rating
    #course_data["Rating"] = [course_data["Rating"], course_data["Grade Data"]]
    

    return course_data
