import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:FDP@SplitItDB:5432/postgres'
db = SQLAlchemy(app)
db.Model.metadata.reflect(db.engine)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == '__main__':
        app.run(debug=True,host='0.0.0.0', port = 5000)
        print(db.Model.metadata.tables.keys())
