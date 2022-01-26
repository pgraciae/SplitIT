import pandas as pd
import random

def ticket(items=10):

    df_adress = pd.read_csv("worldcities.csv")
    ids = range(10000000)
    ticket = {
        'ticketid' : [],
        'groupid' : [],
        'status' : [],
        'date' : [],
        'place' : []
    }

    for n in range(items):
        ticket['ticketid'].append(random.sample(ids, 1)[0])
        ticket['groupid'].append(random.sample(ids,1)[0])
        ticket['status'].append('unpayed' if random.random() < 0.5 else 'payed')
        ticket['date'].append(str(random.randint(0,32)) + '/' + str(random.randint(0,12)) + '/' +  str(random.randint(1990, 2015)))
        ticket['place'].append(df_adress['city'].iloc[random.randint(0,df_adress.shape[0])])
    return pd.DataFrame(ticket)

def subticket(items = 10):
    users = pd.read_csv('users.csv')
    ids = range(100000)
    subtickets = {
        'subticket_id'  : [],
        'nickname_user'  : [],
        'payment_id_ref'  : [],
        'date' : [],
        'total' : [],
        'status' : []
    }
    for n in range(items):
        ticket['subticket_id'].append(random.sample(ids, 1)[0])
        ticket['nickname_user'].append(random.sample(list(users['nickname']), 1))
        ticket['payment_id_ref'].append(random.sample(ids, 1)[0])
        ticket['date'].append(str(random.randint(0,32)) + '/' + str(random.randint(0,12)) + '/' +  str(random.randint(1990, 2015)))
        ticket['status'].append('unpayed' if random.random() < 0.5 else 'payed')
    return pd.DataFrame(ticket)

if name == 'main':
    ticket(10).to_csv('tickets.csv', index = False, header = False)
    subticket(10).to_csv('subtickets.csv', index = False, header = False)