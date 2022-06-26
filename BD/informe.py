from logging import raiseExceptions
import re
from psycopg2 import connect
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import datetime 
from dateutil.relativedelta import relativedelta


conn = connect(
    dbname = "postgres",
    user = "postgres",
    host = 'localhost',
    port= '5432',
    password = 'FDP'
)

cursor = conn.cursor()

def restaurant_analysis(name_restaurant, start, stop):

    cursor.execute(f"SELECT * FROM ticket where place = '{name_restaurant}' and date between '{start}' and '{stop}'")
    column_names = [desc[0] for desc in cursor.description]
    restaurant_tiquets = pd.DataFrame(cursor, columns=column_names)
    list_tiquets = restaurant_tiquets['ticket_id'].unique().tolist()
    cursor.execute(f"SELECT * FROM product where ticket_id in {tuple(list_tiquets)}") #where ticket_id in {tuple(list_tiquets)}
    column_names = [desc[0] for desc in cursor.description]
    products_restaurant = pd.DataFrame(cursor, columns=column_names)
    groups_totals = len(restaurant_tiquets)
    repetits = restaurant_tiquets.groupby('group_id')['group_id'].count()
    repetits = repetits[repetits > 1]
    print("Mean rating: ", products_restaurant['rating'].mean())
    print("Mean food_rating: ", products_restaurant['food_rating'].mean())
    print("Mean service_rating: ", products_restaurant['service_rating'].mean())
    print("5 most requested dishes: ", products_restaurant['item'].value_counts().sort_values()[-5:])
    print("\n")
    print("5 least ordered dishes: ", products_restaurant['item'].value_counts().sort_values()[:5])
    print("\n")
    print("Total number of groups that visited the restaurant: ", groups_totals)
    print("Number of groups that have repeated: ", repetits)
    
    plt.title("5 most requested dishes")
    plt.bar(products_restaurant['item'].value_counts().sort_values()[-5:].index, products_restaurant['item'].value_counts().sort_values()[-5:].values)
    plt.ylabel("Times requested")
    plt.xlabel("Dish")
    plt.xticks(rotation=45, multialignment='center')
    plt.savefig('output/5_most_ordered.png')
    plt.close()

    plt.title("5 least requested dishes")
    plt.bar(products_restaurant['item'].value_counts().sort_values()[:5].index, products_restaurant['item'].value_counts().sort_values()[:5].values)
    plt.ylabel("Times requested")
    plt.xlabel("Dish")
    plt.xticks(rotation=45)
    plt.savefig('output/5_least_ordered.png')
    plt.close()
    
    plt.title("Number of grups that have repeated")
    plt.bar(repetits.index, repetits.values)
    plt.ylabel("Times repeated")
    plt.xlabel("Group id")
    plt.xticks(rotation=45)
    plt.savefig('output/number_repeated.png')
    plt.close()

if __name__ == '__main__':
    stop = datetime.date.today()
    stop = datetime.date(stop.year, stop.month, 1)
    start = stop + relativedelta(months=-1)

    restaurant_analysis('Gorditas Dona Tota', start, stop)