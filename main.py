from flask import Flask, render_template, request, send_from_directory   
from flask_cors import CORS
from time import sleep

app = Flask(__name__)
CORS(app)

# NO CACHE
@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/xml', methods=['GET'])
def xml():
    sleep(1)
    param = request.args.get('dish')
    return send_from_directory(directory="static/xml/recipes/", filename='{}.xml'.format(param), mimetype='text/xml')
