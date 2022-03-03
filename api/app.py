import time
from flask import Flask
from flask import request
from flask import jsonify
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import os
from OCR_handler import OCRHandler
from OCR_Layout_analysis import ItemsIdentifier
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from tables import *


app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:FDP@SplitItDB:5432/postgres'

db = SQLAlchemy(app)
db.Model.metadata.reflect(db.engine)



if 'test_file.txt' not in os.listdir():
    with open('test_file.txt', 'w') as hdlr:
        hdlr.write("Test: /")
        #print(os.getcwd(), flush=True)

model = OCRHandler()

def do_ocr(img_path):
    global model
    res = (model.doOcr(img_path))
    ids = ItemsIdentifier(res)
    #print({'info' : ids.priorKnowladge_layoutAnalysis() , 'result_ocr': res} , flush=True)
    return {'info' : ids.priorKnowladge_layoutAnalysis() , 'result_ocr': res} 


def helper_file(*messgae):
    with open('test_file.txt', 'a') as hdlr:
        messsgaes = "\n".join(messgae)
        [hdlr.write(message) for message in messsgaes]

@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})


@app.route('/upload', methods = ['POST'])
def upload():
    image=request.files['file']
    pil_image = Image.open(image)
    pix = np.array(pil_image)
    path = 'uploaded/' + str(int(time.time())) + '.jpg'
    plt.imsave(path, pix)
    res = model.doOcr(path)
    print(res, flush=True)
    helper_file('image has been saved on:', os.getcwd() ,'uploaded/' + str(int(time.time())) + '.jpg')
    #infer_img(pix, str(int(time.time())))
    return jsonify({'1':None})


@app.route('/login', methods=['GET'])
def login():
    
    data = request.args.to_dict()

    bd =  UserTable.query.filter_by(email = data['nickname']).first()
    
    if bd != None:
        print('email', bd.email)
        print('psswd', bd.password)
    else:   
        print('query result is none')

    if bd != None:
        print({"bd":bd})
        if bd.password == data['password']:
            print({'message': 'Logging in'}, flush=True)
            return {'message': 'Logging in'}
        
        else:
            print({'error': 'Password incorrect'}, flush=True )
            return {'error': 'Password incorrect'}
        
    else:
        print({'error': 'User not registered, redirecting to register page'}, flush=True)
        #return {'error': 'User not registered, redirecting to register page'}
        print({'bd':bd}, flush=True)
        return {'error': bd}

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    print('Register data:' , data, flush = True)

    new_user = UserTable(**data)
    db.session.add(new_user)
    db.session.commit()
    print( {'message': f'User {data["nickname"]} has been created successfully'}, flush=True)
    return {'message': "Registered"}



if __name__ == '__main__':
        app.run(debug=True,host='0.0.0.0', port = 5000)