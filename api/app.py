from crypt import methods
from genericpath import exists
import time
from datetime import date
from flask import Flask
from flask import request
from flask import jsonify
import json
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from sqlalchemy import func
import os
from OCR_handler import OCRHandler
from OCR_Layout_analysis import ItemsIdentifier
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from tables import *
from classificador.Classificador import classify

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
    print({'info' : ids.priorKnowladge_layoutAnalysis() , 'result_ocr': res} , flush=True)
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
    res = do_ocr(path)
    print(res, flush=True)
    helper_file('image has been saved on:', os.getcwd() ,'uploaded/' + str(int(time.time())) + '.jpg')
    #infer_img(pix, str(int(time.time())))
    # return jsonify(**res)
    return jsonify({'id':[{'Item':'Beef','Price':30, 'Quantity':2}, {'Item':'Pesto Tofu Pasta', 'Price':15, 'Quantity':1}, {'Item':'gril tequil lim chick fajita', 'Price':10, 'Quantity':3}]})

@app.route('/classifier', methods = ['GET'])
def classifier():
    ticket_items = [{'Item':'Beef','Price':30, 'Quantity':2}, {'Item':'Pesto Tofu Pasta', 'Price':15, 'Quantity':1}, {'Item':'gril tequil lim chick fajita', 'Price':10, 'Quantity':3}]
    type = classify(ticket_items)
    print(type, flush=True)
    return ({'type':type})

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


@app.route('/profile', methods=['GET'])
def get_profile():
    #Necessitem una variable amb el nom d'usuari de la persona
    print(request, flush = True)
    data = request.args.to_dict()
    print(data, flush = True)

    user =  UserTable.query.filter_by(email = data['email']).first()
    print(user, flush = True)
    if user != None:
        print('email', user.email, flush = True)
    return {'Nickname': user.nickname, 'Name': user.name, 'email': user.email, 'Total_spend' :user.money}

@app.route('/friends', methods =['GET'])
def get_friends():
    print(request, flush=True)
    data = request.args.to_dict()
    bd =  UserTable.query.filter_by(email = data['email']).first()
    friends = Friends.query.filter((Friends.nick_name_u1 == bd.nickname) | (Friends.nick_name_u2 == bd.nickname)).all()
    friend_list = list()
    if len(friends) > 0:
        for f in friends:
            if f.nick_name_u1 == bd.nickname:
                friend_list.append(f.nick_name_u2)
            else:
                friend_list.append(f.nick_name_u1)
        return {"Friends": friend_list}
    else:
        return {"Friends": ["No friends"]}

@app.route('/groups', methods =['GET'])
def get_groups():
    data = request.args.to_dict()
    bd =  UserTable.query.filter_by(email = data['email']).first()
    group = db.session.query(Groups).join(Group_User, Groups.group_id==Group_User.group_id).filter(Group_User.nickname == bd.nickname).all()
    group_list = list()

    if len(group) > 0:
        for g in group:
            group_list.append(g.title)
        return {"Groups": group_list}
    else:
        return {"Groups": ["No groups"]}

@app.route('/addfriend', methods =['POST'])
def add_friend():
    data = request.get_json()
    exists = db.session.query(UserTable).filter_by(nickname=data['nickname']).first()
    if exists == None:
        return {"Added": "Nickname doesn't exist"}

    f_id = db.session.query(func.max(Friends.friendship_id)).scalar()
    data_add = {'friendship_id':int(f_id)+1, 'nick_name_u1':data['nickname'], 'nick_name_u2':data['your_nickname'], 'date':date.today()}
    new_friendship = Friends(**data_add)
    print(new_friendship, flush=True)
    print(data_add, flush=True)
    db.session.add(new_friendship)
    db.session.commit()
    return {"Added":'True'}

@app.route('/addgroup', methods =['POST'])
def add_group():
    data = request.get_json()
    if data['title'] == [] or len(data['listfriends']) == 0:
        return {"Added:" "Wrong inputs"}
    bd =  UserTable.query.filter_by(email = data['email']).first()
    nickname = bd.nickname
    exists = db.session.query(Groups).filter_by(title=data['title']).first()
    if exists != None:
        return {"Added": "Title is used, try another name"}
    group_id = db.session.query(func.max(Groups.group_id)).scalar()
    groupuser_id = db.session.query(func.max(Group_User.groupuser_id)).scalar()
    print(nickname ,'nickname')
    print('group_id', group_id)
    new_group = {'group_id': int(group_id)+1, 'title':data['title'],'spend':data['spend'], 'n_users':len(data['listfriends'])+1, 'creation':date.today()}
    print(new_group)
    new_group_created = Groups(**new_group)
    db.session.add(new_group_created)
    db.session.commit()
    new_groupuser_me = {'groupuser_id': groupuser_id+1, 'group_id': group_id+1, 'nickname':nickname, 'creation_date':date.today()}
    new_groupuser_created_me = Group_User(**new_groupuser_me)
    db.session.add(new_groupuser_created_me)
    db.session.commit()
    for i in range(len(data['listfriends'])):
        new_groupuser = {'groupuser_id': groupuser_id+i+2, 'group_id': group_id+1, 'nickname': data['listfriends'][i], 'creation_date':date.today()}
        new_groupuser_created = Group_User(**new_groupuser)
        db.session.add(new_groupuser_created)
        db.session.commit()
    return {'Group_added': 'True'}

import pandas as pd
engine = create_engine('postgresql+psycopg2://postgres:FDP@SplitItDB:5432/postgres')
@app.route('/statistics', methods=['GET'])
def user_analysis():
    try:
        data = request.args.to_dict()
        print(data, flush=True)
        print(data['email'], flush=True)
        user =  UserTable.query.filter_by(email = data['email']).first()
        group = Group_User.query.filter_by(nickname = user.nickname).all()

        group_list =[]
        for g in group:
            group_list.append(g.group_id)

        types = list()
        prices = list()
        for t, p in db.session.query(Ticket, Product).filter(Ticket.ticket_id==Product.ticket_id, Ticket.group_id.in_(tuple(group_list))):
            types.append(t.type)
            prices.append(p.price)
        analysis = pd.DataFrame({'type': types, 'price': prices})
        visit = analysis['type'].value_counts()
        visit = [{'type':key, 'value':value} for key,value in zip(visit.index, visit)]
        spent = analysis.groupby('type')['price'].sum()
        spent = [{'type':key, 'value':value} for key,value in zip(spent.index, spent)]

        userid = int(user.nickname.replace('U', ''))
        #recommendations = recommender(user.nickname)
        recommendations = pd.read_sql_query(f"select * from recommendations where nickname='{userid}'", engine)
        recommendations = recommendations.sort_values(['estimation'],ascending=False)[:5]


        return {'Visit': visit, 'Spent':spent, 'Recommendations_restaurant':recommendations['place'].tolist(), "Recommendations_type": recommendations['type'].tolist()}
    except:
        return {'Visit': "Not enought data"}


if __name__ == '__main__':

    if Groups.query.count() == 0:
        exec(open('mock_data/create_mock_data.py').read()) # posem dades a la bd

    app.run(debug=True,host='0.0.0.0', port = 5000)