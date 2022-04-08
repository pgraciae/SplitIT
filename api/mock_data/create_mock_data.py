import pandas as pd
import random
import numpy as np
import string
import datetime
from sqlalchemy import create_engine

def UserTable(n = 50, nicknames_path = "BD/Data/nicknames.csv", worldcities_path = "BD/Data/worldcities.csv"):

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

    df = pd.read_csv(nicknames_path)
    df_adress = pd.read_csv(worldcities_path)

    phone_generator = lambda t: '6' + ''.join([str(random.randint(0,10)) for x in range(8)])
    email_generator = lambda name: name+'@splitit.net'
    address_generator = lambda x: df_adress.sample()['city'].item()
    birth_generator = lambda x: str(random.randint(1,28)) + '/' + str(random.randint(1,12)) + '/' +  str(random.randint(1990, 2015))
    gender_generator = lambda x: 'male' if np.random.rand() > 0.5 else 'female'
    registration_generator = lambda x: datetime.datetime.now().strftime("%d/%m/%Y")

    for element in range(n):

        usr = df.sample()

        while usr['nickname'].item() in users_['nickname']:
            usr = df.sample()

        users_['name'].append(usr['name'].item())
        users_['nickname'].append(usr['nickname'].item() + str(random.randint(0,1000)))
        users_['phone'].append(phone_generator(element))
        users_['email'].append(email_generator(users_['nickname'][-1]))
        users_['password'].append(users_['name'][-1]) #hash?
        users_['address'].append(address_generator(element))
        users_['birth'].append(birth_generator(element))
        users_['gender'].append(gender_generator(element))
        users_['registration'].append(registration_generator(element))
        users_['money'].append(0)

    return pd.DataFrame(users_)

def group_user(users, groups = 10, users_per_group = 5):
    gu = {
        'groupuser_id': [],
        'group_id': [],
        'nickname': [],
        'creation_date': []
    }
    ids = range(int(10e6))
    #creeem n grups amb k usuaris
    for n in range(groups):
        regist = str(random.randint(1,28)) + '/' + str(random.randint(1,12)) + '/' +  str(random.randint(2021, 2022))
        used = []
        id_g = random.sample(ids, 1)[0]
        while id_g in gu['group_id']:
            id_g = random.sample(ids, 1)[0]
        
        for k in range(users_per_group):

            us = users.sample()['nickname'].item()
            while us in used: #controlem que user no estigui al grup ja
                us = users.sample()['nickname'].item()
            
            id = random.sample(ids, 1)[0]
            while id in gu['groupuser_id']:
                id = random.sample(ids, 1)[0]

            gu['groupuser_id'].append(id)
            gu['group_id'].append(id_g)
            gu['nickname'].append(us)
            gu['creation_date'].append(regist)
            used.append(us)

    
    return pd.DataFrame(gu)

def groups(group_user):
    groups = {
        'group_id': [],
        'title':[],
        'spend':[],
        'n_users': [],
        'creation' : []
    }  
    grp = group_user.groupby('group_id', as_index = False).count() #agrupem per group
    letters = string.ascii_lowercase
    groups['group_id'] = list(grp['group_id']) 
    groups['n_users'] = list(grp['nickname'])
    groups['creation'] = list(group_user.groupby('group_id', as_index = False).first()['creation_date']) #valor date per group

    for n in range(len(grp)):
        groups['title'].append(''.join(random.choice(letters) for i in range(5)))
        groups['spend'].append(random.random()*100)
    return pd.DataFrame(groups)

def friends(users, items = 30):
    friend = {
        'friendship_id' : [],
        'nick_name_u1': [],
        'nick_name_u2': [],
        'date': [],
    }
    ids = range(int(10e6))
    for n in range(items):
        us1 = users.sample()['nickname'].item()
        us2 = users.sample()['nickname'].item()
        while us1 == us2:
            us2 = users.sample()['nickname'].item()

        id = random.sample(ids, 1)[0]
        while id in friend['friendship_id']:
            id = random.sample(ids, 1)[0]
        friend['friendship_id'].append(id)
        friend['nick_name_u1'].append(us1)
        friend['nick_name_u2'].append(us2)
        friend['date'].append(datetime.datetime.now().strftime("%d/%m/%Y"))

    return pd.DataFrame(friend)


def ticket(groups, items=50, cities_path = 'BD/Data/worldcities.csv'):

    df_adress = pd.read_csv(cities_path)
    ids = range(int(10e6))
    ticket = {
        'ticket_id' : [],
        'group_id' : [],
        'status' : [],
        'date' : [],
        'place' : []
    }

    for n in range(items):
        g = groups.sample()
        id = random.sample(ids, 1)[0]
        while id in ticket['ticket_id']:
            id = random.sample(ids, 1)[0]
        ticket['ticket_id'].append(id)
        ticket['group_id'].append(g['group_id'].item())
        ticket['status'].append('unpayed' if random.random() < 0.5 else 'payed')
        ticket['date'].append(str(random.randint(1,28)) + '/' + str(random.randint(1,12)) + '/' +  str(random.randint(1990, 2015)))
        ticket['place'].append(df_adress.sample()['city'].item())
    return pd.DataFrame(ticket)



def subticket(ticket, group_user, items = 50):

    ids = range(int(10e6))
    subtickets = {
        'subticket_id'  : [],
        'ticket_id': [],
        'nickname_user'  : [],
        'payment_id'  : [],
        'date' : [],
        'total' : [],
        'status' : []
    }

    for n in range(items):
        tick = ticket.sample()
        g_u = group_user[group_user['group_id'] == tick['group_id'].item()].sample() #relaciono el ticket amb el membre del grup al que se li assigna

        id = random.sample(ids, 1)[0]
        while id in subtickets['subticket_id']:
            id = random.sample(ids, 1)[0]
        subtickets['subticket_id'].append(id)
        subtickets['ticket_id'].append(tick['ticket_id'].item())
        subtickets['nickname_user'].append(g_u['nickname'].item())
        subtickets['payment_id'].append(random.sample(ids, 1)[0])
        subtickets['date'].append(str(random.randint(1,28)) + '/' + str(random.randint(1,12)) + '/' +  str(random.randint(1990, 2015)))
        subtickets['total'].append(100)
        subtickets['status'].append('unpayed' if random.random() < 0.5 else 'payed')

    return pd.DataFrame(subtickets)


def payment_method(subticket):
    ids = range(int(10e6))

    payment_method = {
        'payment_id' : [],
        'paypal_id' :[],
        'date' : [],
        'bank' : []
    }

    payment_method['payment_id'] = list(subticket['payment_id'])
    payment_method['date'] = list(subticket['date'])
    for n in range(len(subticket)):
        payment_method['paypal_id'].append(random.sample(ids, 1)[0])
        payment_method['bank'].append(random.choice(['Sabadell', 'La Caixa', 'BBVA', 'Bankia']))
    return pd.DataFrame(payment_method)


def product(ticket, group_user, groceries_path = 'BD/Data/Groceries.csv', items = 50):
    groceries = pd.read_csv(groceries_path)
    ids = range(int(10e6))
    product = {
        'product_id': [],
        'ticket_id': [],
        'paid_by' : [],
        'item' : [],
        'price' : []
    }

    for n in range(items):
        tick = ticket.sample()
        g_u = group_user[group_user['group_id'] == tick['group_id'].item()]

        for el in range(5): #5 elements per cada ticket 

            id = random.sample(ids, 1)[0]
            while id in product['product_id']:
                id = random.sample(ids, 1)[0]

            product['product_id'].append(id)
            product['ticket_id'].append(tick['ticket_id'].item())
            product['paid_by'].append(g_u.sample()['nickname'].item()) #diferents pagadors d'elements en un mateix ticket
            product['item'].append(groceries.sample()['item'].item())
            product['price'].append(random.random() * 10)

    return pd.DataFrame(product)



def products_prop(subtick, product, items = 50):

    products_prop = {
        'products_prop_id' : [], 
        'product_id' : [],
        'subticket_id' : [],
        'proportion' : []
    }   
    
    ids = range(int(10e6))

    for n in range(items):
        sub = subtick.sample()
        prods = product[product['ticket_id'] == sub['ticket_id'].item()] #products del ticket seleccionat
        for el in range(5): #poso 5 elements en cada subticket
            prod = prods.sample()
            products_prop['subticket_id'].append(sub['subticket_id'].item())
            products_prop['product_id'].append(prod['product_id'].item())
            products_prop['proportion'].append(random.random())

            id = random.sample(ids, 1)[0]
            while id in products_prop['products_prop_id']:
                id = random.sample(ids, 1)[0]

            products_prop['products_prop_id'].append(id)

    return pd.DataFrame(products_prop)


users = UserTable(100, nicknames_path = "mock_data/Data/nicknames.csv", worldcities_path = "mock_data/Data/worldcities.csv")
g_u = group_user(users, groups = 20, users_per_group=10)
Groups = groups(g_u)
Friends = friends(users, 25)
Tickets = ticket(Groups, 50 , cities_path = 'mock_data/Data/worldcities.csv')
Subtickets = subticket(Tickets, g_u, 200)
p_m = payment_method(Subtickets)
Product = product(Tickets, g_u, items = 500 , groceries_path = 'mock_data/Data/Groceries.csv')
P_P = products_prop(Subtickets, Product, 1000)


if __name__ == '__main__':

    engine = create_engine('postgresql+psycopg2://postgres:FDP@SplitItDB:5432/postgres')
    
    users.to_sql('usertable', con = engine, index = False, if_exists = 'append')
    Groups.to_sql('groups', con = engine, index = False, if_exists = 'append')
    g_u.to_sql('group_user', con = engine, index = False, if_exists = 'append')    
    Tickets.to_sql('ticket', con = engine, index = False, if_exists = 'append')
    Subtickets.to_sql('subticket', con = engine, index = False, if_exists = 'append')
    p_m.to_sql('payment_method', con = engine, index = False, if_exists = 'append')
    Product.to_sql('product', con = engine, index = False, if_exists = 'append')
    P_P.to_sql('products_prop', con = engine, index = False, if_exists = 'append')
    Friends.to_sql('friends', con = engine, index = False, if_exists = 'append')
