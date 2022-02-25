from app import db
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


class UserTable(db.Model):
    __table__ = db.Model.metadata.tables['usertable']
    
    def __repr__(self):
        return self.nickname

class Friends(db.Model):
    __table__ = db.Model.metadata.tables['friends']

class Groups(db.Model):
    __table__ = db.Model.metadata.tables['groups']

class Group_User(db.Model):
    __table__ = db.Model.metadata.tables['group_user']

class Ticket(db.Model):
    __table__ = db.Model.metadata.tables['ticket']

    def __repr__(self):
        return str(self.ticket_id)

class Payment_Method(db.Model):
    __table__ = db.Model.metadata.tables['payment_method']

class Subticket(db.Model):
    __table__ = db.Model.metadata.tables['subticket']

class Product(db.Model):
    __table__ = db.Model.metadata.tables['product']

class Products_Prop(db.Model):
    __table__ = db.Model.metadata.tables['products_prop']
