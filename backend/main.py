""" Provides main server logic """

import os
from flask import Flask, send_from_directory, url_for
from flask_cors import CORS
from routes.api.authentication import authentication_routes
from routes.api.statistics import statistics_routes
from routes.api.card_management import card_management_routes
from routes.api.goals import goal_routes

print("Starting")

app = Flask(__name__, template_folder="../templates", static_folder="../frontend/build")
CORS(app)
app.register_blueprint(authentication_routes)
app.register_blueprint(statistics_routes)
app.register_blueprint(card_management_routes)
app.register_blueprint(goal_routes)
server_addr = ("0.0.0.0", 5000)


# Serve the React frontend from the frontend/build folder
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    """Serve the static react build folder

    Args:
        path (str): The path to the front end build folder

    Returns:
        file: The file to render
    """
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(port=server_addr[1], host=server_addr[0], threaded=True, use_reloader=True)
