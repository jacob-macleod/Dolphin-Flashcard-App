""" Provides main server logic """
from flask import Flask
from routes.web.web_routes import web_routes
from routes.api.authentication import authentication_routes
from routes.api.statistics import statistics_routes
from routes.api.card_management import card_management_routes
from routes.api.goals import update_goal_stats

app = Flask(__name__, template_folder='../templates')

app.register_blueprint(web_routes)
app.register_blueprint(authentication_routes)
app.register_blueprint(statistics_routes)
app.register_blueprint(card_management_routes)

update_goal_stats("uNQGiHzw1vODhLrm5CEkZCVhMOw1", "10")

if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
