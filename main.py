from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
import json
import asyncio
import datetime
import io
import os
from jose import JWTError, jwt
from groq import Groq
from dotenv import load_dotenv
import pdfplumber

import models
import auth_utils
from database import engine, SessionLocal

# Load environment variables
load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResearchPilot – Autonomous Research Intelligence Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq Client Initialization
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
def read_root():
    print(">>> Root route accessed!")
    return {"message": "ResearchPilot AI API is Online", "docs": "/docs"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth_utils.SECRET_KEY, algorithms=[auth_utils.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

def extract_text(file: UploadFile):
    content = file.file.read()
    if file.filename.endswith(".pdf"):
        try:
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                text = ""
                for page in pdf.pages:
                    text += page.extract_text() or ""
            return text
        except Exception as e:
            print(f"Extraction error: {e}")
            return "Error extracting PDF text."
    else:
        return content.decode("utf-8", errors="ignore")

@app.post("/register/")
def register_user(email: str, password: str, full_name: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth_utils.get_password_hash(password)
    new_user = models.User(email=email, hashed_password=hashed_password, full_name=full_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth_utils.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = datetime.timedelta(minutes=auth_utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_utils.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user": {"email": user.email, "full_name": user.full_name}}

@app.post("/analyze/")
async def analyze_paper(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    print(f">>> Received file for analysis: {file.filename}")
    if not (file.filename.lower().endswith((".pdf", ".txt", ".docx", ".png", ".jpg", ".jpeg"))):
        print(">>> Invalid file format.")
        raise HTTPException(status_code=400, detail="Only PDF, TXT, DOCX, and Images are supported.")
    
    try:
        print(">>> Extracting text...")
        extracted_text = extract_text(file)
        print(f">>> Extraction complete. Length: {len(extracted_text)}")
    except Exception as e:
        print(f">>> EXTRACTION FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

    if not extracted_text or len(extracted_text) < 10:
        print(">>> Empty text extracted.")
        extracted_text = "The document appears to be empty or non-extractable."

    if not client:
        print(">>> Groq client missing.")
        raise HTTPException(status_code=500, detail="Groq API Key not configured.")

    system_prompt = """
    You are an autonomous research intelligence engine. Analyze the provided research paper text and return a high-fidelity JSON analysis.
    The response MUST be strictly valid JSON according to this structure:
    {
        "title": "Professional catchy title for the analysis",
        "authors": "Original authors if found, else 'Unknown'",
        "publication_year": "Year found, else '2024'",
        "domain": "The research field (e.g. AI, Medicine, Physics)",
        "summary": "High-level professional executive summary (2-3 sentences)",
        "impactScore": 0.0-10.0 (float),
        "novelty": 0.0-10.0 (float),
        "risks": ["Risk 1", "Risk 2", ...],
        "implementation": "Short summary of deployment or implementation feasibility",
        "failureSimulator": {
            "possible_failure_scenarios": ["Scenario 1", ...],
            "dataset_limitations": ["Limitation 1", ...],
            "scalability_issues": ["Issue 1", ...]
        },
        "researchImpact": {
            "why_it_matters": "Key academic significance",
            "who_benefits": ["Audience 1", ...],
            "practical_applications": ["App 1", ...]
        },
        "actionPlan": {
            "tools": ["Tool 1", ...],
            "skills": ["Skill 1", ...],
            "roadmap": [{"step": "Step Title", "description": "Step detail"}, ...]
        },
        "authenticityAnalysis": {
            "authenticityScore": 0-100 (int),
            "aiProbability": 0-100 (int),
            "indicators": [{"label": "Indicator Name", "value": 0-100}]
        },
        "extendedAnalysis": {
            "structuredBreakdown": {
                "problemStatement": "...",
                "methodology": "...",
                "datasetUsed": "...",
                "results": "...",
                "conclusion": "...",
                "limitations": "..."
            },
            "researchGaps": {
                "limitations": ["...", "..."],
                "openProblems": ["...", "..."],
                "futureDirections": ["...", "..."]
            },
            "criticalAudit": {
                "weakArguments": ["...", "..."],
                "missingModules": ["...", "..."],
                "improvementAreas": ["...", "..."],
                "futureScope": ["...", "..."]
            },
            "strengths": ["...", "..."],
            "weaknesses": ["...", "..."],
            "realWorldGap": {
                "academicStrength": "Low/Medium/High",
                "industryReadiness": "Low/Medium/High",
                "deploymentFeasibility": "Low/Medium/High",
                "explanation": "Brief explanation"
            }
        }
    }
    """

    try:
        print(">>> Sending to AI...")
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Analyze this paper: {extracted_text[:15000]}"}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        ai_result = json.loads(chat_completion.choices[0].message.content)
        print(">>> AI response received.")
        
        ai_result["noveltyScore"] = ai_result.get("novelty", ai_result.get("noveltyScore", 0.0))
        ai_result["year"] = ai_result.get("publication_year", "2024")
        ai_result["impactScore"] = ai_result.get("impactScore", 0.0)

    except Exception as e:
        print(f">>> AI ANALYSIS FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Analysis failed: {str(e)}")

    try:
        print(">>> Saving to database...")
        db_analysis = models.PaperAnalysis(
            owner_id=current_user.id,
            filename=file.filename,
            title=ai_result.get("title", "Untitled Analysis"),
            authors=ai_result.get("authors", "Unknown"),
            domain=ai_result.get("domain", "General"),
            publication_year=str(ai_result.get("publication_year", "2024")),
            summary=ai_result.get("summary", ""),
            impact_score=ai_result.get("impactScore", 0.0),
            novelty_score=ai_result.get("noveltyScore", 0.0),
            risks=json.dumps(ai_result.get("risks", [])),
            implementation=ai_result.get("implementation", ""),
            failure_simulator=json.dumps(ai_result.get("failureSimulator", {})),
            research_impact=json.dumps(ai_result.get("researchImpact", {})),
            action_plan=json.dumps(ai_result.get("actionPlan", {})),
            authenticity_analysis=json.dumps(ai_result.get("authenticityAnalysis", {})),
            extracted_text=extracted_text[:10000],
            extended_analysis=json.dumps(ai_result.get("extendedAnalysis", {}))
        )
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        print(">>> Database record created.")
    except Exception as e:
        print(f">>> DATABASE SYNC FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database sync failed: {str(e)}")
    
    ai_result["id"] = db_analysis.id
    return ai_result

@app.get("/history/")
def get_history(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    records = db.query(models.PaperAnalysis).filter(models.PaperAnalysis.owner_id == current_user.id).order_by(models.PaperAnalysis.created_at.desc()).all()
    results = []
    for r in records:
        results.append({
            "id": r.id,
            "filename": r.filename,
            "title": r.title,
            "authors": r.authors,
            "domain": r.domain,
            "year": r.publication_year,
            "publication_year": r.publication_year,
            "summary": r.summary,
            "impactScore": r.impact_score,
            "noveltyScore": r.novelty_score,
            "risks": json.loads(r.risks) if r.risks else [],
            "implementation": r.implementation,
            "failureSimulator": json.loads(r.failure_simulator) if r.failure_simulator else None,
            "researchImpact": json.loads(r.research_impact) if r.research_impact else None,
            "actionPlan": json.loads(r.action_plan) if r.action_plan else None,
            "authenticityAnalysis": json.loads(r.authenticity_analysis) if r.authenticity_analysis else None,
            "extendedAnalysis": json.loads(r.extended_analysis) if r.extended_analysis else None,
            "created_at": r.created_at.isoformat() if r.created_at else None
        })
    return results

@app.post("/chat/")
async def chat_with_paper(paper_id: int, question: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    paper = db.query(models.PaperAnalysis).filter(
        models.PaperAnalysis.id == paper_id, 
        models.PaperAnalysis.owner_id == current_user.id
    ).first()
    
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")

    if not client:
        raise HTTPException(status_code=500, detail="Groq API Key not configured.")

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": f"You are an AI assistant helping a researcher understand this paper: {paper.title}. Use this extracted text for context: {paper.extracted_text}. Return a JSON with 'response', 'intent', and 'evidence' (with 'quote', 'page', 'section')."},
                {"role": "user", "content": question}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        ai_response = json.loads(chat_completion.choices[0].message.content)
        return ai_response
    except Exception as e:
        return {"response": f"AI error: {str(e)}", "intent": "ERROR", "evidence": None}

@app.get("/download/{paper_id}")
async def download_improved(paper_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    paper = db.query(models.PaperAnalysis).filter(
        models.PaperAnalysis.id == paper_id, 
        models.PaperAnalysis.owner_id == current_user.id
    ).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    
    content = f"RESEARCHPILOT IMPROVED PAPER\nTitle: {paper.title}\n\n{paper.summary}\n\nExtracted Text: {paper.extracted_text[:1000]}..."
    from fastapi.responses import StreamingResponse
    return StreamingResponse(io.BytesIO(content.encode()), media_type="text/plain", headers={"Content-Disposition": f"attachment; filename=Improved_{paper.filename}.txt"})

@app.delete("/papers/{paper_id}")
async def delete_paper(paper_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    paper = db.query(models.PaperAnalysis).filter(
        models.PaperAnalysis.id == paper_id,
        models.PaperAnalysis.owner_id == current_user.id
    ).first()
    
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    
    db.delete(paper)
    db.commit()
    return {"message": "Paper analysis deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
