import pandas as pd
import random
import time
import numpy as np
import string

def user_table(n = 10):
    users_ = {
        'nickname': [],
        'phone':[],
        'email':[],
        'password': [],
        'name':[],
        'money': [],
        'address': [],
        'birth': [],
        'gender': [],
        'registration': [],
    }
    df = pd.read_csv("/SplitIT/DDBB/Data/nicknames.csv")
    df_adress = pd.read_csv("/SplitIT/DDBB/Data/worldcities.csv")
    users,nicknames = df[' name'],df[' nickname']
    users_generator = lambda x: users[x]
    nicknames_generator = lambda x: nicknames[x]
    phone_generator = lambda t: '6' + ''.join([str(random.randint(0,10)) for x in range(8)])
    email_generator = lambda name: name+'@splitit.net'
    address_generator = lambda x: df_adress['city'].iloc[random.randint(0,df_adress.shape[0])]
    birth_generator = lambda x: str(random.randint(1,31)) + '/' + str(random.randint(1,12)) + '/' +  str(random.randint(1990, 2015))
    gender_generator = lambda x: 'male' if np.random.rand() > 0.5 else 'female'
    regiistration_generator = lambda x: dt.now()
    for element in range(n):
        users_['name'].append(users_generator(element))
        users_['nickname'].append(nicknames_generator(element))
        users_['phone'].append(phone_generator(element))
        users_['email'].append(email_generator(users_['nickname'][-1]))
        users_['password'].append(hash(users_['name'][-1]))
        users_['address'].append(address_generator(element))
        users_['birth'].append(birth_generator(element))
        users_['gender'].append(gender_generator(element))
        users_['registration'].append(regiistration_generator(element))
        users_['money'].append(0)
    return pd.DataFrame(users_)

def Groups(items = 10):
    groups = {
        'group_id': [],
        'title':[],
        'spend':[],
        'n_users': [],
        'date' : []
    }  
    ids = range(100000)
    letters = string.ascii_lowercase
    for n in range(items):
        groups['group_id'].append(random.sample(ids, 1)[0]) 
        groups['title'].append(''.join(random.choice(letters) for i in range(5)))
        groups['spend'].append(random.random()*100)
        groups['n_users'].append(random.randint(0,6))
        groups['date'].append(str(random.randint(0,32)) + '/' + str(random.randint(0,12)) + '/' +  str(random.randint(2021, 2022)))

    return pd.DataFrame(groups)

dfs = user_table(n=20)
dfs.to_csv("/home/ferran/Escritorio/TFG/SplitIT/DDBB/output/prova.csv", index=False)


