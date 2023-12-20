""" Provides main server logic """
from flask import Flask
from routes.web_routes import web_routes
from routes.api_routes import api_routes
app = Flask(__name__, template_folder='../templates')

app.register_blueprint(web_routes)
app.register_blueprint(api_routes)

if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
