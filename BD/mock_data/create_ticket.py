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
    users = pd.read_csv('../Data/users.csv')
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

def payment_method(items = 10):
    subticket = pd.read_csv('subtickets.csv')
    ids = range(100000)

    payment_method = {
        'payment_id' : [],
        'nick_name_f' : [],
        'paypal_id' :[],
        'date' : [],
        'bank' : []
    }
    payment_method['payment_id'] = list(subticket['payment_id_ref'])
    payment_method['nick_name_f'] = list(subticket['nickname_user'])
    payment_method['date'] = list(subticket['date'])
    for n in range(items):
        payment_method['paypal_id'].append(random.sample(ids, 1)[0])
        payment_method['bank'].append(['Sabadell', 'La Caixa', 'BBVA', 'Bankia'][random.randint(0,4)])
    return pd.DataFrame(payment_method)


def products_prop(items = 40):
    subtickets = pd.read_csv('subtickets.csv')
    ids = range(100000)

    products_prop = {
        'product_id' : [],
        'subticket_id' : [],
        'nick_user_id' :[],
        'proportion' : []
    }   

    for n in range(items):
        sub = subtickets.sample()
        products_prop['product_id'].append(random.sample(ids, 1)[0])
        products_prop['subticket_id'].append(sub['subticket_id'])
        products_prop['nick_user_id'].append(sub['nick_user_id'])
        products_prop['proportion'].append(random.random()*10)
    return pd.DataFrame(products_prop)

def product(items = 40):
    prop = pd.read_csv('products_prop.csv')
    groceries = pd.read_csv('Groceries.csv')
    product = {
        'product_id': [],
        'item' : [],
        'price' : []
    }
    product['product_id'] = list(prop['product_id'])
    product['item'] = [groceries.sample()['item'] for n in range(len(product['product_id']))]
    product['price'] = [random.random() * 10 for n in range(len(product['product_id']))]
    return pd.DataFrame(product)


if __name__ == '__main__':
    ticket(10).to_csv('tickets.csv', index = False, header = False)
    subticket(10).to_csv('subtickets.csv', index = False, header = False)