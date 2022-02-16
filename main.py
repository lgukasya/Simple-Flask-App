import imp
from flask import Flask, render_template, request, send_file   
from flask_cors import CORS
from time import sleep

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/xml', methods=['GET'])
def xml():
    sleep(2)
    param = request.args.get('dish')

    return send_file(
        path_or_file='static/xml/recipes/{}.xml'.format(param), 
        mimetype='text/xml'
    )



    

