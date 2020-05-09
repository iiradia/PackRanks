from flask import Flask, render_template, request
app = Flask(__name__)


@app.route('/')
def hello():
    """
    Renders initial template.
    """

    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

"""@app.route("/select", methods=["GET", "POST"])
def gep_home():
    
    Executes when go button is pressed from the homepage.
    Checks if gep or department was selected, and renders
    the appropriate html file.
    
    #print (request.is_json)
    #print(request.data)
    #print(eval(request.data.decode("utf-8"))['gepordept'])
    if request.json['gepordept'] == "/gep":
        return render_template("gep.html")
    else:
        return render_template("dept.html")"""

if __name__ == '__main__':
    app.run()