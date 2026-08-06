# ⚡ CareerLaunch AI — AI-Powered Job Insight & Fraud Detection System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-orange.svg)](index.html)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Gemini%20%7C%20Groq-purple.svg)](app.js)
[![Cloud Storage](https://img.shields.io/badge/Storage-Supabase-emerald.svg)](supabase_setup.sql)
[![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages%20%7C%20Vercel%20%7C%20Netlify-success.svg)](vercel.json)

**CareerLaunch AI** (CareerIQ v3) is a client-first, AI-driven career intelligence platform engineered for computer science students and job seekers in India. It converts raw resumes into actionable skill analytics, maps candidate profiles to top software engineering roles, aggregates live job listings, builds ATS-friendly FAANG-style resumes, and detects fraudulent job postings in real time.

---

## ✨ Key Features

- **📄 Client-Side Resume Parsing**: Extracts 238+ technical skills across 10 categories directly in the browser using `PDF.js` without privacy leakage.
- **🎯 Intelligent Role Matching**: Matches candidate profiles against 11+ software engineering roles (Full Stack, Backend, Data Science, AI/ML, DevOps, Cloud, etc.) with percentage match calculations.
- **✨ FAANG Resume Builder & ATS Scorer**: Evaluates resumes against high-standard ATS criteria, generates automated rewrites, and exports formatted PDFs using `html2pdf.js`.
- **📊 Skill Gap Analytics**: Highlights missing skills for desired job roles and generates custom learning resource recommendations (LeetCode, Roadmap.sh, freeCodeCamp).
- **💼 Real-Time Job Aggregation**: Connects with live job APIs (Remotive, JSearch) filtered for remote and India-based entry-level/fresher roles (0-2 years experience).
- **🇮🇳 Curated Opportunities Hub**: Aggregates top internship platforms, hackathons, and fresher hiring portals (Unstop, Instahyre, Wellfound, GitHub Student Developer Pack).
- **🛡️ Fake Job & Scam Detector**: Analyzes job URLs and descriptions against 30+ trusted domain registries and 20+ red-flag scam patterns to protect job seekers.
- **🤖 AI Career Assistant**: Context-aware chatbot powered by Google Gemini and Groq LLMs that answers career queries with full knowledge of the candidate's resume.
- **☁️ Supabase Cloud Sync**: Stores analysis logs, device history, and user settings seamlessly with fallback to browser LocalStorage.

---

## 📸 Platform Screenshots

| Feature | Preview |
| :--- | :--- |
| **Skill Analysis** | ![Skill Analysis](image_resume_analysis.jpg) |
| **Skill Gap Assessment** | ![Skill Gap](image_skill_gap.jpg) |
| **Fake Job Detector** | ![Scam Detection](image_15_scam.jpg) |

---

## 🏗️ Architecture & Data Flow

```
                                  ┌───────────────────────────────┐
                                  │      User Resume (PDF/TXT)     │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │   Browser PDF.js / Text Reader│
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │      SkillExtractor Engine    │
                                  │  (238+ skills in 10 categories│
                                  └──────────────┬────────────────┘
                                                 │
                  ┌──────────────────────────────┼──────────────────────────────┐
                  ▼                              ▼                              ▼
     ┌────────────────────────┐    ┌────────────────────────┐    ┌────────────────────────┐
     │   Role Matching Engine │    │  FAANG Resume Scorer   │    │  Skill Gap Calculator  │
     │   (11 Software Roles)  │    │ & PDF Generator        │    │ & Learning Resource Map│
     └────────────┬───────────┘    └────────────┬───────────┘    └────────────┬───────────┘
                  │                             │                             │
                  └─────────────────────────────┼─────────────────────────────┘
                                                │
                                                ▼
                                  ┌───────────────────────────────┐
                                  │   Live Jobs & AI Chat Assistant│
                                  │   (Remotive API / Gemini LLM) │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │  Supabase & Glassmorphic UI   │
                                  └───────────────────────────────┘
```

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core**: Vanilla HTML5, Modern CSS3 (CSS Variables, Flexbox/Grid, Glassmorphism, Responsive UI), Vanilla JavaScript (ES6+)
- **Analytics & PDF Libraries**:
  - [PDF.js](https://mozilla.github.io/pdf.js/) — In-browser PDF parsing
  - [Chart.js](https://www.chartjs.org/) — Radar & donut visual charts
  - [html2pdf.js](https://eKoopmans.github.io/html2pdf.js/) — Vector PDF generation
- **Backend & Cloud Services**:
  - [Supabase JS Client v2](https://supabase.com/) — Cloud database & device tracking
  - [Google Gemini API](https://ai.google.dev/) / [Groq API](https://groq.com/) — Conversational AI & career advising
  - [Remotive REST API](https://remotive.com/) & JSearch — Real-time job search listings

---

## 📁 Repository Structure

```
├── index.html                 # Main application structure & page routes
├── index.css                  # Modern glassmorphism UI styles & animations
├── app.js                     # Complete client application logic & engines
├── hero-bg.png                # Hero section background graphic
├── supabase_setup.sql         # SQL schema script for Supabase database tables
├── sample_resume.txt          # Sample resume for instant testing
├── project_explanation.md     # Detailed documentation for project review
├── vercel.json                # Vercel deployment configuration
├── netlify.toml               # Netlify deployment configuration
├── .gitignore                 # Excluded files & temporary directories
├── LICENSE                    # MIT License
└── README.md                  # Project overview & deployment guide
```

---

## ⚡ Quick Start (Local Development)

Because **CareerLaunch AI** is built using client-side web technologies, no heavy build step or backend server installation is required.

### Method 1: Direct File / VS Code Live Server
1. Clone the repository:
   ```bash
   git clone https://github.com/Srishtiaideveloper/CareerLaunch-AI-Powered-Job-Insight-Fraud-Detection-System.git
   cd CareerLaunch-AI-Powered-Job-Insight-Fraud-Detection-System
   ```
2. Open `index.html` in your browser, or start VS Code **Live Server**.

### Method 2: Node.js Static Server
```bash
# Run using npx serve
npx serve .
```
Navigate to `http://localhost:3000` in your web browser.

---

## 🚀 Deployment Guide

Deploying **CareerLaunch AI** takes less than 2 minutes.

### 1️⃣ Option A: GitHub Pages (Recommended — Zero Config)
1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Deploy CareerLaunch AI"
   git push origin main
   ```
2. Go to your repository on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Choose Branch: `main`, Folder: `/ (root)`, and click **Save**.
5. Your live link will be generated automatically at `https://<your-username>.github.io/CareerLaunch-AI-Powered-Job-Insight-Fraud-Detection-System/`.

### 2️⃣ Option B: Vercel
1. Install Vercel CLI or go to [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** → Import your GitHub repository.
3. Keep default settings (Framework Preset: **Other**) and click **Deploy**.
4. Vercel will automatically detect `vercel.json` and publish your site instantly.

### 3️⃣ Option C: Netlify
1. Log in to [Netlify](https://netlify.com).
2. Click **Add new site** → **Import an existing project** → Connect to GitHub.
3. Select your repository and click **Deploy Site**. Netlify will use `netlify.toml` automatically.

---

## 🗄️ Database Setup (Optional — Supabase)

To enable cloud storage for resume scan history:

1. Create a free account at [Supabase](https://supabase.com).
2. Create a new project and navigate to the **SQL Editor**.
3. Copy and run the contents of [`supabase_setup.sql`](supabase_setup.sql).
4. Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js` or set them in your browser `localStorage`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for Students & Job Seekers</p>
