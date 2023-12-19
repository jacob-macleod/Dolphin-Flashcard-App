""" Provides main server logic """
from flask import Flask, render_template, jsonify, request
from database.database import Database
import json
app = Flask(__name__, template_folder='../templates')
db = Database()

@app.route("/")
def main():
    """ Main page """
    return render_template("index.html")

@app.route("/data")
def data() :
    """ A test to see if the server can connect with firebase """
    return db.get("/")

@app.route("/api/create-account", methods=["POST"])
def create_account():
    """ Create an account for the user """
    try:
        db.create_user(request.json.get("username"), request.json.get("password"))
        return jsonify({"success": True}, 200)
    except Exception as e:
        return jsonify({"error": str(e)}, 500)

if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
