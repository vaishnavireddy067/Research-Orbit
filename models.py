from sqlalchemy import Column, Integer, String, Float, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)

    papers = relationship("PaperAnalysis", back_populates="owner")

class PaperAnalysis(Base):
    __tablename__ = "paper_analyses"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String, index=True)
    title = Column(String, index=True)
    authors = Column(String)
    domain = Column(String)
    publication_year = Column(String, default="2024")
    summary = Column(Text)
    impact_score = Column(Float)
    novelty_score = Column(Float, default=0.0)
    risks = Column(Text) # JSON string
    implementation = Column(Text)
    failure_simulator = Column(Text) # JSON string
    research_impact = Column(Text) # JSON string
    action_plan = Column(Text) # JSON string
    authenticity_analysis = Column(Text) # JSON string
    extracted_text = Column(Text)
    extended_analysis = Column(Text) # JSON string for all new modules
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="papers")
