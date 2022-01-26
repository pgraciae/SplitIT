import psycopg2
import pandas as pd

def insert_table(table, file_name):
    
    conn = None

    conn = psycopg2.connect(
        host="localhost",
        database="TEST",
        user="ferran",
        password="root")

    cur = conn.cursor()

    # df = pd.read_csv("/home/ferran/Escritorio/TFG/SplitIT/DDBB/output/" + file_name)
    
    
    # for f in range(len(df)):
        # print(f"INSERT INTO {table} ({','.join([x for x in list(df.columns)])}) VALUES({','.join([str(x) for x in list(df.iloc[f])])});")
        # cur.execute(f"INSERT INTO {table} ({','.join([str(x) for x in list(df.columns)])}) VALUES({','.join([str(x) for x in list(df.iloc[f])])});")
    cur.execute(f"SELECT column_name, data_type from information_schema.columns WHERE table_name='{table}';")
    types = cur.fetchall()
    with open("/home/ferran/Escritorio/TFG/SplitIT/DDBB/output/" + file_name, 'r') as file:
        for line in file:
            line = line.strip().split(",")
            query = ','.join(line)
            
            


        
        
    conn.commit()

    cur.close()

    # finally:
    #     if conn is not None:
    #         conn.close()

if __name__ == "__main__":
    table_name = input("Table name: ")  
    file_name = input("File name: ")

    insert_table(table_name, file_name)
