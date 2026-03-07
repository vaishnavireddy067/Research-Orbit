
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import models

load_dotenv()
DATABASE_URL = "sqlite:///./research_pilot.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

users = db.query(models.User).all()
print(f"Total users in research_pilot.db: {len(users)}")
for user in users:
    print(f"User: {user.email}")
db.close()
