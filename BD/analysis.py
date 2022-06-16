from logging import raiseExceptions
from psycopg2 import connect
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

conn = connect(
    dbname = "postgres",
    user = "postgres",
    host = 'localhost',
    port= '5432',
    password = 'FDP'
)

cursor = conn.cursor()


def user_analysis(nickname):
    try:
        cursor.execute(f"SELECT * from usertable where nickname='{nickname}';")
        column_names = [desc[0] for desc in cursor.description]
        data = pd.DataFrame(cursor, columns=column_names)
        cursor.execute(f"SELECT * FROM group_user where nickname='{nickname}'")
        column_names = [desc[0] for desc in cursor.description]
        group_user = pd.DataFrame(cursor, columns=column_names)
        cursor.execute(f"SELECT * FROM ticket where group_id in {tuple(group_user['group_id'])}")
        column_names = [desc[0] for desc in cursor.description]
        tickets = pd.DataFrame(cursor, columns=column_names)
        tickets_list = ''
        if len(tickets['ticket_id']) > 1:
            tickets_list = tuple(tickets['ticket_id'])
            cursor.execute(f"SELECT * FROM product where ticket_id in {tickets_list}")
        else:
            tickets_list = tickets['ticket_id'][0]
            cursor.execute(f"SELECT * FROM product where ticket_id in ({tickets_list})")
        
        column_names = [desc[0] for desc in cursor.description]
        products = pd.DataFrame(cursor, columns=column_names)
        m_prod_ticket = pd.merge(products, tickets, on=['ticket_id'])
        print(m_prod_ticket)
        plots(m_prod_ticket)
    except:
        print("Not enought data")

def plots(m_prod_ticket):
    #plot visited
    labl = m_prod_ticket['type'].value_counts().index
    m_explode = np.where(m_prod_ticket['type'].value_counts()==max(m_prod_ticket['type'].value_counts()))[0]    
    expl = np.zeros(len(m_prod_ticket['type'].value_counts()))
    expl[m_explode] = 0.1
    print(m_prod_ticket['type'].value_counts())
    plt.pie(m_prod_ticket['type'].value_counts(), labels=labl, autopct='%1.1f%%', explode=expl, shadow=True, startangle=90)
    plt.title("Restaurant type visited")
    plt.axis('equal')
    
    plt.savefig('output/visited_distribution.png')
    plt.close()

    #plot spend
    labl = m_prod_ticket.groupby('type')['price'].sum().index
    m_explode = np.where(m_prod_ticket.groupby('type')['price'].sum()==max(m_prod_ticket.groupby('type')['price'].sum()))
    expl = np.zeros(len(m_prod_ticket.groupby('type')['price'].sum()))
    expl[m_explode] = 0.1
    print(m_prod_ticket.groupby('type')['price'].sum())
    plt.pie(m_prod_ticket.groupby('type')['price'].sum(), labels=labl, autopct='%1.1f%%', explode=expl, shadow=True, startangle=90)
    plt.title("Restaurant type spend")
    plt.axis('equal')

    plt.savefig('output/spend_distribution.png')
    plt.close()

if __name__ == '__main__':

    user_analysis('U1001')

    cursor.close()
    conn.close()
