from flask import Flask, render_template
app = Flask(__name__, template_folder='../templates')

@app.route("/")
def main():
    """ Main page """
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
