<p align="center">
  <img src="C:\Users\anugu vaishnavi\.gemini\antigravity\brain\a5bbe753-b8e8-43e8-b325-2b551adddcf9\researchpilot_logo_1772844205957.png" alt="ResearchPilot AI Logo" width="200"/>
</p>

# 🚀 ResearchPilot AI: Autonomous Research Intelligence Hub

**ResearchPilot AI** is a state-of-the-art laboratory for academic and industrial research analysis. It leverages the power of Llama 3 via Groq to provide deep, structured insights into complex research papers, enabling scholars and professionals to identify gaps, risks, and implementation pathways instantly.

---

## ✨ Key Features

- **🧠 High-Fidelity AI Analysis**: Extract structured data (Problem, Methodology, Results) with novelty and impact scoring.
- **🌐 Global ArXiv Search**: Query 2.4M+ academic nodes directly and import them into your research pipeline.
- **🕸️ Research Innovation Map**: Visualize your library as an interactive knowledge graph with spring-physics and link synthesis.
- **👩‍🔬 AI Peer Reviewer**: Detailed "Reviewer #2" autonomous feedback, rejection risk analysis, and journal-tier predictions.
- **📄 Intelligence Dossier**: Generate high-fidelity, printable executive research summaries with a single click.
- **🔊 AI Audio Brief**: Listen to your research insights with built-in vocalized summary synthesis (TTS).
- **💬 Interactive Research Chat**: Query your papers using a RAG-powered interface for evidence-backed answers.
- **🔍 Gap & Risk Identification**: Automatically surface dataset limitations and future research directions.
- **📉 Authenticity Scoring**: Evaluate AI probability and academic strength of the content.
- **📂 Research Library**: Securely store and manage your analysis history.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts |
| **Backend** | FastAPI, Uvicorn, SQLAlchemy, Pydantic |
| **AI/LLM** | Groq (Llama 3.3 70B), Sentence Transformers |
| **Database** | SQLite (with SQLAlchemy ORM) |
| **Utilities** | PDFPlumber, JWT (Jose), Passlib |

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- Groq API Key

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend` folder:
   ```env
   GROQ_API_KEY=your_groq_key_here
   DATABASE_URL=sqlite:///./research_pilot.db
   SECRET_KEY=yoursecretkey
   ALGORITHM=HS256
   ```
5. Start the API server:
   ```bash
   python main.py
   ```
   > 🚩 API Documentation: [http://localhost:8001/docs](http://localhost:8001/docs)

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install Node packages:
   ```bash
   npm install
   ```
3. Launch the development environment:
   ```bash
   npm run dev
   ```
   > 🚩 Web Interface: [http://localhost:5173](http://localhost:5173)



## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

