from .tables import * 
from .app import db
from flask import request
from app import app



@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = UserTable(**data)
    db.session.add(new_user)
    db.session.commit()
    return {"message": f"car {new_user.nickname} has been created successfully."}
    
