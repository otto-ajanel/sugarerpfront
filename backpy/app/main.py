from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import User
from .schema import UserBase

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Ruta para obtener todos los usuarios
@app.get("/users", response_model=list[UserBase])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# Ruta para obtener un usuario por su ID
@app.get("/users/{user_id}", response_model=UserBase)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Ruta para crear un nuevo usuario
@app.post("/users", response_model=UserBase)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = User(user_id=user.user_id, user_email=user.user_email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
