import re

def validate_analytics_auth(analytics_auth):
    """
    Given some analytics with appropriate keys
    and information for authentication, validate it
    """
    for key,val in analytics_auth.items():
        if key == 'email':
            if not is_clean_email(val):
                return False
        elif key == "location":
            for k,v in val.items():
                if not is_clean_query(v):
                    return False
        else:
            if not is_clean_query(val):
                return False
    
    return True

def is_clean_query(query):
    """
    Given a specific query to MongoDB, return True
    if it is clean (not using any MongoDB) operators
    and return False otherwise. This will customize
    it such that it cannot be exploited via noSQL injection.
    """
    query = str(query)

    # set of valid characters to include in inputs and queries
    valid_chars = [";", ".", "-", ",", "(", ")", " ", ":", "/"]

    # iterate through char, ensure it is valid
    for char in query:

        # return False if char is not clean
        if (not re.search("\w", char)) and char not in valid_chars:
            return False

    return True
    
def is_clean_email(email):
    """
    Given a specific email to MongoDB, return True
    if it is clean (not using any MongoDB) operators
    and return False otherwise. 
    """
    MAX_EMAIL_LENGTH = 64
    email = str(email)
    at_index = email.index('@')

    # ensure that email is within proepr length 
    if len(email[:at_index]) > MAX_EMAIL_LENGTH:
        return False
        
    # iterate through each char, ensure it is clean
    for char in email:

        # return false if char is not clean
        if (not re.search("\w", char)) and char != '.' and char !='@':
            return False

    return True