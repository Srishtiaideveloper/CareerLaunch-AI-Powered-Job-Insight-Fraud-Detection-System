# CareerIQ — Complete Project Explanation for Examiner

---

## 1. What is This Project?

**CareerIQ** is an **AI-powered Career Assistant web application** built for **B.Tech CSE students** (3rd & 4th year) in **India**.

**In one line:** *Upload your resume → get instant skill analysis → see matching job roles → find real-time jobs & internships → detect fake job scams.*

### What Problem Does It Solve?

| Problem | Our Solution |
|---|---|
| Students don't know which skills they have vs what industry needs | Resume parser extracts and categorizes all skills automatically |
| Students don't know which job role suits them | AI matching engine compares skills against 11 job roles |
| Job listings on different portals are scattered | We aggregate real-time jobs from API + link to 6 portals |
| Students get scammed by fake job postings | Built-in Fake Job Detector analyzes URLs and descriptions |
| No India-specific career platform for freshers | Everything is filtered for India, CSE, 0-2 years experience |

---

## 2. Tech Stack (What We Used)

```
┌──────────────────────────────────────────┐
│           FRONTEND (Client-Side)          │
│                                          │
│  HTML5    → Structure of the webpage     │
│  CSS3     → Styling, animations, design  │
│  Vanilla JS → All logic & functionality  │
│                                          │
│  NO React, NO Angular, NO frameworks     │
│  NO backend server, NO database server   │
└──────────────────────────────────────────┘

External Libraries (loaded via CDN):
• PDF.js (Mozilla) → To read PDF resume files
• Chart.js → To draw skill distribution charts

API:
• Remotive API (free, no key) → Real-time job listings

Server:
• http-server (Node.js) → Simple static file server, only for local development
```

> **Important for examiner:** There is **NO backend** and **NO traditional database** (like MySQL/MongoDB). Everything runs in the browser. The "database" in this project refers to a **JavaScript object** (`SKILL_DB`) that stores 238 skills across 10 categories. It's an **in-memory data structure**, not a database server.

---

## 3. Architecture (How It Works — Big Picture)

```
User uploads resume (PDF/TXT)
        │
        ▼
┌─────────────────────┐
│   PDF.js Library     │  → Extracts raw text from PDF
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   SkillExtractor     │  → Matches text against SKILL_DB (238 skills)
│   (Client-side)      │  → Categorizes: Languages, Frameworks, DB, Cloud, etc.
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   RoleMatcher        │  → Compares user skills vs 11 job role requirements
│   (Client-side)      │  → Calculates match percentage for each role
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   UIRenderer         │  → Displays all 7 sections on screen
│   (Client-side)      │  → Charts, cards, grids, modals
└─────────────────────┘
        │
        ▼  (Meanwhile, in parallel)
┌─────────────────────┐
│   Remotive API       │  → Fetches LIVE job listings
│   (External, Free)   │  → Filtered: India only, last 14 days, CSE relevant
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   FakeJobDetector    │  → Separate tool: user pastes URL or text
│   (Client-side)      │  → Checks 30 trusted domains + 20 red flag patterns
└─────────────────────┘
```

---

## 4. Role of Each Component (Class by Class)

### 4.1 `SKILL_DB` — The Skill Database
```
What: A JavaScript object storing 238 skills in 10 categories
Why:  To match resume text against known industry skills
How:  When user uploads resume, we check every word against this list

Categories:
├── languages (28)     → python, java, javascript, c++, etc.
├── frameworks (42)    → react, angular, django, spring boot, etc.
├── databases (18)     → mysql, mongodb, redis, firebase, etc.
├── cloud (29)         → aws, docker, kubernetes, jenkins, etc.
├── ml_ai (36)         → tensorflow, pytorch, nlp, llm, etc.
├── tools (25)         → git, postman, figma, jira, etc.
├── mobile (12)        → react native, flutter, android, etc.
├── testing (15)       → jest, selenium, cypress, pytest, etc.
├── security (12)      → cybersecurity, owasp, jwt, oauth, etc.
└── soft (20)          → leadership, agile, communication, etc.
                         ─────
                    Total: 238 skills
```

### 4.2 `JOB_ROLES` — Job Role Definitions
```
What: Array of 11 job role objects
Each role has:
  - title (e.g., "Software Development Engineer")
  - requiredSkills (array of must-have skills)
  - niceToHave (bonus skills)
  - salaryRange (e.g., "₹6–25 LPA")
  - responsibilities, description

The 11 roles:
  1. SDE (Software Dev Engineer)
  2. Frontend Developer
  3. Backend Developer
  4. Full Stack Developer
  5. Data Analyst
  6. ML Engineer
  7. DevOps Engineer
  8. Mobile App Developer
  9. Cybersecurity Analyst
  10. QA/Test Engineer
  11. Cloud Architect
```

### 4.3 `SkillExtractor` — Resume Parser
```
What:  Reads resume text and finds matching skills
Input: Raw text string from PDF
Output: Object with matched skills per category

How it works:
1. Convert resume text to lowercase
2. For each skill in SKILL_DB:
   - Check if the skill keyword appears in resume text
   - If found → add to "matched" list for that category
3. Return categorized results

Example:
  Resume has "python, react, aws, git"
  Output: {
    languages: { matched: ['python'] },
    frameworks: { matched: ['react'] },
    cloud: { matched: ['aws'] },
    tools: { matched: ['git'] }
  }
```

### 4.4 `RoleMatcher` — Job Role Matching Engine
```
What:  Calculates how well user's skills match each job role
Input: User's extracted skills + JOB_ROLES definitions
Output: Sorted list of roles with match percentages

How it works:
1. For each of 11 roles:
   - Count how many "requiredSkills" the user has
   - matchScore = (matched / total required) × 100
   - Add bonus for "niceToHave" skills
2. Sort by matchScore (highest first)
3. Return top matches

Example:
  User skills: python, react, node, sql, git
  SDE role needs: javascript, python, java, react, node, sql, git, docker
  Matched: 5/8 = 62.5% match
```

### 4.5 `RealTimeJobFetcher` — Live Job API Client
```
What:  Fetches real job listings from Remotive API
Input: Job title keyword (e.g., "software developer")
Output: Array of live job objects with title, company, URL, salary

How it works:
1. Make HTTP GET request to: https://remotive.com/api/remote-jobs?search=<keyword>
2. Parse JSON response
3. Return job listings with genuine apply links

This is used in Section 4 (Live Job Listings).
```

### 4.6 `OpportunityFetcher` — India-Filtered Opportunity Engine
```
What:  Fetches internships, hackathons, full-time jobs — India only
Input: User's skill list
Output: Filtered, scored job opportunities

STRICT FILTERS applied:
1. isIndiaRelevant() → Location must contain: india, mumbai, bangalore, 
   remote, worldwide, etc. REJECTS: "USA only", "Europe only"
2. isCurrentlyOpen() → Posted within last 14 days only
3. isCSERelevant() → Must be tech/CS related (not marketing, sales, etc.)
4. NOT from blacklisted countries (USA-only, UK-only listings removed)

Also provides getPortalLinks() → 6 live portal links:
  Internshala, Unstop, LinkedIn India, Naukri, HackerEarth, Devfolio
```

### 4.7 `FakeJobDetector` — Scam Detection Engine
```
What:  Analyzes job URLs or descriptions for fraud indicators
Input: URL string or job description text
Output: Safety score (0-100%) + list of red/yellow/green flags

TWO MODES:
1. URL Mode → Checks domain against 30 trusted platforms
2. Text Mode → Scans for 20+ red flag patterns

TRUSTED DOMAINS (30):
  LinkedIn, Naukri, Internshala, Indeed, Glassdoor, Unstop,
  Google Careers, Amazon Jobs, TCS, Infosys, Wipro, etc.

RED FLAG PATTERNS (20+):
  ❌ "Pay registration fee" → SCAM
  ❌ "Guaranteed income" → SCAM
  ❌ "Earn ₹50000 per day" → SCAM
  ❌ "WhatsApp group join" → SCAM
  ❌ "No experience needed" → SUSPICIOUS
  ❌ "Send Aadhaar/PAN card" → IDENTITY THEFT
  ❌ "Data entry/typing job" → COMMON SCAM
  ❌ URL shorteners (bit.ly) → HIDING REAL LINK

SAFETY SCORE CALCULATION:
  Start at 80 (optimistic)
  +15 for trusted domain
  -35 for suspicious domain
  -20 for each HIGH severity red flag
  -10 for each MEDIUM severity red flag
  -5 for each LOW severity red flag

VERDICT:
  70-100% → ✅ Likely Safe (green)
  40-69%  → ⚠️ Proceed with Caution (yellow)
  0-39%   → 🚨 High Scam Risk (red)
```

### 4.8 `UIRenderer` — User Interface Engine
```
What:  Renders all visual sections on the page
Sections:
  Section 0: Trending Skills (2025-26 market data)
  Section 1: Resume Analysis (skill categories + chart)
  Section 2: Skill Gap & Improvement Plan
  Section 3: Matching Job Roles (clickable cards)
  Section 4: Real-Time Job Listings (from API)
  Section 5: Career Advice & Timeline
  Section 6: Internships, Hackathons & Opportunities
  Section 7: Fake Job Detector
```

---

## 5. How Real-Time Job Integration Works

```
Step 1: User uploads resume
Step 2: Skills extracted → top matching role identified
Step 3: Two parallel API calls happen:

  CALL 1 (Section 4 — Live Jobs):
  ────────────────────────────────
  URL: https://remotive.com/api/remote-jobs?search=software+developer&limit=20
  Response: JSON with job objects
  Each job has: title, company, location, salary, apply_url, tags
  We display these with genuine "Apply Now" links

  CALL 2 (Section 6 — Opportunities):
  ────────────────────────────────────
  Multiple API calls with different keywords:
  - "intern india"
  - "junior developer india"
  - "software engineer india"
  - "hackathon"
  - "fresher"

  FILTERS APPLIED ON EVERY RESULT:
  ├── isIndiaRelevant(location) → Must be India-eligible
  ├── isCurrentlyOpen(date) → Must be posted last 14 days
  ├── isCSERelevant(tags) → Must be tech/CS related
  └── excludeBlacklisted(location) → Reject USA/UK only

  Results sorted by match percentage with user's skills
```

### Why Remotive API?
| Feature | Remotive API |
|---|---|
| Cost | **100% Free forever** |
| API Key needed? | **No** |
| Rate limits? | **None documented** |
| Data quality | Real companies, real jobs |
| Job apply links | **Genuine** — redirect to company site |

---

## 6. About the "Database"

> **CRITICAL for examiner:** There is NO MySQL, MongoDB, or any server database.

### What the "database" actually is:

```javascript
// This is our "database" — a JavaScript object in app.js
const SKILL_DB = {
  languages: {
    icon: '💻',
    label: 'Programming Languages',
    skills: ['python', 'java', 'javascript', 'c++', ...] // 28 skills
  },
  frameworks: {
    skills: ['react', 'angular', 'django', ...] // 42 skills
  },
  // ... 10 categories, 238 total skills
};

const JOB_ROLES = [
  {
    title: 'Software Development Engineer',
    requiredSkills: ['javascript', 'python', 'react', ...],
    salaryRange: '₹6-25 LPA',
    // ...
  },
  // ... 11 roles
];
```

### Why no server database?
1. **Privacy** — Resume never leaves the browser. No data sent to any server.
2. **Speed** — Everything runs instantly, no network latency for parsing.
3. **No cost** — No hosting, no database charges.
4. **Offline capable** — Once loaded, resume analysis works without internet.

### Dynamic counts:
```javascript
// These are computed AT RUNTIME, not hardcoded
const totalSkills = Object.values(SKILL_DB).reduce(
  (sum, cat) => sum + cat.skills.length, 0
); // = 238

const totalRoles = JOB_ROLES.length; // = 11
const totalPortals = OpportunityFetcher.getPortalLinks().length; // = 6
```

If you add a new skill to `SKILL_DB`, the count automatically becomes 239. **It's dynamic.**

---

## 7. Challenges Faced & How We Solved Them

### Challenge 1: Hardcoded/Stale Data
```
PROBLEM: Initial version had fake job links and hardcoded hackathon data
         that could become outdated (e.g., "SIH 2024" when it's 2025)

SOLUTION: Replaced ALL hardcoded data with:
  - Live API calls to Remotive for internships/jobs
  - Direct portal links (Unstop, Devfolio, etc.) that ALWAYS
    show currently open events
  - 14-day recency filter ensures nothing stale
```

### Challenge 2: Jobs from Wrong Countries
```
PROBLEM: API returns jobs worldwide — students need India only

SOLUTION: Built strict isIndiaRelevant() filter:
  - Checks for 25+ Indian city names (Mumbai, Bangalore, etc.)
  - Accepts "Remote", "Worldwide", "APAC", "Asia"
  - REJECTS "USA only", "Europe only", "UK only"
  - Added isNotBlacklisted() — explicitly removes US/EU-only jobs
```

### Challenge 3: Non-CSE Jobs Appearing
```
PROBLEM: API sometimes returns marketing, sales, design jobs

SOLUTION: Built isCSERelevant() filter:
  - Checks job tags for tech keywords: python, react, data, etc.
  - Checks title for: developer, engineer, analyst, intern
  - Rejects: marketing, sales, HR, content writing
```

### Challenge 4: Duplicate Code Causing Errors
```
PROBLEM: After refactoring, old OpportunityFetcher code was left
         alongside new code → JavaScript syntax errors

SOLUTION: Used Node.js script to precisely identify and remove
         200+ lines of orphaned duplicate code
```

### Challenge 5: Stats Were Hardcoded
```
PROBLEM: Hero section showed "200 skills, 11 roles, 4 portals"
         — these were static numbers

SOLUTION: Made them DYNAMIC:
  - Count skills from SKILL_DB at runtime
  - Count roles from JOB_ROLES.length
  - Count portals from getPortalLinks().length
  - Numbers auto-update if data changes
```

### Challenge 6: Fake Job Scams
```
PROBLEM: Students apply to scam postings on social media

SOLUTION: Built FakeJobDetector with:
  - 30 trusted domain whitelist
  - 20+ regex patterns for red flags
  - URL structure analysis
  - Safety score algorithm (0-100%)
  - No API needed — runs fully client-side
```

---

## 8. Data Flow Diagram (Simple)

```
┌─────────────┐    PDF.js     ┌──────────────┐
│   Resume    │ ──────────▶  │  Raw Text     │
│   (PDF)     │               │  String       │
└─────────────┘               └──────┬───────┘
                                     │
                              SkillExtractor
                                     │
                                     ▼
                            ┌────────────────┐
                            │ Matched Skills  │
                            │ {languages: [], │
                            │  frameworks: [],│
                            │  databases: []} │
                            └───────┬────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
            ┌──────────┐   ┌──────────┐   ┌──────────────┐
            │RoleMatcher│   │ GapFinder │   │AdviceEngine  │
            │ 11 roles  │   │ missing   │   │ readiness    │
            │ scored    │   │ skills    │   │ timeline     │
            └────┬─────┘   └────┬─────┘   └──────┬───────┘
                 │              │                  │
                 ▼              ▼                  ▼
            Section 3      Section 2          Section 5
            
                    MEANWHILE (Async):
                    
            ┌──────────────┐        ┌─────────────────┐
            │ Remotive API │        │ OpportunityFetcher│
            │ Live Jobs    │        │ India-filtered    │
            └──────┬───────┘        └────────┬────────┘
                   │                         │
                   ▼                         ▼
              Section 4                 Section 6
```

---

## 9. Files in the Project

| File | Size | Purpose |
|---|---|---|
| `index.html` | ~12 KB | Page structure — 7 sections, nav bar, modals |
| `index.css` | ~57 KB | All styling — glassmorphism, animations, responsive |
| `app.js` | ~89 KB | All logic — 8 classes, 1800+ lines of JavaScript |
| `hero-bg.png` | ~200 KB | Background image for hero section |

**Total:** 4 files. No `node_modules`. No `package.json`. Pure vanilla web.

---

## 10. Likely Examiner Questions & Answers

### Q1: "What is the tech stack?"
**A:** HTML5, CSS3, Vanilla JavaScript. No frameworks. PDF.js library for resume parsing. Chart.js for skill charts. Remotive API for live job data. Runs on a simple static HTTP server.

### Q2: "Which database have you used?"
**A:** We don't use a traditional database like MySQL or MongoDB. Our skill data is stored as a JavaScript object (`SKILL_DB`) with 238 skills across 10 categories. This is an **in-memory data structure** loaded when the page opens. We chose this approach because: (1) Resume data stays private — never sent to any server, (2) Instant processing — no network latency, (3) Zero hosting cost.

### Q3: "How does resume parsing work?"
**A:** We use Mozilla's **PDF.js** library to extract raw text from uploaded PDFs. Then our `SkillExtractor` class converts the text to lowercase and matches each word against our skill database of 238 keywords. Skills are categorized into 10 groups: languages, frameworks, databases, cloud, ML/AI, tools, mobile, testing, security, and soft skills.

### Q4: "How does job matching work?"
**A:** The `RoleMatcher` compares the user's extracted skills against the required skills for each of 11 pre-defined job roles. Match percentage = (skills matched / skills required) × 100. Bonus points are added for "nice-to-have" skills. Roles are sorted by match score, highest first.

### Q5: "Is the job data real-time?"
**A:** Yes, Sections 4 and 6 fetch live data from the **Remotive API** every time a resume is analyzed. Jobs are filtered to show only: (1) India-eligible positions, (2) Posted within the last 14 days, (3) CSE/tech relevant. Additionally, we provide direct links to Internshala, Naukri, LinkedIn India, and Unstop which always show currently open listings.

### Q6: "What API are you using? Is it free?"
**A:** **Remotive API** — a public REST API for remote job listings. It's free forever, requires no API key, no signup, and has no documented rate limits. URL format: `https://remotive.com/api/remote-jobs?search=<keyword>&limit=<number>`

### Q7: "How does the Fake Job Detector work?"
**A:** Two modes:
- **URL Mode:** Checks the domain against a whitelist of 30 trusted job platforms (LinkedIn, Naukri, etc.). Flags URL shorteners, Google Forms, and HTTP (insecure) URLs.
- **Text Mode:** Scans the job description using 20+ regex patterns that detect scam keywords like "registration fee", "guaranteed income", "WhatsApp group", "send Aadhaar", etc.

A safety score (0-100%) is calculated: start at 80, add/subtract based on flags. Verdict: Safe (>70%), Caution (40-70%), or Danger (<40%).

### Q8: "How do you ensure only India-specific jobs?"
**A:** Three-layer filtering:
1. `isIndiaRelevant()` — checks if location mentions India or any of 25+ Indian cities
2. `isNotBlacklisted()` — explicitly rejects "USA only", "Europe only", "UK only"
3. `isCSERelevant()` — ensures job tags contain tech keywords

### Q9: "Why no React or Angular?"
**A:** To demonstrate core JavaScript proficiency. Frameworks add complexity and dependencies. Our project proves we can build a production-quality SPA with just vanilla JS — including DOM manipulation, async/await, fetch API, class-based architecture, event delegation, and responsive design.

### Q10: "How is the data secured?"
**A:** The resume NEVER leaves the browser. All processing happens client-side using JavaScript. No data is sent to any server. No cookies, no user accounts, no data storage. Once you close the tab, everything is gone. This is **privacy by design**.

### Q11: "How do you handle API failures?"
**A:** Graceful degradation. If the Remotive API is down:
- Sections 4 & 6 show "Use portal links below" with direct links to Internshala/Naukri/LinkedIn
- An "API Offline" indicator appears in the nav bar
- Resume analysis (Sections 1-3, 5) work fully offline since they don't need the API

### Q12: "What is the scroll-spy feature?"
**A:** The navigation bar at the top has 8 section links. As you scroll down the page, the currently visible section's link gets highlighted automatically using a JavaScript `IntersectionObserver`-like pattern that checks each section's position on every scroll event.

### Q13: "What are the 238 skills?"
**A:** 10 categories with counts: Languages (28), Frameworks (42), Databases (18), Cloud/DevOps (29), ML/AI (36), Tools (25), Mobile (12), Testing (15), Security (12), Soft Skills (20). These cover the complete tech industry skill landscape for a CSE graduate.

### Q14: "Can this project be deployed online?"
**A:** Yes, it can be hosted on **GitHub Pages**, **Netlify**, or **Vercel** for free — since it's just 4 static files. No server needed. Just upload the files and it works.

### Q15: "What design pattern did you use?"
**A:** **Class-based modular architecture** with separation of concerns:
- Data classes (`SKILL_DB`, `JOB_ROLES`) — pure data
- Logic classes (`SkillExtractor`, `RoleMatcher`, `FakeJobDetector`) — business logic
- Service classes (`RealTimeJobFetcher`, `OpportunityFetcher`) — API integration  
- UI class (`UIRenderer`) — rendering/DOM manipulation
- Event handlers in `DOMContentLoaded` — wiring it all together

### Q16: "How is the UI designed?"
**A:** **Glassmorphism design system** with:
- CSS custom properties (design tokens) for colors, spacing, typography
- Dark theme with subtle transparency and blur effects
- Responsive grid layouts using CSS Grid and Flexbox
- Micro-animations for hover states and transitions
- Google Fonts (Inter for body, JetBrains Mono for code)
- SVG rings for match percentage visualization

### Q17: "What are the limitations?"
**A:** Be honest:
1. Remotive API has mostly remote/international jobs — not all are India-based
2. Skill extraction is keyword-based not AI/NLP — may miss contextual skills
3. No user accounts — analysis is lost when you close the tab
4. No mobile app — web only (but fully responsive)
5. Fake job detector is heuristic-based — not 100% accurate

### Q18: "What would you improve in future?"
**A:** 
1. Add backend (Node.js + MongoDB) for user accounts & saved analyses
2. Use NLP (Natural Language Processing) for smarter skill extraction
3. Add more APIs (Naukri API, LinkedIn API — if access available)
4. Build a mobile app with React Native
5. Add AI chatbot for career guidance (using OpenAI/Gemini API)

---

## 11. How to Run the Project

```bash
# Step 1: Open VS Code → File → Open Folder → select project folder

# Step 2: Open terminal (Ctrl + `)

# Step 3: Run this command
npx -y http-server . -p 8080 -c-1

# Step 4: Open browser → go to http://localhost:8080

# Step 5: Upload resume → Click "Analyze Resume & Find Jobs"

# Step 6: Scroll through all 7 sections

# Step 7: Try Fake Job Detector at the bottom
```

---

## 12. Key Numbers to Remember

| Metric | Value |
|---|---|
| Skills tracked | **238** (dynamic count) |
| Skill categories | **10** |
| Job roles defined | **11** |
| Live job portals | **6** |
| Trusted domains (FJD) | **30** |
| Red flag patterns (FJD) | **20+** |
| Total JS lines | **~1800** |
| Total CSS lines | **~2900** |
| External APIs | **1** (Remotive — free) |
| Libraries used | **2** (PDF.js, Chart.js) |
| Total files | **4** |
| Framework used | **None** (Vanilla JS) |
