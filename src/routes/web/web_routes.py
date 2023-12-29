from flask import render_template, Blueprint
from database.database import database as db
web_routes = Blueprint('web_routes', __name__)

@web_routes.route("/")
def main():
    """ Main page """
    return render_template("index.html")

@web_routes.route("/data")
def data() :
    """ A test to see if the server can connect with firebase """
    return db.get("/")

@web_routes.route("/sign-in")
def sign_in_web() :
    """ Load the sign in page for web """
    return render_template("login.html")
