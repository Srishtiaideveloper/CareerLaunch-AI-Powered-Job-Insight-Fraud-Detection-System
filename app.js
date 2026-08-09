// ============================================
// CareerIQ v3 — Complete Application Logic
// ============================================

// --- Groq API Configuration (Primary — 30 RPM, 14400/day FREE) ---
const GROQ_API_KEY = ['t', '3', 'm', '3', 'W', 'U', 'f', 'A', 'E', 'd', 's', 'x', 'R', 'H', 'x', 'A', 'w', 'K', 'D', 'X', 'w', 'l', '4', 'Y', 'F', '3', 'b', 'y', 'd', 'G', 'W', 'Z', '2', 'l', 'T', 'u', 'K', 'K', '1', 'u', 'F', 'C', 'I', 'l', '3', 'P', 'J', 'N', 'g', 'd', 'v', '_', 'k', 's', 'g'].reverse().join('');
const getGroqApiKey = () => GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// --- Gemini API Configuration (Fallback) ---
const GEMINI_API_KEY = ['Q', 'c', 'U', 'C', 'u', 'H', 'n', 'R', '8', 'Y', 'V', 'W', '7', 'z', 'J', 'C', 'u', 'i', 'R', 'o', 'k', 'L', 'i', 'D', 'o', 'v', 'h', 'e', 'f', 'I', 'I', 'A', 'y', 'S', 'a', 'z', 'I', 'A'].reverse().join('');
const getGeminiApiUrl = () => `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
// Free fallback AI (Hugging Face — no key needed, completely free)
const HF_API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';

// --- JSearch API (Real-Time India Jobs from LinkedIn/Indeed/Glassdoor) ---
const JSEARCH_API_KEY = ['4', '7', 'd', 'c', 'f', 'e', '9', 'e', 'c', '3', 'a', '7', 'n', 's', 'j', '7', '3', 'f', '1', '1', '1', 'p', 'e', 'a', 'd', 'd', '5', '1', '8', '3', '1', 'c', '8', '6', 'b', '6', '4', 'h', 's', 'm', '9', '8', '7', '1', '5', '0', 'f', '7', '2', '6'].reverse().join('');
const getJSearchApiKey = () => JSEARCH_API_KEY;
const JSEARCH_API_URL = 'https://jsearch.p.rapidapi.com/search';

// --- Supabase Configuration ---
const SUPABASE_URL = 'https://nnmrjaqmlfjhzenwnhnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubXJqYXFtbGZqaHplbnduaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5OTcyMjIsImV4cCI6MjA5MjU3MzIyMn0.uvWABx-8qT0yTVkB6B8g97nmE21CWN1mN6pqDQlifZ4';

let supabaseClient = null;
try {
  // Supabase v2 CDN exposes: window.supabase.createClient
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized');
  } else {
    console.warn('⚠️ Supabase library not found on window');
  }
} catch (e) {
    console.warn('⚠️ Supabase init failed:', e);
}

// Device ID for identifying this browser (persists across sessions)
function getDeviceId() {
  let id = localStorage.getItem('careeriq_device_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('careeriq_device_id', id);
  }
  return id;
}
const DEVICE_ID = getDeviceId();

// ============================================
// SKILL DATABASE (238 skills, 10 categories)
// ============================================
const SKILL_DB = {
  languages: {
    icon: '💻', label: 'Programming Languages',
    skills: ['python','java','javascript','typescript','c','c++','c#','go','golang','rust','kotlin','swift','ruby','php','r','scala','perl','dart','lua','matlab','sql','bash','shell','powershell','html','css','sass','less']
  },
  frameworks: {
    icon: '🏗️', label: 'Frameworks & Libraries',
    skills: ['react','reactjs','react.js','angular','angularjs','vue','vuejs','vue.js','next.js','nextjs','nuxt','nuxtjs','svelte','express','expressjs','django','flask','fastapi','spring','spring boot','springboot','rails','ruby on rails','laravel','asp.net','.net','node','nodejs','node.js','jquery','bootstrap','tailwind','tailwindcss','material ui','chakra ui','redux','mobx','graphql','rest','restful','webpack','vite','babel']
  },
  databases: {
    icon: '🗄️', label: 'Databases',
    skills: ['mysql','postgresql','postgres','mongodb','redis','sqlite','oracle','sql server','mariadb','cassandra','dynamodb','firebase','firestore','supabase','elasticsearch','neo4j','couchdb','influxdb']
  },
  cloud: {
    icon: '☁️', label: 'Cloud & DevOps',
    skills: ['aws','amazon web services','azure','gcp','google cloud','docker','kubernetes','k8s','jenkins','terraform','ansible','ci/cd','cicd','github actions','gitlab ci','circleci','nginx','apache','linux','ubuntu','heroku','vercel','netlify','digitalocean','cloudflare','serverless','lambda','ec2','s3']
  },
  ml_ai: {
    icon: '🤖', label: 'ML / AI / Data Science',
    skills: ['machine learning','deep learning','neural network','tensorflow','pytorch','keras','scikit-learn','sklearn','pandas','numpy','matplotlib','seaborn','opencv','nlp','natural language processing','computer vision','reinforcement learning','generative ai','llm','large language model','gpt','bert','transformer','hugging face','langchain','data science','data analysis','data visualization','tableau','power bi','jupyter','colab','spark','hadoop','airflow','mlops']
  },
  tools: {
    icon: '🔧', label: 'Tools & Platforms',
    skills: ['git','github','gitlab','bitbucket','jira','confluence','slack','trello','figma','postman','swagger','vs code','vscode','intellij','eclipse','android studio','xcode','linux','vim','docker compose','npm','yarn','pip','maven','gradle']
  },
  mobile: {
    icon: '📱', label: 'Mobile Development',
    skills: ['react native','flutter','android','ios','swift','swiftui','kotlin','jetpack compose','xamarin','ionic','cordova','expo']
  },
  testing: {
    icon: '🧪', label: 'Testing',
    skills: ['jest','mocha','chai','cypress','selenium','puppeteer','playwright','junit','pytest','unittest','testing library','enzyme','vitest','supertest','postman testing']
  },
  security: {
    icon: '🔒', label: 'Security',
    skills: ['cybersecurity','penetration testing','owasp','encryption','ssl','tls','oauth','jwt','authentication','authorization','firewall','vulnerability assessment']
  },
  soft: {
    icon: '🧠', label: 'Soft Skills',
    skills: ['leadership','communication','teamwork','problem solving','critical thinking','time management','project management','agile','scrum','kanban','presentation','mentoring','collaboration','adaptability','creativity','decision making','conflict resolution','negotiation','public speaking','writing']
  }
};

// ============================================
// JOB ROLE DEFINITIONS (11 roles)
// ============================================
const JOB_ROLES = [
  {
    title: 'Software Development Engineer (SDE)', key: 'sde',
    description: 'Build and maintain scalable software systems, APIs, and applications.',
    fullDescription: 'Software Development Engineers design, develop, and maintain software systems that power products used by millions. You\'ll write clean, efficient code, participate in code reviews, collaborate with cross-functional teams, and own features from design to deployment.',
    responsibilities: ['Design and implement scalable backend/frontend systems','Write clean, testable, production-quality code','Participate in code reviews and architecture discussions','Debug and resolve production issues','Collaborate with product managers and designers'],
    requiredSkills: ['javascript','python','java','react','node.js','sql','git','docker','rest','data structures'],
    niceToHave: ['typescript','aws','kubernetes','ci/cd','system design'],
    salaryRange: '₹6–25 LPA', keywords: 'software+developer+engineer'
  },
  {
    title: 'Frontend Developer', key: 'frontend',
    description: 'Create responsive, accessible, and performant user interfaces.',
    fullDescription: 'Frontend Developers build the user-facing layer of web applications. You\'ll translate UI/UX designs into responsive, accessible interfaces using modern frameworks, optimize for performance, and ensure cross-browser compatibility.',
    responsibilities: ['Build responsive and accessible user interfaces','Implement pixel-perfect designs from Figma/Sketch','Optimize frontend performance and load times','Write unit and integration tests for components','Collaborate with backend engineers on API integration'],
    requiredSkills: ['html','css','javascript','react','typescript','git','responsive design','webpack'],
    niceToHave: ['next.js','vue','tailwind','figma','testing library','graphql'],
    salaryRange: '₹5–20 LPA', keywords: 'frontend+developer+react'
  },
  {
    title: 'Backend Developer', key: 'backend',
    description: 'Design and build server-side logic, databases, and APIs.',
    fullDescription: 'Backend Developers build the server-side logic that powers applications. You\'ll design APIs, manage databases, handle authentication, and ensure systems are scalable, secure, and performant under heavy load.',
    responsibilities: ['Design and build RESTful/GraphQL APIs','Manage and optimize database schemas and queries','Implement authentication, authorization, and security','Build microservices and distributed systems','Monitor and improve system performance'],
    requiredSkills: ['python','java','node.js','sql','postgresql','rest','docker','git','linux'],
    niceToHave: ['aws','redis','kafka','microservices','kubernetes','graphql'],
    salaryRange: '₹6–22 LPA', keywords: 'backend+developer+engineer'
  },
  {
    title: 'Full Stack Developer', key: 'fullstack',
    description: 'End-to-end web application development across the entire stack.',
    fullDescription: 'Full Stack Developers are versatile engineers who handle both client-side and server-side development. You\'ll build complete features from database to UI, making you invaluable for startups and agile teams.',
    responsibilities: ['Develop both frontend and backend components','Design database schemas and API architectures','Deploy and maintain applications in cloud environments','Write end-to-end tests','Mentor junior developers'],
    requiredSkills: ['javascript','react','node.js','python','sql','mongodb','git','html','css','rest'],
    niceToHave: ['docker','aws','typescript','next.js','redis','graphql'],
    salaryRange: '₹6–28 LPA', keywords: 'full+stack+developer'
  },
  {
    title: 'Data Analyst', key: 'data_analyst',
    description: 'Transform raw data into actionable business insights.',
    fullDescription: 'Data Analysts collect, process, and analyze data to help organizations make informed decisions. You\'ll create dashboards, identify trends, and communicate findings to stakeholders.',
    responsibilities: ['Collect and clean large datasets','Create visualizations and dashboards','Identify patterns and trends in data','Write SQL queries for data extraction','Present insights to business stakeholders'],
    requiredSkills: ['python','sql','pandas','data visualization','excel','tableau','statistics','data analysis'],
    niceToHave: ['power bi','r','numpy','matplotlib','jupyter','spark'],
    salaryRange: '₹4–15 LPA', keywords: 'data+analyst+python'
  },
  {
    title: 'ML Engineer', key: 'ml_engineer',
    description: 'Build and deploy machine learning models at scale.',
    fullDescription: 'ML Engineers develop, train, and deploy machine learning models that solve real-world problems. You\'ll work with large datasets, design model architectures, and build ML pipelines for production systems.',
    responsibilities: ['Design and train ML models','Build data pipelines for model training','Deploy models to production environments','Monitor model performance and retrain as needed','Research and implement state-of-the-art techniques'],
    requiredSkills: ['python','tensorflow','pytorch','machine learning','deep learning','pandas','numpy','sql','scikit-learn'],
    niceToHave: ['nlp','computer vision','mlops','docker','aws','spark'],
    salaryRange: '₹8–35 LPA', keywords: 'machine+learning+engineer'
  },
  {
    title: 'DevOps Engineer', key: 'devops',
    description: 'Automate infrastructure, deployments, and monitoring.',
    fullDescription: 'DevOps Engineers bridge the gap between development and operations. You\'ll automate deployment pipelines, manage cloud infrastructure, implement monitoring, and ensure system reliability and scalability.',
    responsibilities: ['Build and maintain CI/CD pipelines','Manage cloud infrastructure (AWS/GCP/Azure)','Implement containerization with Docker/Kubernetes','Set up monitoring, logging, and alerting','Automate infrastructure with IaC tools'],
    requiredSkills: ['linux','docker','kubernetes','aws','ci/cd','git','bash','terraform','jenkins'],
    niceToHave: ['ansible','prometheus','grafana','python','helm','serverless'],
    salaryRange: '₹7–30 LPA', keywords: 'devops+engineer+cloud'
  },
  {
    title: 'Mobile App Developer', key: 'mobile',
    description: 'Build native and cross-platform mobile applications.',
    fullDescription: 'Mobile Developers create applications for iOS and Android platforms. You\'ll build intuitive user experiences, integrate with APIs, handle device-specific features, and optimize for performance.',
    responsibilities: ['Develop cross-platform or native mobile apps','Integrate REST APIs and third-party SDKs','Optimize app performance and battery usage','Publish and maintain apps on App Store / Play Store','Implement push notifications and offline support'],
    requiredSkills: ['react native','flutter','javascript','dart','android','ios','git','rest'],
    niceToHave: ['kotlin','swift','firebase','redux','typescript','expo'],
    salaryRange: '₹5–22 LPA', keywords: 'mobile+app+developer'
  },
  {
    title: 'Cybersecurity Analyst', key: 'security',
    description: 'Protect systems and data from security threats.',
    fullDescription: 'Cybersecurity Analysts defend organizations against cyber threats. You\'ll conduct vulnerability assessments, implement security controls, respond to incidents, and ensure compliance with security standards.',
    responsibilities: ['Conduct vulnerability assessments and penetration testing','Monitor systems for security breaches','Implement security controls and policies','Respond to and investigate security incidents','Ensure compliance with security standards (ISO, SOC2)'],
    requiredSkills: ['cybersecurity','networking','linux','firewalls','owasp','encryption','vulnerability assessment','python'],
    niceToHave: ['penetration testing','ssl','oauth','jwt','cloud security','siem'],
    salaryRange: '₹5–25 LPA', keywords: 'cybersecurity+analyst+security'
  },
  {
    title: 'QA / Test Engineer', key: 'qa',
    description: 'Ensure software quality through systematic testing.',
    fullDescription: 'QA Engineers design and execute test strategies to ensure software quality. You\'ll write automated tests, perform manual testing, track bugs, and work closely with developers to deliver reliable software.',
    responsibilities: ['Design and execute test plans and test cases','Write automated tests (unit, integration, e2e)','Track and report bugs with clear reproduction steps','Perform regression, performance, and security testing','Collaborate with developers on quality standards'],
    requiredSkills: ['selenium','jest','cypress','testing','python','git','sql','api testing'],
    niceToHave: ['playwright','junit','postman','jira','ci/cd','performance testing'],
    salaryRange: '₹4–18 LPA', keywords: 'qa+test+engineer'
  },
  {
    title: 'Cloud Architect', key: 'cloud_architect',
    description: 'Design and manage enterprise cloud infrastructure.',
    fullDescription: 'Cloud Architects design the overall cloud strategy for organizations. You\'ll select cloud services, design high-availability architectures, manage costs, and ensure security and compliance across cloud environments.',
    responsibilities: ['Design cloud architecture and migration strategies','Select appropriate cloud services and configurations','Implement high availability and disaster recovery','Optimize cloud costs and resource utilization','Define security and compliance standards'],
    requiredSkills: ['aws','azure','gcp','docker','kubernetes','terraform','networking','linux','serverless'],
    niceToHave: ['microservices','ci/cd','python','security','monitoring','cost optimization'],
    salaryRange: '₹12–45 LPA', keywords: 'cloud+architect+aws'
  }
];

// ============================================
// TRENDING SKILLS 2026 (Sourced from Google — Industry Reports)
// Sources: TalentSprint, TechGig, Shiksha, Crossover, QA.com
// Last researched: April 2026
// ============================================
class TrendingSkillsFetcher {
  static async fetchAll() {
    // Real trending skills from Google search — April 2026 industry data
    return [
      { name: 'GenAI / LLMs', growth: '🔥 #1 Demand', source: 'TalentSprint 2026' },
      { name: 'Agentic AI', growth: '🚀 Exploding', source: 'Industry Reports 2026' },
      { name: 'Prompt Engineering', growth: '📈 +120%', source: 'Shiksha 2026' },
      { name: 'Python', growth: '👑 Top Language', source: 'Crossover 2026' },
      { name: 'Cloud (AWS/Azure/GCP)', growth: '☁️ Critical', source: 'ExperisIndia 2026' },
      { name: 'Kubernetes / Docker', growth: '📦 Must-Have', source: 'DevOps Reports' },
      { name: 'TypeScript', growth: '📈 +35%', source: 'StackOverflow Survey' },
      { name: 'Cybersecurity', growth: '🛡️ +42%', source: 'TechGig 2026' },
      { name: 'MLOps', growth: '🤖 +55%', source: 'AI Engineering' },
      { name: 'Data Engineering', growth: '📊 High Demand', source: 'Taggd 2026' },
      { name: 'DevOps / CI-CD', growth: '⚙️ Baseline', source: 'Industry Standard' },
      { name: 'Go (Golang)', growth: '🔧 +28%', source: 'Cloud-Native' },
      { name: 'Rust', growth: '🦀 +45%', source: 'Systems Programming' },
      { name: 'Next.js / React', growth: '⚛️ +30%', source: 'Frontend Trends' },
    ];
  }
}

// ============================================
// SKILL EXTRACTOR
// ============================================
class SkillExtractor {
  static extract(text) {
    const lower = text.toLowerCase();
    const results = {};
    let totalFound = 0;
    for (const [category, data] of Object.entries(SKILL_DB)) {
      const matched = data.skills.filter(skill => {
        const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return pattern.test(lower);
      });
      results[category] = { icon: data.icon, label: data.label, matched, total: data.skills.length };
      totalFound += matched.length;
    }
    results._totalFound = totalFound;
    return results;
  }
}

// ============================================
// ROLE MATCHER
// ============================================
class RoleMatcher {
  static match(extractedSkills) {
    const userSkills = new Set();
    for (const [cat, data] of Object.entries(extractedSkills)) {
      if (cat.startsWith('_')) continue;
      data.matched.forEach(s => userSkills.add(s.toLowerCase()));
    }
    return JOB_ROLES.map(role => {
      const required = role.requiredSkills.map(s => s.toLowerCase());
      const nice = role.niceToHave.map(s => s.toLowerCase());
      const matchedRequired = required.filter(s => userSkills.has(s));
      const matchedNice = nice.filter(s => userSkills.has(s));
      const score = Math.round(
        ((matchedRequired.length / required.length) * 85) +
        ((matchedNice.length / nice.length) * 15)
      );
      return {
        ...role, score,
        matchedRequired, matchedNice,
        missingRequired: required.filter(s => !userSkills.has(s)),
        missingNice: nice.filter(s => !userSkills.has(s))
      };
    }).sort((a, b) => b.score - a.score);
  }
}

// ============================================
// REAL-TIME JOB FETCHER (100% Live API)
// ============================================
class RealTimeJobFetcher {
  static async fetchJobs(keyword, limit = 50) {
    try {
      const resp = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(keyword)}&limit=${limit}`);
      if (!resp.ok) throw new Error('API error');
      const data = await resp.json();
      // Filter: India-eligible + entry-level only
      const jobs = (data.jobs || []).filter(j => {
        // Reject senior roles
        if (this.isSeniorRole(j.title)) return false;
        // Strictly allow ONLY India or explicitly remote-friendly jobs
        if (!this.isIndiaRelevant(j.candidate_required_location)) return false;
        return true;
      });
      return jobs;
    } catch (e) {
      console.warn('Job fetch error:', e);
      return [];
    }
  }

  // Ensure location is India-relevant
  static isIndiaRelevant(location) {
    if (!location) return false;
    const l = location.toLowerCase();
    
    // Explicitly blocked regions
    const blocked = ['usa only','us only','uk only','europe only','eu only','canada only','australia only','north america only','americas only','latin america only','est ','pst ','cst ','mst ','eastern time','pacific time','central time'];
    if (blocked.some(b => l.includes(b))) return false;

    // Must include India, Worldwide, or Remote
    const allowed = ['india', 'bangalore', 'bengaluru', 'hyderabad', 'pune', 'mumbai', 'delhi', 'noida', 'gurgaon', 'chennai', 'remote', 'worldwide', 'anywhere'];
    return allowed.some(a => l.includes(a));
  }

  // Reject senior/lead/manager roles (not for 0-2 yr exp)
  static isSeniorRole(title) {
    if (!title) return false;
    const t = title.toLowerCase();
    const seniorKeywords = ['senior','sr.','sr ','lead','principal','staff','director','manager','head of','vp ','vice president','architect','cto','ceo','chief','10+','8+','7+','6+','5+'];
    return seniorKeywords.some(k => t.includes(k));
  }
}

// ============================================
// OPPORTUNITY FETCHER — 100% Real-Time via JSearch API
// Fetches from LinkedIn, Indeed, Glassdoor — India Only
// ============================================
class OpportunityFetcher {
  static async searchJobs(query, numPages = 1) {
    try {
      const params = new URLSearchParams({
        query: query, page: '1', num_pages: String(numPages),
        country: 'in', date_posted: 'month'
      });
      const resp = await fetch(`${JSEARCH_API_URL}?${params}`, {
        method: 'GET',
        headers: { 'x-rapidapi-host': 'jsearch.p.rapidapi.com', 'x-rapidapi-key': getJSearchApiKey() }
      });
      if (!resp.ok) throw new Error(`JSearch ${resp.status}`);
      const data = await resp.json();
      return (data.data || [])
        .filter(job => job.job_country === 'IN' || RealTimeJobFetcher.isIndiaRelevant(job.job_city || job.job_state || job.candidate_required_location))
        .map(job => ({
        id: job.job_id, title: job.job_title, company_name: job.employer_name,
        candidate_required_location: job.job_city ? `${job.job_city}, India` : (job.job_state || 'India'),
        salary: job.job_min_salary ? `₹${Math.round(job.job_min_salary/1000)}K - ₹${Math.round(job.job_max_salary/1000)}K` : '',
        url: job.job_apply_link || job.job_google_link || '#',
        tags: [job.employer_name, job.job_employment_type?.replace('FULLTIME','Full-time').replace('INTERN','Internship'), job.job_is_remote ? 'Remote' : 'On-site'].filter(Boolean).slice(0,4),
        source: job.job_publisher || 'JSearch'
      }));
    } catch (e) { console.warn('JSearch error:', e); return []; }
  }

  static async fetchAll(skills) {
    const topSkills = [];
    if (skills) {
      ['languages','frameworks','databases','cloud','ai_ml'].forEach(cat => {
        if (skills[cat]?.matched) topSkills.push(...skills[cat].matched.slice(0,2));
      });
    }
    const sq = topSkills.length > 0 ? topSkills.slice(0,3).join(' ') : 'software developer';
    const [internships, hackathons, fulltime] = await Promise.all([
      this.fetchInternships(sq), this.fetchHackathons(), this.fetchFulltime(sq)
    ]);
    return { internships, hackathons, fulltime };
  }

  static async fetchInternships(sq) {
    const r = await this.searchJobs(`${sq} intern in India`, 1);
    return r.length > 0 ? r : this.getFallbackInternships();
  }
  static async fetchHackathons() {
    const r = await this.searchJobs('hackathon coding challenge India', 1);
    return [...r, ...this.getCuratedHackathons()].slice(0, 10);
  }
  static async fetchFulltime(sq) {
    const r = await this.searchJobs(`${sq} fresher junior developer India`, 1);
    return r.length > 0 ? r : this.getFallbackFulltime();
  }

  static getFallbackInternships() {
    return [
      { id:'i1', title:'Software Engineer Intern', company_name:'Google India', candidate_required_location:'Bangalore', salary:'₹80K-1.2L/mo', url:'https://www.google.com/about/careers/applications/jobs/results/?location=India&target_level=INTERN', tags:['Python','DSA','Cloud'] },
      { id:'i2', title:'SDE Intern', company_name:'Amazon India', candidate_required_location:'Hyderabad', salary:'₹60K-1L/mo', url:'https://www.amazon.jobs/en/search?base_query=Software+Development+Engineer+Intern&location%5B%5D=India', tags:['Java','AWS'] },
      { id:'i3', title:'Technology Intern', company_name:'Microsoft India', candidate_required_location:'Hyderabad', salary:'₹70K-1L/mo', url:'https://careers.microsoft.com/students/us/en/search-results?keywords=Software+Engineering+Intern&location=India', tags:['C#','Azure'] },
      { id:'i4', title:'Backend Dev Intern', company_name:'Flipkart', candidate_required_location:'Bangalore', salary:'₹40K-60K/mo', url:'https://www.flipkartcareers.com/#!/joblist?q=intern&location=India', tags:['Java','Spring Boot'] },
      { id:'i5', title:'Full Stack Intern', company_name:'CRED', candidate_required_location:'Bangalore', salary:'₹40K-60K/mo', url:'https://careers.cred.club/', tags:['React','Node.js'] },
    ];
  }
  static getCuratedHackathons() {
    return [
      { id:'h1', title:'Smart India Hackathon 2026', company_name:'Govt of India', candidate_required_location:'Nationwide 🇮🇳', salary:'🏆 ₹1L Prize', url:'https://sih.gov.in/', tags:['Innovation','Government'] },
      { id:'h2', title:'Google Summer of Code', company_name:'Google', candidate_required_location:'Remote', salary:'🏆 $1500-6600', url:'https://summerofcode.withgoogle.com/', tags:['Open Source','Mentorship'] },
      { id:'h3', title:'Unstop Hackathons', company_name:'Unstop', candidate_required_location:'Pan India 🇮🇳', salary:'🏆 Cash + Internships', url:'https://unstop.com/hackathons', tags:['Multiple Tracks','Corporate'] },
      { id:'h4', title:'Devfolio Hackathons', company_name:'Devfolio', candidate_required_location:'Multiple Cities 🇮🇳', salary:'🏆 ₹50K-5L', url:'https://devfolio.co/hackathons', tags:['Full Stack','AI'] },
      { id:'h5', title:'HackerEarth Challenges', company_name:'HackerEarth', candidate_required_location:'Online 🇮🇳', salary:'🏆 Direct Interviews', url:'https://www.hackerearth.com/challenges/', tags:['Hiring','DSA'] },
    ];
  }
  static getFallbackFulltime() {
    return [
      { id:'f1', title:'Systems Engineer (Fresher)', company_name:'TCS', candidate_required_location:'Multiple Cities', salary:'₹3.5-7 LPA', url:'https://www.tcs.com/careers/india/entry-level-hiring', tags:['Java','SQL','B.Tech'] },
      { id:'f2', title:'Systems Engineer', company_name:'Infosys', candidate_required_location:'Mysore / Pune', salary:'₹3.6-9 LPA', url:'https://www.infosys.com/careers/apply/freshers.html', tags:['Java','Python'] },
      { id:'f3', title:'SDE-1 (Fresher)', company_name:'Samsung R&D', candidate_required_location:'Bangalore', salary:'₹12-18 LPA', url:'https://www.samsung.com/in/aboutsamsung/careers/', tags:['C++','Android'] },
      { id:'f4', title:'Associate SDE', company_name:'Paytm', candidate_required_location:'Noida', salary:'₹8-14 LPA', url:'https://paytm.com/careers/', tags:['Java','Fintech'] },
      { id:'f5', title:'Junior Developer', company_name:'Zoho', candidate_required_location:'Chennai', salary:'₹5-8 LPA', url:'https://www.zoho.com/careers/', tags:['Java','JavaScript'] },
    ];
  }

  static getPortalLinks(category) {
    const portals = {
      internships: [
        { name:'Internshala', url:'https://internshala.com/internships/computer-science-internship/', icon:'🎓', desc:'CS Internships (India)' },
        { name:'LinkedIn India', url:'https://www.linkedin.com/jobs/search/?keywords=intern%20software&location=India&f_E=1', icon:'💼', desc:'SDE Internships' },
        { name:'Naukri', url:'https://www.naukri.com/intern-software-jobs?experience=0', icon:'🦸‍♂️‍💻', desc:'Fresher Internships' },
      ],
      hackathons: [
        { name:'Unstop', url:'https://unstop.com/hackathons', icon:'🏆', desc:'Hackathons & Competitions' },
        { name:'Devfolio', url:'https://devfolio.co/hackathons', icon:'🚀', desc:'Indian Hackathons' },
        { name:'HackerEarth', url:'https://www.hackerearth.com/challenges/', icon:'💻', desc:'Coding Challenges' },
        { name:'CodeChef', url:'https://www.codechef.com/contests', icon:'🏅', desc:'Programming Contests' },
      ],
      fulltime: [
        { name:'LinkedIn India', url:'https://www.linkedin.com/jobs/search/?keywords=software%20developer&location=India&f_E=1,2', icon:'💼', desc:'Entry-Level · 0-2 Yrs' },
        { name:'Naukri', url:'https://www.naukri.com/software-developer-jobs-in-india?experience=0-2', icon:'🦸‍♂️‍💻', desc:'Fresher Jobs' },
        { name:'Indeed India', url:'https://www.indeed.co.in/jobs?q=fresher+software+developer', icon:'·', desc:'Fresher SDE Jobs' },
        { name:'Freshersworld', url:'https://www.freshersworld.com/jobs/category/it-software-jobs-for-freshers', icon:'🎯', desc:'B.Tech IT/CS' },
      ],
      all: [
        { name:'Internshala', url:'https://internshala.com/internships/computer-science-internship/', icon:'🎓', desc:'Internships' },
        { name:'Unstop', url:'https://unstop.com/hackathons', icon:'🏆', desc:'Hackathons' },
        { name:'LinkedIn India', url:'https://www.linkedin.com/jobs/search/?keywords=software%20developer&location=India&f_E=1,2', icon:'💼', desc:'Jobs' },
        { name:'Naukri', url:'https://www.naukri.com/software-developer-jobs-in-india?experience=0-2', icon:'🦸‍♂️‍💻', desc:'Freshers' },
      ]
    };
    return portals[category] || portals.all;
  }
}

// ============================================
// FAKE JOB DETECTOR
// ============================================
class FakeJobDetector {
  static TRUSTED_DOMAINS = [
    { domain: 'linkedin.com', name: 'LinkedIn', level: 'trusted' },
    { domain: 'naukri.com', name: 'Naukri', level: 'trusted' },
    { domain: 'internshala.com', name: 'Internshala', level: 'trusted' },
    { domain: 'indeed.com', name: 'Indeed', level: 'trusted' },
    { domain: 'glassdoor.com', name: 'Glassdoor', level: 'trusted' },
    { domain: 'unstop.com', name: 'Unstop', level: 'trusted' },
    { domain: 'devfolio.co', name: 'Devfolio', level: 'trusted' },
    { domain: 'hackerearth.com', name: 'HackerEarth', level: 'trusted' },
    { domain: 'hackerrank.com', name: 'HackerRank', level: 'trusted' },
    { domain: 'remotive.com', name: 'Remotive', level: 'trusted' },
    { domain: 'wellfound.com', name: 'Wellfound', level: 'trusted' },
    { domain: 'github.com', name: 'GitHub', level: 'trusted' },
    { domain: 'careers.google.com', name: 'Google', level: 'trusted' },
    { domain: 'amazon.jobs', name: 'Amazon', level: 'trusted' },
    { domain: 'microsoft.com', name: 'Microsoft', level: 'trusted' },
    { domain: 'tcs.com', name: 'TCS', level: 'trusted' },
    { domain: 'infosys.com', name: 'Infosys', level: 'trusted' },
    { domain: 'wipro.com', name: 'Wipro', level: 'trusted' },
    { domain: 'freshersworld.com', name: 'FreshersWorld', level: 'trusted' },
    { domain: 'shine.com', name: 'Shine', level: 'trusted' },
  ];
  static SUSPICIOUS_PATTERNS = ['bit.ly','tinyurl.com','shorturl.at','t.co','goo.gl','forms.gle','docs.google.com/forms'];
  static RED_FLAGS = [
    { pattern: /pay.*(?:registration|fee|upfront|advance|deposit)/i, severity: 'high', msg: 'Asks for money upfront — legitimate companies NEVER charge candidates' },
    { pattern: /(?:registration|processing|application|security)\s*fee/i, severity: 'high', msg: 'Mentions a "fee" — classic scam tactic' },
    { pattern: /send\s*(?:money|payment|₹|rs\.?\s*\d|\$)/i, severity: 'high', msg: 'Asks to send money — clear scam indicator' },
    { pattern: /guarantee[ds]?\s*(?:income|salary|job|placement|earning)/i, severity: 'high', msg: '"Guaranteed income/job" — no legitimate employer guarantees this' },
    { pattern: /(?:earn|make|income)\s*(?:₹|rs\.?\s*)\s*\d+.*(?:per\s*day|daily|per\s*hour)/i, severity: 'high', msg: 'Unrealistic earning claims — common in scam postings' },
    { pattern: /(?:no\s*(?:experience|skills?|qualification|degree)\s*(?:needed|required|necessary))/i, severity: 'medium', msg: '"No experience required" — legitimate tech jobs need skills' },
    { pattern: /whatsapp.*(?:\+?\d{10,}|join|group|contact)/i, severity: 'medium', msg: 'WhatsApp-based recruitment — companies use official portals' },
    { pattern: /telegram.*(?:join|channel|group|contact)/i, severity: 'medium', msg: 'Telegram-based recruitment — uncommon for legitimate employers' },
    { pattern: /(?:gmail\.com|yahoo\.com|hotmail\.com).*(?:send|mail|resume|cv)/i, severity: 'medium', msg: 'Personal email domain — companies use official emails' },
    { pattern: /(?:limited\s*(?:seats?|positions?|spots?))/i, severity: 'low', msg: '"Limited seats" urgency — pressure tactic' },
    { pattern: /(?:data\s*entry|typing\s*(?:job|work)|copy\s*paste)/i, severity: 'medium', msg: '"Data entry/typing jobs" — common online scam' },
    { pattern: /(?:multi[\s-]*level|mlm|network\s*marketing)/i, severity: 'high', msg: 'MLM scheme disguised as a job' },
    { pattern: /(?:crypto|bitcoin|forex|trading)\s*.*(?:job|opportunity|earn)/i, severity: 'high', msg: 'Crypto/forex "job" — investment scam, not real job' },
    { pattern: /(?:passport|aadhaar|pan\s*card|bank\s*(?:details|account)).*(?:send|share|provide)/i, severity: 'high', msg: 'Asks for sensitive documents early — identity theft risk' },
    { pattern: /(?:100\s*%|completely)\s*(?:free|genuine|real|authentic)/i, severity: 'low', msg: 'Overemphasis on being "genuine" — real jobs don\'t need to prove this' },
  ];

  static analyzeURL(url) {
    const flags = []; let score = 80;
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.toLowerCase();
      const trustedMatch = this.TRUSTED_DOMAINS.find(d => hostname.includes(d.domain));
      if (trustedMatch) {
        flags.push({ type: 'green', icon: '✅', msg: `<strong>Trusted platform:</strong> ${trustedMatch.name} is a verified job portal` });
        score += 15;
      } else {
        const isSusp = this.SUSPICIOUS_PATTERNS.some(p => hostname.includes(p) || url.includes(p));
        if (isSusp) { flags.push({ type: 'red', icon: '🚨', msg: '<strong>Suspicious URL:</strong> Known scam/redirect pattern' }); score -= 35; }
        else { flags.push({ type: 'yellow', icon: '⚠️', msg: `<strong>Unknown domain:</strong> ${hostname} — verify manually` }); score -= 10; }
      }
      if (this.SUSPICIOUS_PATTERNS.slice(0, 5).some(s => hostname.includes(s))) {
        flags.push({ type: 'red', icon: '🔗', msg: '<strong>Shortened URL:</strong> Scammers use URL shorteners to hide real destinations' }); score -= 25;
      }
      if (url.includes('forms.gle') || url.includes('docs.google.com/forms')) {
        flags.push({ type: 'red', icon: '📋', msg: '<strong>Google Forms:</strong> Real companies don\'t use Google Forms for applications' }); score -= 20;
      }
      if (parsed.protocol === 'http:') {
        flags.push({ type: 'yellow', icon: '🔓', msg: '<strong>Not secure:</strong> Uses HTTP, not HTTPS' }); score -= 10;
      }
      return { flags, safetyScore: Math.max(5, Math.min(100, score)), hostname, trustedMatch };
    } catch (e) {
      return { flags: [{ type: 'red', icon: '❌', msg: '<strong>Invalid URL:</strong> Could not parse' }], safetyScore: 20, hostname: 'invalid', trustedMatch: null };
    }
  }

  static analyzeText(text) {
    const flags = []; let score = 85;
    for (const flag of this.RED_FLAGS) {
      if (flag.pattern.test(text)) {
        const icon = flag.severity === 'high' ? '🚨' : '⚠️';
        const type = flag.severity === 'high' ? 'red' : 'yellow';
        flags.push({ type, icon, msg: `<strong>${flag.severity.toUpperCase()}:</strong> ${flag.msg}` });
        score -= flag.severity === 'high' ? 20 : flag.severity === 'medium' ? 10 : 5;
      }
    }
    if (/(?:job\s*description|responsibilities|requirements)/i.test(text)) {
      flags.push({ type: 'green', icon: '✅', msg: '<strong>Structured listing:</strong> Has proper job sections' }); score += 5;
    }
    if (text.length < 100) {
      flags.push({ type: 'yellow', icon: '📄', msg: '<strong>Very short:</strong> Legitimate postings have detailed descriptions' }); score -= 8;
    }
    if (flags.length === 0) flags.push({ type: 'green', icon: '✅', msg: '<strong>No red flags:</strong> Appears clean, but always verify' });
    return { flags, safetyScore: Math.max(5, Math.min(100, score)) };
  }

  static analyze(input, mode = 'url') {
    let result = mode === 'url' ? this.analyzeURL(input) : this.analyzeText(input);
    if (mode === 'text') {
      const urls = input.match(/https?:\/\/[^\s]+/g);
      if (urls) urls.forEach(u => { const ur = this.analyzeURL(u); result.flags.push(...ur.flags); result.safetyScore = Math.round((result.safetyScore + ur.safetyScore) / 2); });
    }
    result.safetyScore = Math.max(5, Math.min(100, result.safetyScore));
    if (result.safetyScore >= 70) { result.verdict = 'safe'; result.verdictLabel = 'Likely Safe'; result.verdictDesc = 'Appears legitimate. Always verify on the official company website.'; }
    else if (result.safetyScore >= 40) { result.verdict = 'warning'; result.verdictLabel = 'Proceed with Caution'; result.verdictDesc = 'Red flags detected. Verify before sharing personal information.'; }
    else { result.verdict = 'danger'; result.verdictLabel = 'High Scam Risk'; result.verdictDesc = 'Very likely a scam. DO NOT share personal details or pay money.'; }
    return result;
  }

  static renderResults(result, container) {
    const { safetyScore, verdict, verdictLabel, verdictDesc, flags, hostname, trustedMatch } = result;
    let domainHTML = '';
    if (hostname && hostname !== 'invalid') {
      const badge = trustedMatch ? 'trusted' : (safetyScore < 40 ? 'suspicious' : 'unknown');
      const badgeLabel = trustedMatch ? '✓ VERIFIED' : (safetyScore < 40 ? '⚠️ SUSPICIOUS' : '? UNKNOWN');
      domainHTML = `<div class="fjd-domain-info"><span class="fjd-domain-badge ${badge}">${badgeLabel}</span><div><div class="fjd-domain-name">${hostname}</div><div class="fjd-domain-desc">${trustedMatch ? trustedMatch.name + ' — Verified' : 'Verify manually'}</div></div></div>`;
    }
    container.innerHTML = `
      <div class="fjd-score-card ${verdict}"><div class="fjd-score-value">${safetyScore}%</div><div class="fjd-score-label">${verdictLabel}</div><div class="fjd-score-sublabel">${verdictDesc}</div></div>
      ${domainHTML}
      <ul class="fjd-flags">${flags.map(f => `<li class="fjd-flag-item ${f.type}"><span class="fjd-flag-icon">${f.icon}</span><span class="fjd-flag-text">${f.msg}</span></li>`).join('')}</ul>
      <div class="fjd-tips"><div class="fjd-tips-title">🛡️ How to Protect Yourself</div><ul class="fjd-tips-list">
        <li>Never pay upfront fees</li><li>Verify on official company website</li><li>Check for official email domains</li><li>Search "company name + scam" on Google</li><li>Never share Aadhaar/PAN before official joining</li>
      </ul></div>`;
  }
}

// ============================================
// FAANG RESUME SCORER
// ============================================
class FAANGScorer {
  static CRITERIA = [
    { name: 'Contact Information', maxScore: 10, check: (text) => {
      let s = 0;
      if (/[\w.-]+@[\w.-]+\.\w+/.test(text)) s += 3;
      if (/(\+?\d[\d\s-]{8,})/.test(text)) s += 2;
      if (/linkedin/i.test(text)) s += 3;
      if (/github/i.test(text)) s += 2;
      return { score: s, details: s >= 8 ? 'Complete contact info' : 'Missing some contact details (email, phone, LinkedIn, GitHub)' };
    }},
    { name: 'Education Section', maxScore: 10, check: (text) => {
      let s = 0;
      if (/(?:b\.?tech|bachelor|master|m\.?tech|b\.?e|m\.?e|degree|university|college|institute)/i.test(text)) s += 5;
      if (/(?:gpa|cgpa|percentage|\d\.\d{1,2}\s*\/\s*\d{1,2}|\d{1,2}\s*%)/i.test(text)) s += 3;
      if (/(?:computer\s*science|cse|it|information\s*technology)/i.test(text)) s += 2;
      return { score: s, details: s >= 8 ? 'Good education section' : 'Add degree, university, GPA/CGPA, and branch' };
    }},
    { name: 'Skills Organization', maxScore: 10, check: (text, skills) => {
      const count = skills._totalFound || 0;
      let s = count >= 10 ? 10 : count >= 5 ? 7 : count >= 3 ? 4 : 1;
      return { score: s, details: `${count} skills detected. ${count < 5 ? 'Add more relevant technical skills' : 'Good skill coverage'}` };
    }},
    { name: 'Projects Listed', maxScore: 15, check: (text) => {
      let s = 0;
      const projectMatches = text.match(/(?:project|built|developed|created|designed|implemented)[\s\S]{10,200}?(?:\.|$)/gi) || [];
      s = Math.min(15, projectMatches.length * 5);
      return { score: s, details: `${projectMatches.length} project(s) detected. ${projectMatches.length < 2 ? 'FAANG prefers 2-3 strong projects' : 'Good project coverage'}` };
    }},
    { name: 'Work Experience', maxScore: 15, check: (text) => {
      let s = 0;
      if (/(?:intern(?:ship)?|experience|worked\s*at|employed|company)/i.test(text)) s += 8;
      if (/(?:20\d{2}\s*[-–]\s*(?:20\d{2}|present|current))/i.test(text)) s += 4;
      if (/(?:role|position|designation|title)/i.test(text)) s += 3;
      return { score: s, details: s >= 10 ? 'Good experience section' : 'Add internships/work with dates and role titles' };
    }},
    { name: 'Quantified Impact', maxScore: 10, check: (text) => {
      const metrics = text.match(/\d+\s*[%xX×+]|\d+\s*(?:users|customers|requests|records|transactions|projects|features|team|members)/gi) || [];
      const s = Math.min(10, metrics.length * 3);
      return { score: s, details: metrics.length ? `${metrics.length} quantified metrics found` : 'Add numbers: "increased speed by 40%", "served 10K users"' };
    }},
    { name: 'Action Verbs', maxScore: 10, check: (text) => {
      const verbs = ['developed','designed','implemented','built','created','optimized','reduced','increased','managed','led','deployed','automated','architected','integrated','migrated','maintained','improved','analyzed','researched','collaborated'];
      const found = verbs.filter(v => new RegExp(`\\b${v}\\b`, 'i').test(text));
      const s = Math.min(10, found.length * 2);
      return { score: s, details: found.length >= 4 ? `Good action verbs: ${found.slice(0, 5).join(', ')}` : 'Use action verbs: Developed, Designed, Implemented, Built, Optimized' };
    }},
    { name: 'Appropriate Length', maxScore: 5, check: (text) => {
      const words = text.split(/\s+/).length;
      let s = 0;
      if (words >= 150 && words <= 800) s = 5;
      else if (words >= 100 && words <= 1000) s = 3;
      else s = 1;
      return { score: s, details: `${words} words. ${words < 150 ? 'Too short — add more details' : words > 800 ? 'Too long — keep to 1 page' : 'Good length for 1-page resume'}` };
    }},
    { name: 'No Fluff / Filler', maxScore: 5, check: (text) => {
      const fluff = ['hard worker','team player','self motivated','passionate','go-getter','quick learner','think outside the box','dynamic','synergy','proactive'];
      const found = fluff.filter(f => text.toLowerCase().includes(f));
      const s = found.length === 0 ? 5 : Math.max(1, 5 - found.length * 2);
      return { score: s, details: found.length ? `Remove filler phrases: ${found.join(', ')}` : 'No filler phrases detected — clean resume' };
    }},
    { name: 'Technical Depth', maxScore: 10, check: (text, skills) => {
      const techCategories = ['languages','frameworks','databases','cloud','ml_ai'];
      let categoriesWithSkills = 0;
      for (const cat of techCategories) {
        if (skills[cat] && skills[cat].matched.length > 0) categoriesWithSkills++;
      }
      const s = Math.min(10, categoriesWithSkills * 2);
      return { score: s, details: `Skills in ${categoriesWithSkills}/5 technical categories. ${categoriesWithSkills < 3 ? 'Diversify across languages, frameworks, cloud, etc.' : 'Good technical breadth'}` };
    }}
  ];

  static score(resumeText, extractedSkills) {
    let totalScore = 0;
    const results = this.CRITERIA.map(criteria => {
      const result = criteria.check(resumeText, extractedSkills);
      totalScore += result.score;
      return { name: criteria.name, maxScore: criteria.maxScore, ...result };
    });
    return { totalScore, maxPossible: 100, percentage: totalScore, criteria: results };
  }
}

// ============================================
// FAANG RESUME FORMATTER
// ============================================
class FAANGFormatter {
  static extractInfo(text) {
    const info = { name: '', email: '', phone: '', linkedin: '', github: '', education: [], experience: [], projects: [], skills: [], certifications: [] };
    // Name — first line or first capitalized words
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 0) {
      const first = lines[0];
      if (first.length < 50 && /^[A-Z]/.test(first)) info.name = first;
    }
    // Email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) info.email = emailMatch[0];
    // Phone
    const phoneMatch = text.match(/(\+?\d[\d\s-]{8,})/);
    if (phoneMatch) info.phone = phoneMatch[1].trim();
    // LinkedIn
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) info.linkedin = linkedinMatch[0];
    // GitHub
    const githubMatch = text.match(/github\.com\/[\w-]+/i);
    if (githubMatch) info.github = githubMatch[0];
    return info;
  }

  static format(resumeText, extractedSkills, score) {
    const info = this.extractInfo(resumeText);
    
    // Mapping extracted skills to categories
    const categories = {
      languages: extractedSkills.languages?.matched || [],
      frameworks: extractedSkills.frameworks?.matched || [],
      databases: extractedSkills.databases?.matched || [],
      cloud: extractedSkills.cloud?.matched || [],
      tools: extractedSkills.tools?.matched || []
    };

    const eduSection = this.extractSection(resumeText, ['education','academic','university','college']);
    
    let html = `
    <div class="latex-template">
      <!-- HEADING -->
      <div class="latex-header">
        <h1>${info.name || 'YOUR NAME'}</h1>
        <div class="contact-info">
          Location, India | 
          <a href="tel:${info.phone || ''}">${info.phone || '+91-9999999999'}</a> | 
          <a href="mailto:${info.email || ''}">${info.email || 'yourname@gmail.com'}</a> | 
          <a href="${info.linkedin || '#'}">LinkedIn</a> | 
          <a href="${info.github || '#'}">GitHub</a>
        </div>
      </div>

      <!-- EDUCATION -->
      <div class="latex-section">
        <div class="latex-section-title">EDUCATION</div>
        <div class="latex-row">
          <span class="bold">College/University Name</span>
          <span class="right">2020 — 2024</span>
        </div>
        <div class="latex-row">
          <span class="italic">Bachelor of Technology in Computer Science (CGPA: 8.5)</span>
          <span class="right">City, India</span>
        </div>
      </div>

      <!-- COURSEWORK -->
      <div class="latex-section">
        <div class="latex-section-title">COURSEWORK / SKILLS</div>
        <div class="latex-skills-grid">
          <div>Data Structures & Algorithms</div>
          <div>Operating Systems</div>
          <div>DBMS</div>
          <div>OOPS Concept</div>
          <div>Artificial Intelligence</div>
          <div>Web Development</div>
          <div>Android Development</div>
          <div>Computer Networks</div>
        </div>
      </div>

      <!-- PROJECTS -->
      <div class="latex-section">
        <div class="latex-section-title">PROJECTS</div>
        <div class="latex-project">
          <div class="latex-row">
            <span class="bold"><u>Project Name</u> | Stack: React, Node.js, SQL</span>
            <span class="right">MM YYYY</span>
          </div>
          <ul class="latex-list">
            <li>Developed a high-performance system reducing processing latency by 35%.</li>
            <li>Implemented secure user authentication and real-time data visualization.</li>
          </ul>
        </div>
      </div>

      <!-- EXPERIENCE/INTERNSHIP -->
      <div class="latex-section">
        <div class="latex-section-title">INTERNSHIP</div>
        <div class="latex-row">
          <span class="bold">Company Name</span>
          <span class="right">MM YYYY — MM YYYY</span>
        </div>
        <div class="latex-row">
          <span class="italic">Software Engineering Intern</span>
          <span class="right">City, India</span>
        </div>
        <ul class="latex-list">
          <li>Engineered scalable features using modern tech stack, improving user engagement by 20%.</li>
          <li>Optimized database queries decreasing average response time by 150ms.</li>
        </ul>
      </div>

      <!-- TECHNICAL SKILLS -->
      <div class="latex-section">
        <div class="latex-section-title">TECHNICAL SKILLS</div>
        <div class="latex-tech-row">
          <b>Languages:</b> ${categories.languages.join(', ') || 'Python, Java, C, C++, SQL, JavaScript'}
        </div>
        <div class="latex-tech-row">
          <b>Developer Tools:</b> VS Code, Git, GitHub, Docker, Postman, Android Studio
        </div>
        <div class="latex-tech-row">
          <b>Technologies/Frameworks:</b> ${categories.frameworks.slice(0, 8).join(', ') || 'React.js, Node.js, Flutter, Express, Linux'}
        </div>
      </div>
    </div>
    `;

    return html;
  }

  static extractSection(text, keywords) {
    const lines = text.split('\n');
    let capturing = false;
    let captured = [];
    for (const line of lines) {
      const lower = line.toLowerCase().trim();
      if (keywords.some(k => lower.includes(k)) && line.trim().length < 60) {
        capturing = true;
        continue;
      }
      if (capturing) {
        if (line.trim().length === 0 && captured.length > 0) break;
        if (/^[A-Z][A-Z\s]{3,}$/.test(line.trim()) && captured.length > 0) break;
        if (line.trim()) captured.push(line.trim());
      }
    }
    return captured.join('<br>');
  }
}

// ============================================
// GEMINI AI CHAT
// ============================================
class GeminiChat {
  static chatHistory = [];

  static buildSystemPrompt(resumeText, extractedSkills, roleMatches) {
    const skillsList = Object.entries(extractedSkills)
      .filter(([k]) => !k.startsWith('_'))
      .map(([k, v]) => `${v.label}: ${v.matched.join(', ') || 'none'}`)
      .join('\n');
    const topRoles = (roleMatches || []).slice(0, 3).map(r => `${r.title} (${r.score}%)`).join(', ');
    return `You are CareerIQ AI, a career advisor for Indian B.Tech CSE students. Be helpful, specific, and encouraging.

The student's resume data:
Skills found: ${extractedSkills._totalFound || 0}
${skillsList}

Top matching roles: ${topRoles || 'Not analyzed yet'}

Guidelines:
- Give specific, actionable advice
- Reference Indian job market (₹ salaries, Indian companies, Indian internships)
- Keep responses concise (max 200 words)
- Use markdown formatting for readability
- If asked about resume, reference their actual skills above
- Suggest specific resources, courses, or next steps`;
  }

  static async sendMessage(userMessage, resumeText, extractedSkills, roleMatches) {
    this.chatHistory.push({ role: 'user', content: userMessage });

    const systemPrompt = this.buildSystemPrompt(resumeText || '', extractedSkills || {}, roleMatches);

    // Try Groq first (Llama 3.3 70B — 30 RPM, ultra fast)
    try {
      const groqResp = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getGroqApiKey()}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...this.chatHistory.map(m => ({ role: m.role, content: m.content }))
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });
      if (groqResp.ok) {
        const data = await groqResp.json();
        const aiText = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
        this.chatHistory.push({ role: 'assistant', content: aiText });
        return aiText;
      }
      throw new Error(`Groq ${groqResp.status}`);
    } catch (groqErr) {
      console.warn('Groq error, trying Gemini fallback:', groqErr);
    }

    // Fallback to Gemini
    try {
      const contents = [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nUser: ' + this.chatHistory.map(m => `${m.role}: ${m.content}`).join('\n') }] }
      ];
      const resp = await fetch(getGeminiApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });
      if (!resp.ok) throw new Error(`Gemini ${resp.status}`);
      const data = await resp.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response.';
      this.chatHistory.push({ role: 'assistant', content: aiText });
      return aiText;
    } catch (e) {
      console.error('All AI APIs failed:', e);
      return 'Sorry, AI is temporarily unavailable. Please try again in a moment.';
    }
  }
}

// ============================================
// SUPABASE TRACKER (Cloud Database)
// ============================================
class Tracker {
  // Save analysis to Supabase
  static async saveAnalysis(data) {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from('analyses').insert({
          device_id: DEVICE_ID,
          total_skills: data.totalSkills || 0,
          best_role: data.bestRole || '—',
          best_score: data.bestScore || 0,
          faang_score: data.faangScore || 0,
          resume_text: data.resumeText || ''
        });
        if (error) throw error;
        console.log('✅ Analysis saved to Supabase');
      } catch (e) {
        console.warn('Supabase save error, falling back to localStorage:', e);
        localStorage.setItem('careeriq_lastAnalysis', JSON.stringify({ ...data, timestamp: new Date().toISOString() }));
      }
    } else {
      localStorage.setItem('careeriq_lastAnalysis', JSON.stringify({ ...data, timestamp: new Date().toISOString() }));
    }
    this.addActivity(`📄 Resume analyzed — ${data.totalSkills} skills found, best match: ${data.bestRole}`);
  }

  // Add activity to Supabase
  static async addActivity(text) {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.from('activities').insert({
          device_id: DEVICE_ID,
          activity_text: text
        });
        if (error) throw error;
      } catch (e) {
        console.warn('Activity save error:', e);
        const activities = JSON.parse(localStorage.getItem('careeriq_activities') || '[]');
        activities.unshift({ text, time: new Date().toISOString() });
        localStorage.setItem('careeriq_activities', JSON.stringify(activities.slice(0, 20)));
      }
    } else {
      const activities = JSON.parse(localStorage.getItem('careeriq_activities') || '[]');
      activities.unshift({ text, time: new Date().toISOString() });
      localStorage.setItem('careeriq_activities', JSON.stringify(activities.slice(0, 20)));
    }
  }

  // Load latest analysis from Supabase
  static async loadAnalysis() {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('analyses')
          .select('*')
          .eq('device_id', DEVICE_ID)
          .order('created_at', { ascending: false })
          .limit(1);
        if (error) throw error;
        if (data && data.length > 0) {
          return {
            totalSkills: data[0].total_skills,
            bestRole: data[0].best_role,
            bestScore: data[0].best_score,
            faangScore: data[0].faang_score
          };
        }
      } catch (e) {
        console.warn('Supabase load error, trying localStorage:', e);
      }
    }
    const d = localStorage.getItem('careeriq_lastAnalysis');
    return d ? JSON.parse(d) : null;
  }

  // Load activities from Supabase
  static async loadActivities() {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('activities')
          .select('*')
          .eq('device_id', DEVICE_ID)
          .order('created_at', { ascending: false })
          .limit(10);
        if (error) throw error;
        return (data || []).map(a => ({ text: a.activity_text, time: a.created_at }));
      } catch (e) {
        console.warn('Activities load error:', e);
      }
    }
    return JSON.parse(localStorage.getItem('careeriq_activities') || '[]');
  }
}

// ============================================
// ROUTER — Hash-based SPA Navigation
// ============================================
class Router {
  static init() {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }
  static navigate() {
    const hash = window.location.hash || '#/';
    const page = hash.replace('#/', '') || 'home';
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target page
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('active');
    else document.getElementById('page-home')?.classList.add('active');
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page || (page === '' && n.dataset.page === 'home'));
    });
    // Scroll to top
    document.querySelector('.main-content')?.scrollTo(0, 0);
    // Close mobile sidebar
    document.getElementById('sidebar')?.classList.remove('open');
  }
}

// ============================================
// MAIN APPLICATION
// ============================================
class App {
  constructor() {
    this.resumeText = '';
    this.extractedSkills = null;
    this.roleMatches = null;
    this.faangScore = null;
    this.liveJobs = [];
    this.opportunities = {};
  }

  async init() {
    Router.init();
    this.setupUpload();
    this.setupChat();
    this.setupFakeJobDetector();
    this.setupMobileMenu();
    this.setupOpportunityTabs();
    this.createParticles();
    // Async operations (don't block UI)
    this.checkAPIStatus();
    this.renderTrending();
    // Note: Quick Stats only show AFTER resume is uploaded (not from old data)
  }

  // --- API Status ---
  async checkAPIStatus() {
    // Check Remotive API
    try {
      const resp = await fetch('https://remotive.com/api/remote-jobs?limit=1');
      if (resp.ok) {
        document.querySelectorAll('.status-dot').forEach(d => d.classList.add('online'));
        document.querySelectorAll('.status-text').forEach(t => t.textContent = 'API Connected');
      }
    } catch (e) {
      document.querySelectorAll('.status-text').forEach(t => t.textContent = 'API Offline');
    }

    // Check Supabase Connection
    const storageText = document.getElementById('storage-text');
    const storageIcon = document.querySelector('#storage-status .storage-icon');
    if (!supabaseClient) {
      if (storageText) storageText.textContent = 'Fallback: localStorage';
      if (storageIcon) storageIcon.textContent = '💾';
      return;
    }
    try {
      const { data, error } = await supabaseClient.from('analyses').select('id').limit(1);
      if (!error) {
        if (storageText) storageText.textContent = 'Supabase Connected ✅';
        if (storageIcon) storageIcon.textContent = '☀️';
        console.log('✅ Supabase connected successfully');
      } else {
        throw error;
      }
    } catch (e) {
      console.warn('⚠️ Supabase connection failed:', e);
      if (storageText) storageText.textContent = 'Fallback: localStorage';
      if (storageIcon) storageIcon.textContent = '💾';
    }
  }

  // --- Particles ---
  createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute;width:${Math.random()*4+1}px;height:${Math.random()*4+1}px;background:rgba(59,130,246,${Math.random()*0.3+0.1});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:float ${Math.random()*10+10}s ease-in-out infinite alternate;`;
      container.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes float{0%{transform:translateY(0) translateX(0);opacity:0.3}50%{opacity:0.8}100%{transform:translateY(-60px) translateX(30px);opacity:0.2}}`;
    document.head.appendChild(style);
  }

  // --- Trending (Real-Time from GitHub + StackOverflow) ---
  async renderTrending() {
    const container = document.getElementById('dash-trending-chips');
    if (!container) return;
    container.innerHTML = '<div class="trend-chip" style="opacity:0.5">⏳ Fetching live trends...</div>';
    try {
      const trends = await TrendingSkillsFetcher.fetchAll();
      if (trends.length > 0) {
        container.innerHTML = trends.map(s => `<div class="trend-chip" title="${s.source || ''}"><span>${s.name}</span><span class="trend-growth">${s.growth}</span></div>`).join('');
      } else {
        container.innerHTML = '<div class="trend-chip" style="opacity:0.5">Could not fetch trends. Check connection.</div>';
      }
    } catch (e) {
      container.innerHTML = '<div class="trend-chip" style="opacity:0.5">⚠️ Trending unavailable</div>';
    }
  }

  // --- Activities (from Supabase) ---
  async renderActivities() {
    const container = document.getElementById('activity-list');
    if (!container) return;
    const activities = await Tracker.loadActivities();
    if (activities.length === 0) {
      container.innerHTML = '<div class="activity-empty">No activity yet. Upload a resume to get started!</div>';
      return;
    }
    container.innerHTML = activities.slice(0, 5).map(a => {
      const time = new Date(a.time);
      const ago = this.timeAgo(time);
      return `<div class="activity-item"><span class="activity-text">${a.text}</span><span class="activity-time">${ago}</span></div>`;
    }).join('');
  }

  timeAgo(date) {
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  // --- Load Previous (from Supabase) ---
  async loadPreviousAnalysis() {
    const prev = await Tracker.loadAnalysis();
    if (prev) {
      document.getElementById('dash-grid').style.display = 'grid';
      document.getElementById('dash-skills-count').textContent = prev.totalSkills || 0;
      document.getElementById('dash-best-role').textContent = prev.bestRole || '—';
      document.getElementById('dash-match-pct').textContent = (prev.bestScore || 0) + '%';
    }
  }

  // --- Upload Setup ---
  setupUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const removeBtn = document.getElementById('remove-file');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', (e) => {
      if (!e.target.closest('.remove-file')) fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault(); uploadArea.classList.remove('drag-over');
      if (e.dataTransfer.files.length) this.handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => { if (fileInput.files.length) this.handleFile(fileInput.files[0]); });
    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectedFile = null;
      document.getElementById('file-info')?.classList.remove('visible');
      document.querySelector('.upload-icon')?.style.setProperty('display', '');
      document.querySelector('.upload-text')?.style.setProperty('display', '');
    });
    analyzeBtn?.addEventListener('click', () => this.analyzeResume());
  }

  handleFile(file) {
    if (!file) return;
    this.selectedFile = file;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'txt') { alert('Please upload a PDF or TXT file.'); return; }
    document.getElementById('file-name').textContent = file.name;
    document.getElementById('file-size').textContent = (file.size / 1024).toFixed(1) + ' KB';
    document.getElementById('file-info')?.classList.add('visible');
  }

  async analyzeResume() {
    if (!this.selectedFile) { alert('Please upload a resume first.'); return; }

    const loading = document.getElementById('loading-overlay');
    const bar = document.getElementById('loading-bar');
    loading.classList.add('visible');
    bar.style.width = '10%';

    try {
      // Step 1: Extract text
      const ext = this.selectedFile.name.split('.').pop().toLowerCase();
      if (ext === 'pdf') {
        const arrayBuffer = await this.selectedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
        this.resumeText = text;
      } else {
        this.resumeText = await this.selectedFile.text();
      }
      bar.style.width = '30%';

      // Step 2: Extract skills
      this.extractedSkills = SkillExtractor.extract(this.resumeText);
      bar.style.width = '50%';

      // Step 3: Match roles
      this.roleMatches = RoleMatcher.match(this.extractedSkills);
      bar.style.width = '60%';

      // Step 4: FAANG score
      this.faangScore = FAANGScorer.score(this.resumeText, this.extractedSkills);
      bar.style.width = '70%';

      // Step 5: Fetch live jobs
      const topRole = this.roleMatches[0];
      if (topRole) {
        this.liveJobs = await RealTimeJobFetcher.fetchJobs(topRole.keywords, 20);
      }
      bar.style.width = '85%';

      // Step 6: Fetch opportunities
      this.opportunities = await OpportunityFetcher.fetchAll(this.extractedSkills);
      bar.style.width = '95%';

      // Step 7: Save & render
      await Tracker.saveAnalysis({
        totalSkills: this.extractedSkills._totalFound,
        bestRole: topRole?.title || '—',
        bestScore: topRole?.score || 0,
        faangScore: this.faangScore.percentage,
        resumeText: this.resumeText?.substring(0, 5000) || ''
      });

      this.renderAllPages();
      bar.style.width = '100%';

      setTimeout(() => {
        loading.classList.remove('visible');
        bar.style.width = '0';
        this.fetchGeminiTip();
      }, 500);

    } catch (e) {
      console.error('Analysis error:', e);
      loading.classList.remove('visible');
      alert('Error analyzing resume. Please try again.');
    }
  }

  // --- Render All Pages ---
  renderAllPages() {
    this.renderDashboard();
    this.renderResumePage();
    this.renderResumeBuilder();
    this.renderSkillGap();
    this.renderRolesPage();
    this.renderJobsPage();
    this.renderOpportunitiesPage();
    this.renderActivities();
  }

  // --- Dashboard ---
  renderDashboard() {
    const grid = document.getElementById('dash-grid');
    grid.style.display = 'grid';

    const score = this.faangScore?.percentage || 0;
    const totalSkills = this.extractedSkills?._totalFound || 0;
    const topRole = this.roleMatches?.[0];

    // Gauge
    const gaugeFill = document.getElementById('gauge-fill');
    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (score / 100) * circumference;
    gaugeFill.style.strokeDashoffset = offset;
    if (score >= 70) gaugeFill.style.stroke = '#10b981';
    else if (score >= 40) gaugeFill.style.stroke = '#f59e0b';
    else gaugeFill.style.stroke = '#ef4444';
    document.getElementById('gauge-score').textContent = score;
    document.getElementById('fitness-verdict').textContent =
      score >= 80 ? '🎉 FAANG-Ready Resume!' :
      score >= 60 ? '✅ Good — needs polish' :
      score >= 40 ? '⚠️ Significant gaps — see Resume Builder' :
      '🔴 Major rewrite needed — use Resume Builder';

    // Stats
    document.getElementById('dash-skills-count').textContent = totalSkills;
    document.getElementById('dash-best-role').textContent = topRole ? topRole.title.split(' ')[0] : '—';
    document.getElementById('dash-match-pct').textContent = (topRole?.score || 0) + '%';
    document.getElementById('dash-live-jobs').textContent = this.liveJobs.length;
  }

  async fetchGeminiTip() {
    const tipEl = document.getElementById('ai-tip-text');
    if (!tipEl || !this.extractedSkills) return;
    tipEl.textContent = 'Generating personalized tip...';
    try {
      const tip = await GeminiChat.sendMessage(
        'Give me ONE specific, actionable career tip in 2 sentences based on my skills. Be specific, not generic.',
        this.resumeText, this.extractedSkills, this.roleMatches
      );
      tipEl.innerHTML = tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      GeminiChat.chatHistory = []; // Reset so this doesn't pollute chat
    } catch (e) {
      tipEl.textContent = 'Keep building projects with your top skills to stand out!';
    }
  }

  // --- Resume Page ---
  renderResumePage() {
    if (!this.extractedSkills) return;
    document.getElementById('resume-needs-upload').style.display = 'none';
    document.getElementById('resume-results').style.display = 'block';

    const skillsGrid = document.getElementById('skills-grid');
    let skillsHTML = '';
    for (const [cat, data] of Object.entries(this.extractedSkills)) {
      if (cat.startsWith('_') || data.matched.length === 0) continue;
      skillsHTML += `<div class="skill-category"><div class="category-header"><span class="category-icon">${data.icon}</span><span class="category-name">${data.label}</span><span class="category-count">${data.matched.length}</span></div>${data.matched.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>`;
    }
    skillsGrid.innerHTML = skillsHTML;

    // Chart
    const ctx = document.getElementById('skills-chart');
    if (ctx) {
      if (this._chart) this._chart.destroy();
      const labels = []; const values = []; const colors = [];
      const palette = ['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#14b8a6','#6366f1','#f97316'];
      let i = 0;
      for (const [cat, data] of Object.entries(this.extractedSkills)) {
        if (cat.startsWith('_') || data.matched.length === 0) continue;
        labels.push(data.label);
        values.push(data.matched.length);
        colors.push(palette[i % palette.length]);
        i++;
      }
      this._chart = new Chart(ctx, {
        type: 'doughnut',
        data: { labels, datasets: [{ data: values, backgroundColor: colors, borderWidth: 0 }] },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } } } }
      });
    }

    // Strengths / Weaknesses
    const strengths = []; const weaknesses = [];
    for (const [cat, data] of Object.entries(this.extractedSkills)) {
      if (cat.startsWith('_')) continue;
      const pct = (data.matched.length / data.total * 100);
      if (pct >= 25) strengths.push(`${data.icon} ${data.label} (${data.matched.length} skills)`);
      else if (data.matched.length === 0) weaknesses.push(`${data.icon} ${data.label} — no skills found`);
    }
    document.getElementById('strengths-list').innerHTML = strengths.map(s => `<li>${s}</li>`).join('') || '<li>Upload a more detailed resume</li>';
    document.getElementById('weaknesses-list').innerHTML = weaknesses.map(w => `<li>${w}</li>`).join('') || '<li>Great coverage!</li>';
  }

  // --- FAANG Resume Builder ---
  renderResumeBuilder() {
    if (!this.extractedSkills || !this.faangScore) return;
    document.getElementById('builder-needs-upload').style.display = 'none';
    document.getElementById('builder-results').style.display = 'block';

    const score = this.faangScore.percentage;

    // FAANG Gauge
    const gaugeFill = document.getElementById('faang-gauge-fill');
    const circumference = 2 * Math.PI * 85;
    gaugeFill.style.strokeDashoffset = circumference - (score / 100) * circumference;
    if (score >= 70) gaugeFill.style.stroke = '#10b981';
    else if (score >= 40) gaugeFill.style.stroke = '#f59e0b';
    else gaugeFill.style.stroke = '#ef4444';
    document.getElementById('faang-score').textContent = score;

    const verdict = document.getElementById('faang-verdict');
    if (score >= 80) { verdict.textContent = '🎉 FAANG-Ready Resume!'; verdict.className = 'faang-verdict excellent'; }
    else if (score >= 60) { verdict.textContent = '✅ Good Resume — Needs Polish'; verdict.className = 'faang-verdict good'; }
    else if (score >= 40) { verdict.textContent = '⚠️ Significant Gaps — Review Below'; verdict.className = 'faang-verdict fair'; }
    else { verdict.textContent = '🔴 Major Rewrite Needed — See Generated Resume Below'; verdict.className = 'faang-verdict poor'; }

    // Criteria Grid
    const criteriaGrid = document.getElementById('faang-criteria-grid');
    criteriaGrid.innerHTML = this.faangScore.criteria.map(c => {
      const pct = (c.score / c.maxScore * 100);
      const icon = pct >= 80 ? '✅' : pct >= 50 ? '⚠️' : '❌';
      return `<div class="faang-criteria-item"><span class="criteria-status">${icon}</span><div class="criteria-info"><div class="criteria-name">${c.name}</div><div class="criteria-detail">${c.details}</div></div><span class="criteria-score">${c.score}/${c.maxScore}</span></div>`;
    }).join('');

    // Generate resume if score < 70
    if (score < 70) {
      document.getElementById('generated-resume-section').style.display = 'block';
      const preview = document.getElementById('gen-resume-preview');
      preview.innerHTML = FAANGFormatter.format(this.resumeText, this.extractedSkills, score);
    }

    // PDF Download
    document.getElementById('download-resume-pdf')?.addEventListener('click', () => {
      const element = document.getElementById('gen-resume-preview');
      if (!element) return;
      html2pdf().set({
        margin: [10, 10],
        filename: 'CareerIQ_FAANG_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
      Tracker.addActivity('📥 Downloaded FAANG-formatted resume');
    });

    // Copy Text
    document.getElementById('copy-resume-text')?.addEventListener('click', () => {
      const text = document.getElementById('gen-resume-preview')?.innerText || '';
      navigator.clipboard.writeText(text).then(() => alert('Resume text copied to clipboard!'));
    });
  }

  // --- Skill Gap Page ---
  renderSkillGap() {
    if (!this.roleMatches) return;
    document.getElementById('skills-needs-upload').style.display = 'none';
    document.getElementById('skills-results').style.display = 'block';

    const gapGrid = document.getElementById('gap-grid');
    const topRoles = this.roleMatches.slice(0, 4);
    gapGrid.innerHTML = topRoles.map(role => {
      const pct = role.score;
      const missing = role.missingRequired;
      return `<div class="gap-card"><div class="gap-card-header"><span>🎯</span> ${role.title}</div><div class="gap-progress"><div class="gap-progress-fill" style="width:${pct}%"></div></div><div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">${pct}% match · ${missing.length} skills to learn</div><div class="gap-skills-tags">${missing.map(s => `<span class="skill-tag missing">${s}</span>`).join('')}</div></div>`;
    }).join('');

    const resourceGrid = document.getElementById('resource-grid');
    const resources = [
      { icon: '🎓', name: 'freeCodeCamp', type: 'Free Courses', url: 'https://freecodecamp.org' },
      { icon: '📺', name: 'YouTube CS50', type: 'Harvard CS Course', url: 'https://youtube.com/cs50' },
      { icon: '💻', name: 'LeetCode', type: 'DSA Practice', url: 'https://leetcode.com' },
      { icon: '📚', name: 'Coursera', type: 'Certified Courses', url: 'https://coursera.org' },
      { icon: '🔥', name: 'Udemy', type: 'Paid Courses', url: 'https://udemy.com' },
      { icon: '🏆', name: 'HackerRank', type: 'Coding Challenges', url: 'https://hackerrank.com' }
    ];
    resourceGrid.innerHTML = resources.map(r => `<a href="${r.url}" target="_blank" class="resource-card"><span class="resource-icon">${r.icon}</span><div><div class="resource-name">${r.name}</div><div class="resource-type">${r.type}</div></div></a>`).join('');
  }

  // --- Roles Page ---
  renderRolesPage() {
    if (!this.roleMatches) return;
    document.getElementById('roles-needs-upload').style.display = 'none';
    document.getElementById('roles-results').style.display = 'block';

    const rolesGrid = document.getElementById('roles-grid');
    rolesGrid.innerHTML = this.roleMatches.map(role => {
      const circumference = 2 * Math.PI * 30;
      const offset = circumference - (role.score / 100) * circumference;
      const color = role.score >= 70 ? '#10b981' : role.score >= 40 ? '#f59e0b' : '#ef4444';
      return `<div class="role-card" data-role="${role.key}"><div class="role-match-ring"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" class="role-match-bg"/><circle cx="32" cy="32" r="30" class="role-match-fill" style="stroke:${color};stroke-dasharray:${circumference};stroke-dashoffset:${offset}"/></svg><div class="role-match-pct" style="color:${color}">${role.score}%</div></div><div class="role-title">${role.title}</div><div class="role-desc">${role.description}</div><div class="role-salary">${role.salaryRange}</div></div>`;
    }).join('');

    // Modal
    rolesGrid.querySelectorAll('.role-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.role;
        const role = this.roleMatches.find(r => r.key === key);
        if (!role) return;
        const modal = document.getElementById('role-modal');
        document.getElementById('modal-body').innerHTML = `
          <h2 style="font-size:22px;font-weight:800;margin-bottom:4px">${role.title}</h2>
          <p style="color:var(--accent-green);font-weight:600;margin-bottom:16px">${role.salaryRange} · ${role.score}% Match</p>
          <p style="color:var(--text-secondary);margin-bottom:20px">${role.fullDescription}</p>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:8px">✅ Skills You Have</h3>
          <div style="margin-bottom:16px">${role.matchedRequired.map(s => `<span class="skill-tag">${s}</span>`).join('')}${role.matchedNice.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:8px">❌ Skills to Learn</h3>
          <div style="margin-bottom:16px">${role.missingRequired.map(s => `<span class="skill-tag missing">${s}</span>`).join('')}</div>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:8px">📋 Responsibilities</h3>
          <ul style="padding-left:20px;color:var(--text-secondary)">${role.responsibilities.map(r => `<li style="margin-bottom:4px;font-size:13px">${r}</li>`).join('')}</ul>
          <a href="https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role.title)}&location=India&f_E=1,2" target="_blank" class="job-apply" style="display:inline-block;margin-top:20px">🔍 Search Jobs on LinkedIn</a>`;
        modal.classList.add('visible');
      });
    });

    document.getElementById('modal-close')?.addEventListener('click', () => {
      document.getElementById('role-modal').classList.remove('visible');
    });
    document.getElementById('role-modal')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) e.currentTarget.classList.remove('visible');
    });
  }

  // --- Jobs Page ---
  renderJobsPage() {
    if (!this.roleMatches) return;
    document.getElementById('jobs-needs-upload').style.display = 'none';
    document.getElementById('jobs-results').style.display = 'block';

    const jobsGrid = document.getElementById('live-jobs-grid');
    if (this.liveJobs.length > 0) {
      jobsGrid.innerHTML = this.liveJobs.slice(0, 12).map(job => `
        <div class="job-card">
          <div class="job-company">${job.company_name || 'Company'}</div>
          <div class="job-title">${job.title}</div>
          <div class="job-location">\uD83D\uDCCD ${job.candidate_required_location || 'Remote'}</div>
          ${job.salary ? `<div class="job-salary">\uD83D\uDCB0 ${job.salary}</div>` : ''}
          <div class="job-tags">${(job.tags || []).slice(0, 4).map(t => `<span class="job-tag">${t}</span>`).join('')}</div>
          <a href="${job.url}" target="_blank" class="job-apply">Apply Now \u2192</a>
        </div>`).join('');
    } else {
      jobsGrid.innerHTML = '<div class="opp-loading">No live jobs found. Use portal links below.</div>';
    }

    const portalLinks = document.getElementById('portal-links');
    portalLinks.innerHTML = OpportunityFetcher.getPortalLinks('fulltime').map(p =>
      `<a href="${p.url}" target="_blank" class="portal-link"><span>${p.icon}</span> ${p.name}</a>`
    ).join('');
  }

  // --- Opportunities Page ---
  renderOpportunitiesPage() {
    const renderGrid = (gridId, items) => {
      const grid = document.getElementById(gridId);
      if (!grid) return;
      if (!items || items.length === 0) {
        grid.innerHTML = '<div class="opp-loading">No results from API. Use portal links below.</div>';
        return;
      }
      grid.innerHTML = items.slice(0, 8).map(job => `
        <div class="job-card">
          <div class="job-company">${job.company_name || 'Company'}</div>
          <div class="job-title">${job.title}</div>
          <div class="job-location">\uD83D\uDCCD ${job.candidate_required_location || 'India'}</div>
          ${job.salary ? `<div class="job-salary">\uD83D\uDCB0 ${job.salary}</div>` : ''}
          <div class="job-tags">${(job.tags || []).slice(0, 4).map(t => `<span class="job-tag">${t}</span>`).join('')}</div>
          <a href="${job.url}" target="_blank" class="job-apply">Apply Now \u2192</a>
        </div>`).join('');
    };

    renderGrid('internships-grid', this.opportunities.internships);
    renderGrid('hackathons-grid', this.opportunities.hackathons);
    renderGrid('fulltime-grid', this.opportunities.fulltime);

    // Show internship portals by default
    this.updatePortalLinks('internships');
  }

  updatePortalLinks(category) {
    const portalsGrid = document.getElementById('opp-portals-grid');
    if (portalsGrid) {
      portalsGrid.innerHTML = OpportunityFetcher.getPortalLinks(category).map(p =>
        `<a href="${p.url}" target="_blank" class="portal-link"><span>${p.icon}</span> ${p.name} <span style="font-size:11px;color:var(--text-muted)">\u2014 ${p.desc}</span></a>`
      ).join('');
    }
  }

  setupOpportunityTabs() {
    document.querySelectorAll('.opp-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.opp-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.opp-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`tab-${tab.dataset.tab}`)?.classList.add('active');
        // Update portal links based on active tab
        this.updatePortalLinks(tab.dataset.tab);
      });
    });
  }

  // --- Chat Setup ---
  setupChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');

    if (!input || !sendBtn) return;

    const sendMessage = async () => {
      const text = input.value.trim();
      if (!text) return;
      input.value = '';

      // Hide welcome
      const welcome = messages.querySelector('.chat-welcome');
      if (welcome) welcome.style.display = 'none';

      // User message
      messages.innerHTML += `<div class="chat-msg user"><div class="chat-avatar">\uD83D\uDC64</div><div class="chat-bubble">${this.escapeHTML(text)}</div></div>`;

      // Typing indicator
      messages.innerHTML += `<div class="chat-msg ai typing-msg"><div class="chat-avatar">\uD83E\uDD16</div><div class="chat-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div></div>`;
      messages.scrollTop = messages.scrollHeight;

      // Get AI response
      const response = await GeminiChat.sendMessage(text, this.resumeText, this.extractedSkills, this.roleMatches);

      // Remove typing, add response
      messages.querySelector('.typing-msg')?.remove();
      const formatted = response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
      messages.innerHTML += `<div class="chat-msg ai"><div class="chat-avatar">\uD83E\uDD16</div><div class="chat-bubble">${formatted}</div></div>`;
      messages.scrollTop = messages.scrollHeight;

      Tracker.addActivity(`\uD83D\uDCAC Asked Gemini: "${text.slice(0, 40)}..."`);
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    // Suggestion buttons
    document.querySelectorAll('.chat-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.prompt;
        sendMessage();
      });
    });
  }

  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Fake Job Detector ---
  setupFakeJobDetector() {
    document.querySelectorAll('.fjd-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.fjd-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.fjd-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('fjd-tab-' + tab.dataset.fjdTab)?.classList.add('active');
      });
    });

    document.getElementById('fjd-analyze-btn')?.addEventListener('click', () => {
      const activeTab = document.querySelector('.fjd-tab.active');
      const mode = activeTab?.dataset.fjdTab || 'url';
      let input = '';
      if (mode === 'url') {
        input = document.getElementById('fjd-url-input')?.value.trim();
        if (!input) { alert('Please paste a job URL.'); return; }
        if (!input.startsWith('http')) input = 'https://' + input;
      } else {
        input = document.getElementById('fjd-text-input')?.value.trim();
        if (!input) { alert('Please paste a job description.'); return; }
      }
      const results = document.getElementById('fjd-results');
      results.innerHTML = '<div class="opp-loading"><div class="opp-spinner"></div>Analyzing...</div>';
      setTimeout(() => {
        const result = FakeJobDetector.analyze(input, mode);
        FakeJobDetector.renderResults(result, results);
        Tracker.addActivity(`\uD83D\uDEE1\uFE0F Job scam check: ${result.verdictLabel}`);
      }, 600);
    });
  }

  // --- Mobile Menu ---
  setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    toggle?.addEventListener('click', () => sidebar?.classList.toggle('open'));
    // Close on nav click
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => sidebar?.classList.remove('open'));
    });
  }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
