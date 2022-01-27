import pandas as pd
import random
import time
import numpy as np
from datetime import datetime as dt
def gen_random_users(n = 10):
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
    df = pd.read_csv("/home/ferran/Escritorio/TFG/SplitIT/DDBB/Data/nicknames.csv")
    df_adress = pd.read_csv("/home/ferran/Escritorio/TFG/SplitIT/DDBB/Data/worldcities.csv")
    print(df.columns)
    df = df.drop_duplicates(subset=[' nickname']).reset_index()
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
dfs = gen_random_users(n=20)
dfs.to_csv("/home/ferran/Escritorio/TFG/SplitIT/DDBB/output/prova.csv", index=False)


