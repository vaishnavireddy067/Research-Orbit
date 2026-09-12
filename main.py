from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
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

class IdeaAuditRequest(BaseModel):
    idea: str
    domain: Optional[str] = "Computer Science / AI"
    paper_context: Optional[str] = None

class CopilotChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []
    current_idea: Optional[str] = None
    paper_context: Optional[str] = None

@app.post("/assistant/idea-copilot/")
async def audit_idea_copilot(req: IdeaAuditRequest):
    """
    Evaluates whether a research idea already exists in published literature/patterns,
    actively guides the researcher on how to make it unique, and formulates clear research objectives.
    """
    if not client:
        raise HTTPException(status_code=500, detail="Groq API Key not configured.")
    
    system_prompt = """
    You are ResearchPilot Copilot, an elite scientific research advisor and peer review chair.
    A researcher is proposing a research idea, method, or hypothesis.
    
    YOUR OBJECTIVE:
    1. Check thoroughly if this idea or its underlying patterns already exist in published academic literature / state-of-the-art.
       - If it exists, explicitly tell them: 'EXISTS_IN_LITERATURE' or 'PARTIAL_OVERLAP'. Detail the existing patterns, known paradigms, and typical citations/architectures that already solve this.
       - If it is truly white-space, label it 'NOVEL_FRONTIER'.
    2. Guide the researcher to make it genuinely UNIQUE:
       - Propose 3-4 concrete differentiation angles/pivots (e.g., hybridizing with causal inference, constraint formulations, low-power edge quantization, cross-disciplinary applications, adversarial robustness).
       - Give practical implementation hints for each pivot.
    3. Provide CLEAR, CONCRETE RESEARCH OBJECTIVES:
       - Primary Objective: A concise scientific statement.
       - Sub-Objectives (O1, O2, O3, O4): Step-by-step milestones with clear deliverables and timeline weeks.
       - Formulate a testable scientific hypothesis.
       - Evaluation metrics and quantitative validation thresholds.

    RETURN STRICTLY VALID JSON matching this exact structure:
    {
      "ideaTitle": "Concise formal academic title for the project",
      "domain": "Field of research",
      "status": "EXISTS_IN_LITERATURE" or "PARTIAL_OVERLAP" or "NOVEL_FRONTIER",
      "statusSummary": "Honest assessment explaining whether this idea exists and what patterns are already saturated",
      "noveltyScore": 0 to 100 (integer: low if fully existing, high if novel),
      "saturationPercentage": 0 to 100 (integer: how heavily researched the existing pattern is),
      "existingPatterns": [
        {
          "patternName": "Name of the existing pattern/paradigm",
          "prevalence": "e.g., Highly saturated in 2020-2024 literature",
          "description": "What researchers have already done with this pattern",
          "representativeWorks": ["Author et al., 2022", "Benchmark Model X"],
          "whyItSaturates": "Why simply doing this alone is no longer considered novel"
        }
      ],
      "uniquenessPivots": [
        {
          "angle": "Catchy title for the novel twist",
          "differentiationStrategy": "Specific architectural or mathematical change that makes it unique",
          "expectedImpact": "What performance or theoretical leap this unlocks",
          "noveltyGain": "e.g. +35% Novelty (Pioneering Edge)",
          "implementationHint": "Tools or math formulations to use"
        }
      ],
      "researchObjectives": {
        "primaryObjective": "Core primary research objective",
        "subObjectives": [
          {
            "code": "O1",
            "title": "Short title",
            "description": "Concrete task description",
            "deliverable": "Tangible output (e.g. benchmark dataset, mathematical proof, prototype code)",
            "milestoneWeeks": "Weeks 1-4"
          },
          {
            "code": "O2",
            "title": "Short title",
            "description": "Concrete task description",
            "deliverable": "Tangible output",
            "milestoneWeeks": "Weeks 5-8"
          },
          {
            "code": "O3",
            "title": "Short title",
            "description": "Concrete task description",
            "deliverable": "Tangible output",
            "milestoneWeeks": "Weeks 9-12"
          },
          {
            "code": "O4",
            "title": "Short title",
            "description": "Concrete task description",
            "deliverable": "Tangible output",
            "milestoneWeeks": "Weeks 13-16"
          }
        ],
        "hypothesis": "Testable falsifiable scientific hypothesis",
        "evaluationMetrics": ["Metric 1 (Target: ...)", "Metric 2 (Target: ...)"]
      },
      "recommendedNextStep": "Immediate next experiment or design step to start working on this unique direction"
    }
    """

    user_prompt = f"Evaluate this research idea: '{req.idea}'. Domain: {req.domain}."
    if req.paper_context:
        user_prompt += f" Active Paper Reference Context: {req.paper_context[:1500]}"

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        ai_result = json.loads(chat_completion.choices[0].message.content)
        return ai_result
    except Exception as e:
        print(f">>> IDEA COPILOT FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Idea Copilot analysis failed: {str(e)}")

@app.post("/assistant/copilot-chat/")
async def copilot_chat(req: CopilotChatRequest):
    """
    Conversational research assistant guiding the user interactively on idea refinement,
    challenging common patterns, guiding uniqueness, and structuring research steps.
    Supports queries in English and Telugu seamlessly.
    """
    if not client:
        raise HTTPException(status_code=500, detail="Groq API Key not configured.")
    
    system_prompt = """
    You are ResearchPilot Copilot, an insightful, encouraging yet scientifically rigorous AI research advisor.
    You help researchers brainstorm, refine ideas, detect existing literature patterns, pivot towards uniqueness, and establish crystal clear objectives.
    
    GUIDELINES:
    - If the user asks if an idea exists: be honest. If the idea already exists, tell them clearly ('This idea already exists in literature, specifically in...'). Point out the established patterns.
    - Always suggest concrete ways to make their idea UNIQUE (new loss functions, novel hardware adaptations, hybrid architectures, new domain datasets).
    - Provide clear objectives whenever asked.
    - If the user writes in Telugu or conversational Telugu-English (like 'cheppali', 'manaki', 'unai ani cheppu'), understand perfectly and respond warmly, constructively, and academically in clean bilingual/English format so the researcher has clear actionable guidance.
    """

    messages = [{"role": "system", "content": system_prompt}]

    if req.current_idea:
        messages.append({
            "role": "system",
            "content": f"Active Research Idea being discussed: {req.current_idea}"
        })
    if req.paper_context:
        messages.append({
            "role": "system",
            "content": f"Active Manuscript Context: {req.paper_context[:1000]}"
        })

    for h in req.history[-6:]:
        role = h.get("role", "user")
        content = h.get("content", "")
        if role in ["user", "assistant"] and content:
            messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": req.message})

    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1500
        )
        reply = chat_completion.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        print(f">>> COPILOT CHAT FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Copilot chat failed: {str(e)}")

class IdeaMutatorRequest(BaseModel):
    idea: str
    domain: Optional[str] = "Computer Science / AI"
    novelty_pressure: Optional[int] = 80 # 0 to 100
    compute_constraint: Optional[str] = "Edge / Low-Power MCU"
    mutation_focus: Optional[str] = "ALL"

class RedTeamRequest(BaseModel):
    idea: str
    hypothesis: Optional[str] = None
    methodology: Optional[str] = None

@app.post("/assistant/idea-mutator/")
async def mutate_research_idea(req: IdeaMutatorRequest):
    """
    Evolves a standard/saturated research idea into 4 distinct breakthrough offspring
    using genetic idea mutation paradigms (neuro-symbolic, edge quantization, cross-domain, adversarial invariance).
    """
    if not client:
        raise HTTPException(status_code=500, detail="Groq API Key not configured.")

    system_prompt = f"""
    You are the ResearchPilot Idea Genetic Mutator. 
    Your goal is to apply evolutionary pressure to a researcher's raw or saturated idea and mutate it into 4 genuinely novel offspring concepts.
    Target Novelty Pressure: {req.novelty_pressure}/100.
    Target Hardware/Compute: {req.compute_constraint}.

    For each mutation, provide:
    1. mutationType: One of ['NEURO_SYMBOLIC', 'QUANTIZED_EDGE', 'CROSS_DOMAIN', 'ADVERSARIAL_INVARIANCE']
    2. mutationName: Catchy paradigm name
    3. title: Formal academic title
    4. description: What is fundamentally changed
    5. mathematicalTwist: Exact mathematical or algorithmic innovation
    6. noveltyScore: Integer (75 to 98)
    7. feasibilityScore: Integer (60 to 95)
    8. computeCost: e.g. '< 15W MCU' or '1x RTX 4090'
    9. differentiator: Exactly why reviewers will rate this 8/10+ at top-tier venues

    Return strictly valid JSON:
    {{
      "mutations": [
        {{
          "id": "mut-1",
          "mutationType": "NEURO_SYMBOLIC",
          "mutationName": "Neuro-Symbolic Causal Shift",
          "title": "...",
          "description": "...",
          "mathematicalTwist": "...",
          "noveltyScore": 88,
          "feasibilityScore": 78,
          "computeCost": "...",
          "differentiator": "..."
        }},
        ... (generate 4 mutations covering the 4 types)
      ]
    }}
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Evolve and mutate this research idea: '{req.idea}'. Domain: {req.domain}"}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        return json.loads(chat_completion.choices[0].message.content)
    except Exception as e:
        print(f">>> IDEA MUTATOR FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Idea mutator failed: {str(e)}")

@app.post("/assistant/red-team/")
async def red_team_stress_test(req: RedTeamRequest):
    """
    Acts as a hyper-critical Senior Area Chair / Devil's Advocate (Reviewer #2)
    to identify fatal methodological flaws, unstated assumptions, and generate pre-emptive defenses.
    """
    if not client:
        raise HTTPException(status_code=500, detail="Groq API Key not configured.")

    system_prompt = """
    You are an ultra-rigorous Senior Area Chair at NeurIPS/ICML and Nature Reviewer.
    Stress-test the researcher's idea, hypothesis, and proposed methodology like a relentless Devil's Advocate.
    Find fatal flaws, hidden assumptions, and predict the exact rejection attack Reviewer #2 will write.
    Then formulate a brilliant Pre-Emptive Defense experiment to disarm them.

    Return strictly valid JSON:
    {
      "fatalFlaws": [
        {
          "title": "Catchy flaw title",
          "severity": "CRITICAL" or "HIGH" or "MODERATE",
          "description": "In-depth scientific breakdown of the vulnerability",
          "reviewerQuote": "The exact scathing critique Reviewer #2 would write in the review",
          "preemptiveDefense": "The concrete empirical counter-experiment or mathematical lemma the author must include to rebut this attack"
        }
      ],
      "hiddenAssumptions": ["Assumption 1...", "Assumption 2..."],
      "rejectionRiskScore": 0 to 100 (integer: how vulnerable it currently is to rejection),
      "recommendedAblation": "The #1 mandatory ablation test that must be run to prove validity"
    }
    """

    user_content = f"Stress test this research proposal: '{req.idea}'."
    if req.hypothesis:
        user_content += f" Hypothesis: {req.hypothesis}."
    if req.methodology:
        user_content += f" Methodology: {req.methodology}."

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"}
        )
        return json.loads(chat_completion.choices[0].message.content)
    except Exception as e:
        print(f">>> RED TEAM FAILED: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Red Team stress test failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
