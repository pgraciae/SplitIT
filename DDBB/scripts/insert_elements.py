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

    df = pd.read_csv("/home/ferran/Escritorio/TFG/SplitIT/DDBB/output/" + file_name)
    list_rows = [tuple(row) for row in df.values]


    query = f"INSERT INTO {table} VALUES ({','.join(['%s' for x in list(df.columns)])});" 
    print(query)
    result = cur.executemany(query, list_rows)
    conn.commit()
    print(cur.rowcount, f"Record inserted successfully into {table} table")



        
        
    conn.commit()

    cur.close()

    # finally:
    #     if conn is not None:
    #         conn.close()

if __name__ == "__main__":
    table_name = input("Table name: ")  
    file_name = input("File name: ")

    insert_table(table_name, file_name)
