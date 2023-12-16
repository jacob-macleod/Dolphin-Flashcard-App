""" Provides main server logic """
from flask import Flask, render_template
from database.database import Database
app = Flask(__name__, template_folder='../templates')
db = Database()

@app.route("/")
def main():
    """ Main page """
    return render_template("index.html")

@app.route("/data")
def data() :
    return db.get("/")

if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
