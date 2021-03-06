
def gen_rating(dept, grades_data):
    """
    Method to generate PackRanks rating (without considering RMP).
    """
    
    no_rating_msg = 0

    if grades_data == None or not grades_data.get('TOTAL'):
        return no_rating_msg
        
    #assign weights to each grade
    S_WEIGHT = (2.67 + 2.0) / 2
    weights = {
        "A": 4.0,
        "B": 3.0,
        "C": 2.0,
        "D": 1.0 ,
        "F": 0.0,
        "S": S_WEIGHT,
        "U": 0.0,
        "W": 0.0,
    }

    try:
        del grades_data["AU"]
        del grades_data["LA"]
        del grades_data["NR"]
        del grades_data["IN"]
    except KeyError: pass

    #check if health is the department and assign weights
    if "HES" in dept:

        weights["B"] = 4.0
        weights["C"] = 4.0
        weights["S"] = 4.0
        weights["U"] = 0.0
    
    #metric
    grade_metric = 0

    #iterate through grades
    for grade in grades_data:
        
        if grade != "TOTAL":
            #adjust grade metric as necessary
            grade_metric += grades_data[grade] * weights[grade]
    
    #divide by total
    grade_metric /= grades_data["TOTAL"]

    grade_metric *= 25

    return round(grade_metric)
