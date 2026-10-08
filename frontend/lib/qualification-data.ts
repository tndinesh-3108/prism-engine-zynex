// Curated datasets for PRISM Qualification Persona Engine

export interface CollegeItem {
  id: string;
  name: string;
  state: string;
  category: "Engineering" | "Medical" | "IIT";
  nirfRank: number;
  location: string;
  tuitionPerYear: string;
  medianPackage: string;
  entranceExam: string;
  cutoffInfo: string;
  specialties: string[];
  websiteUrl: string;
}

export interface JobOrInternshipItem {
  id: string;
  title: string;
  company: string;
  status: "Present" | "Upcoming" | "Past";
  type: "Job Offer" | "Internship" | "Apprenticeship";
  location: string;
  packageOrStipend: string;
  eligibilityCgpa: number;
  batchEligible: string;
  deadline: string;
  skills: string[];
  applicationUrl: string;
  sourceNotice: string;
}

export interface HackathonItem {
  id: string;
  name: string;
  organizer: string;
  dates: string;
  mode: "Online" | "Hybrid" | "In-Person";
  prizePool: string;
  eligibility: string;
  registrationUrl: string;
  tags: string[];
}

export interface ProjectIdeaItem {
  id: string;
  title: string;
  yearTarget: "I" | "II" | "III" | "IV" | "PG";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  techStack: string[];
  description: string;
  learningOutcomes: string;
}

export interface CertificationLinkItem {
  id: string;
  title: string;
  provider: string;
  level: string;
  directUrl: string;
  estimatedWeeks: string;
  highlightSkill: string;
}

export interface StandardizedExamItem {
  id: string;
  examName: string;
  fullTitle: string;
  conductingBody: string;
  examDates: string;
  registrationStatus: "Open" | "Closed" | "Upcoming";
  registrationDeadline?: string;
  directRegistrationUrl?: string; // shown ONLY if registrationStatus === "Open"
  notice: string;
}

export interface TechnicalQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

// -------------------------------------------------------------
// 1. BEST ENGINEERING & MEDICAL COLLEGES BY STATE
// -------------------------------------------------------------
export const COLLEGES_DATA: CollegeItem[] = [
  // Tamil Nadu
  {
    id: "col-tn-1",
    name: "Indian Institute of Technology Madras (IIT Madras)",
    state: "Tamil Nadu",
    category: "Engineering",
    nirfRank: 1,
    location: "Chennai, Tamil Nadu",
    tuitionPerYear: "₹2.2 Lakhs",
    medianPackage: "₹21.4 LPA (CS: ₹41.7 LPA)",
    entranceExam: "JEE Advanced",
    cutoffInfo: "Closing Rank 144 (CSE)",
    specialties: ["Artificial Intelligence", "Robotics", "Computer Science", "Data Science"],
    websiteUrl: "https://www.iitm.ac.in",
  },
  {
    id: "col-tn-2",
    name: "National Institute of Technology Tiruchirappalli (NIT Trichy)",
    state: "Tamil Nadu",
    category: "Engineering",
    nirfRank: 9,
    location: "Tiruchirappalli, Tamil Nadu",
    tuitionPerYear: "₹1.8 Lakhs",
    medianPackage: "₹15.8 LPA",
    entranceExam: "JEE Main",
    cutoffInfo: "Closing Rank 4,600 (CSE)",
    specialties: ["Computer Science", "ECE", "Mechanical", "Instrumentation"],
    websiteUrl: "https://www.nitt.edu",
  },
  {
    id: "col-tn-3",
    name: "College of Engineering, Guindy (Anna University)",
    state: "Tamil Nadu",
    category: "Engineering",
    nirfRank: 13,
    location: "Chennai, Tamil Nadu",
    tuitionPerYear: "₹45,000",
    medianPackage: "₹10.5 LPA",
    entranceExam: "TNEA (12th Cutoff)",
    cutoffInfo: "TNEA Cutoff 199.5 / 200",
    specialties: ["CSE", "Information Technology", "Bio-Medical", "Mechanical"],
    websiteUrl: "https://www.annauniv.edu",
  },
  {
    id: "col-tn-4",
    name: "PSG College of Technology",
    state: "Tamil Nadu",
    category: "Engineering",
    nirfRank: 63,
    location: "Coimbatore, Tamil Nadu",
    tuitionPerYear: "₹95,000",
    medianPackage: "₹9.2 LPA",
    entranceExam: "TNEA",
    cutoffInfo: "TNEA Cutoff 198.0 / 200",
    specialties: ["Robotics & Automation", "Software Systems", "Electronics"],
    websiteUrl: "https://www.psgtech.edu",
  },
  {
    id: "col-tn-5",
    name: "SSN College of Engineering",
    state: "Tamil Nadu",
    category: "Engineering",
    nirfRank: 80,
    location: "Kalavakkam (Chennai), Tamil Nadu",
    tuitionPerYear: "₹1.4 Lakhs",
    medianPackage: "₹8.8 LPA",
    entranceExam: "TNEA / Management Merit",
    cutoffInfo: "TNEA Cutoff 196.5 / 200",
    specialties: ["AI & Data Science", "CSE", "Cybersecurity"],
    websiteUrl: "https://www.ssn.edu.in",
  },

  // Karnataka
  {
    id: "col-ka-1",
    name: "Indian Institute of Science (IISc Bangalore)",
    state: "Karnataka",
    category: "Engineering",
    nirfRank: 2,
    location: "Bengaluru, Karnataka",
    tuitionPerYear: "₹30,000",
    medianPackage: "₹28.0 LPA",
    entranceExam: "JEE Advanced / KVPY",
    cutoffInfo: "Top 250 JEE Advanced AIR",
    specialties: ["B.Tech Mathematics & Computing", "Quantum Technologies", "AI"],
    websiteUrl: "https://iisc.ac.in",
  },
  {
    id: "col-ka-2",
    name: "National Institute of Technology Karnataka (NIT Surathkal)",
    state: "Karnataka",
    category: "Engineering",
    nirfRank: 12,
    location: "Mangalore / Surathkal, Karnataka",
    tuitionPerYear: "₹1.8 Lakhs",
    medianPackage: "₹16.0 LPA",
    entranceExam: "JEE Main",
    cutoffInfo: "Closing Rank 3,400 (CSE)",
    specialties: ["Information Technology", "AI", "Electronics"],
    websiteUrl: "https://www.nitk.ac.in",
  },
  {
    id: "col-ka-3",
    name: "R.V. College of Engineering (RVCE)",
    state: "Karnataka",
    category: "Engineering",
    nirfRank: 89,
    location: "Bengaluru, Karnataka",
    tuitionPerYear: "₹2.4 Lakhs (KCET: ₹90,000)",
    medianPackage: "₹12.0 LPA",
    entranceExam: "KCET / COMEDK",
    cutoffInfo: "COMEDK Rank < 400 (CSE)",
    specialties: ["Computer Science", "Artificial Intelligence", "Aerospace"],
    websiteUrl: "https://www.rvce.edu.in",
  },

  // Maharashtra
  {
    id: "col-mh-1",
    name: "Indian Institute of Technology Bombay (IIT Bombay)",
    state: "Maharashtra",
    category: "Engineering",
    nirfRank: 3,
    location: "Mumbai, Maharashtra",
    tuitionPerYear: "₹2.2 Lakhs",
    medianPackage: "₹22.5 LPA (CS: ₹45.0 LPA)",
    entranceExam: "JEE Advanced",
    cutoffInfo: "Closing Rank 67 (CSE)",
    specialties: ["Computer Science", "Data Science", "Electrical"],
    websiteUrl: "https://www.iitb.ac.in",
  },
  {
    id: "col-mh-2",
    name: "COEP Technological University (College of Engineering Pune)",
    state: "Maharashtra",
    category: "Engineering",
    nirfRank: 73,
    location: "Pune, Maharashtra",
    tuitionPerYear: "₹85,000",
    medianPackage: "₹11.2 LPA",
    entranceExam: "MHT-CET / JEE Main",
    cutoffInfo: "MHT-CET 99.85 Percentile",
    specialties: ["Computer Engineering", "Mechanical", "Robotics"],
    websiteUrl: "https://www.coep.org.in",
  },

  // Delhi NCR
  {
    id: "col-dl-1",
    name: "Indian Institute of Technology Delhi (IIT Delhi)",
    state: "Delhi NCR",
    category: "Engineering",
    nirfRank: 2,
    location: "New Delhi",
    tuitionPerYear: "₹2.2 Lakhs",
    medianPackage: "₹21.0 LPA",
    entranceExam: "JEE Advanced",
    cutoffInfo: "Closing Rank 115 (CSE)",
    specialties: ["CSE", "Mathematics & Computing", "Machine Intelligence"],
    websiteUrl: "https://home.iitd.ac.in",
  },
  {
    id: "col-dl-2",
    name: "Delhi Technological University (DTU - Formerly DCE)",
    state: "Delhi NCR",
    category: "Engineering",
    nirfRank: 29,
    location: "New Delhi",
    tuitionPerYear: "₹1.9 Lakhs",
    medianPackage: "₹13.5 LPA",
    entranceExam: "JEE Main (JAC Delhi)",
    cutoffInfo: "JEE Main CRL < 12,000",
    specialties: ["Software Engineering", "Computer Science", "Information Technology"],
    websiteUrl: "https://dtu.ac.in",
  },

  // Telangana
  {
    id: "col-ts-1",
    name: "International Institute of Information Technology Hyderabad (IIIT Hyderabad)",
    state: "Telangana",
    category: "Engineering",
    nirfRank: 55,
    location: "Hyderabad, Telangana",
    tuitionPerYear: "₹3.8 Lakhs",
    medianPackage: "₹32.0 LPA (CSE: ₹35.5 LPA)",
    entranceExam: "JEE Main (99.9+ %ile) / UGEE",
    cutoffInfo: "JEE Main CRL < 1,600",
    specialties: ["CSE", "Computer Science & Linguistics", "AI & Robotics"],
    websiteUrl: "https://www.iiit.ac.in",
  },
  {
    id: "col-ts-2",
    name: "Indian Institute of Technology Hyderabad (IIT Hyderabad)",
    state: "Telangana",
    category: "Engineering",
    nirfRank: 8,
    location: "Kandi, Sangareddy, Telangana",
    tuitionPerYear: "₹2.2 Lakhs",
    medianPackage: "₹20.0 LPA",
    entranceExam: "JEE Advanced",
    cutoffInfo: "Closing Rank 650 (CSE)",
    specialties: ["B.Tech Artificial Intelligence (Pioneer)", "Computational Engineering"],
    websiteUrl: "https://www.iith.ac.in",
  },

  // Uttar Pradesh
  {
    id: "col-up-1",
    name: "Indian Institute of Technology Kanpur (IIT Kanpur)",
    state: "Uttar Pradesh",
    category: "Engineering",
    nirfRank: 4,
    location: "Kanpur, Uttar Pradesh",
    tuitionPerYear: "₹2.2 Lakhs",
    medianPackage: "₹22.0 LPA",
    entranceExam: "JEE Advanced",
    cutoffInfo: "Closing Rank 220 (CSE)",
    specialties: ["CSE", "Cognitive Sciences", "Biological Sciences"],
    websiteUrl: "https://www.iitk.ac.in",
  },

  // Medical & Bio-Tech Premier Institutions (For Bio/Maths, Bio/CS, NEET)
  {
    id: "col-med-1",
    name: "All India Institute of Medical Sciences (AIIMS New Delhi)",
    state: "Delhi NCR",
    category: "Medical",
    nirfRank: 1,
    location: "New Delhi",
    tuitionPerYear: "₹1,628 (Nominal)",
    medianPackage: "₹18.0 LPA (Resident / Fellow)",
    entranceExam: "NEET UG",
    cutoffInfo: "NEET AIR 1 - 55",
    specialties: ["MBBS", "Biomedical Research", "Neurology", "Clinical Genomics"],
    websiteUrl: "https://www.aiims.edu",
  },
  {
    id: "col-med-2",
    name: "Christian Medical College (CMC Vellore)",
    state: "Tamil Nadu",
    category: "Medical",
    nirfRank: 3,
    location: "Vellore, Tamil Nadu",
    tuitionPerYear: "₹52,000",
    medianPackage: "₹12.0 LPA",
    entranceExam: "NEET UG",
    cutoffInfo: "NEET State Rank Top 100",
    specialties: ["MBBS", "Bio-Engineering Integration", "Pediatrics"],
    websiteUrl: "https://www.cmch-vellore.edu",
  },
  {
    id: "col-med-3",
    name: "Madras Medical College (MMC Chennai)",
    state: "Tamil Nadu",
    category: "Medical",
    nirfRank: 11,
    location: "Chennai, Tamil Nadu",
    tuitionPerYear: "₹18,000",
    medianPackage: "₹10.5 LPA",
    entranceExam: "NEET UG",
    cutoffInfo: "NEET 680+ Marks",
    specialties: ["MBBS", "Cardiology", "Pathology"],
    websiteUrl: "https://www.mmc.ac.in",
  },
];

// -------------------------------------------------------------
// 2. LIVE/UPCOMING/PAST MNC JOBS & INTERNSHIPS (FOR UG & PG)
// -------------------------------------------------------------
export const JOBS_INTERNSHIPS_DATA: JobOrInternshipItem[] = [
  // PRESENT / ACTIVE DRIVES
  {
    id: "job-1",
    title: "Software Development Engineer - I (Full-Time 2026)",
    company: "Google India",
    status: "Present",
    type: "Job Offer",
    location: "Bengaluru / Hyderabad",
    packageOrStipend: "₹32 LPA – ₹48 LPA",
    eligibilityCgpa: 8.0,
    batchEligible: "2025 / 2026 Passing Out",
    deadline: "Rolling (Closes Oct 25, 2026)",
    skills: ["Data Structures & Algorithms", "C++ / Java", "Distributed Systems"],
    applicationUrl: "https://careers.google.com",
    sourceNotice: "Verified on Google University Hiring Portal",
  },
  {
    id: "job-2",
    title: "Software Engineer - Enterprise Systems",
    company: "Zoho Corporation",
    status: "Present",
    type: "Job Offer",
    location: "Chennai, Tamil Nadu",
    packageOrStipend: "₹8.5 LPA – ₹14 LPA",
    eligibilityCgpa: 6.5,
    batchEligible: "Any Graduate / Final Year",
    deadline: "Weekly Walk-in & Online Test",
    skills: ["Java", "C", "Problem Solving", "Object Oriented Design"],
    applicationUrl: "https://www.zoho.com/careers",
    sourceNotice: "Active weekly hiring assessment on Zoho Portal",
  },
  {
    id: "job-3",
    title: "Summer SDE Engineering Intern 2026",
    company: "Amazon Development Centre",
    status: "Present",
    type: "Internship",
    location: "Chennai / Bengaluru",
    packageOrStipend: "₹80,000 / month Stipend",
    eligibilityCgpa: 7.5,
    batchEligible: "2026 / 2027 Graduates (3rd/4th Yr)",
    deadline: "November 15, 2026",
    skills: ["Java", "Operating Systems", "Algorithms", "System Design"],
    applicationUrl: "https://amazon.jobs",
    sourceNotice: "Amazon University Talent 2026 Drive",
  },
  {
    id: "job-4",
    title: "Specialist Programmer (Power Programmer Track)",
    company: "Infosys Limited",
    status: "Present",
    type: "Job Offer",
    location: "Pan-India",
    packageOrStipend: "₹9.5 LPA – ₹12.5 LPA",
    eligibilityCgpa: 7.0,
    batchEligible: "2025 / 2026 Batches",
    deadline: "HackWithInfy Season 2026",
    skills: ["Dynamic Programming", "Graph Theory", "Python / Java"],
    applicationUrl: "https://infytq.onwingspan.com",
    sourceNotice: "Verified via Infosys HackWithInfy Track",
  },

  // UPCOMING DRIVES (SCHEDULED 2026)
  {
    id: "job-5",
    title: "TCS National Qualifier Test (NQT 2026 Prime Track)",
    company: "Tata Consultancy Services (TCS)",
    status: "Upcoming",
    type: "Job Offer",
    location: "Pan-India Multi-City",
    packageOrStipend: "₹9.0 LPA (Prime) / ₹7.0 LPA (Digital)",
    eligibilityCgpa: 6.5,
    batchEligible: "2025 / 2026 Graduates",
    deadline: "Opens November 1, 2026",
    skills: ["Advanced Quantitative Logic", "Coding in Python/C++", "MNC Reasoning"],
    applicationUrl: "https://www.tcs.com/careers",
    sourceNotice: "National NQT Schedule Announcement",
  },
  {
    id: "job-6",
    title: "Cognizant GenC Next Placement Drive",
    company: "Cognizant Technology Solutions",
    status: "Upcoming",
    type: "Job Offer",
    location: "Chennai, Tamil Nadu",
    packageOrStipend: "₹6.75 LPA – ₹9.0 LPA",
    eligibilityCgpa: 7.0,
    batchEligible: "2026 Batch",
    deadline: "Opens December 5, 2026",
    skills: ["Full Stack Web", "SQL", "Automated Testing", "Algorithms"],
    applicationUrl: "https://careers.cognizant.com",
    sourceNotice: "Campus Partner Calendar 2026",
  },
  {
    id: "job-7",
    title: "Microsoft Research AI Undergraduate Fellowship",
    company: "Microsoft Research India",
    status: "Upcoming",
    type: "Internship",
    location: "Bengaluru, Karnataka",
    packageOrStipend: "₹1,00,000 / month Stipend",
    eligibilityCgpa: 8.5,
    batchEligible: "Pre-Final Year / PG Students",
    deadline: "December 15, 2026",
    skills: ["PyTorch", "Linear Algebra", "Scientific Writing", "NLP"],
    applicationUrl: "https://www.microsoft.com/en-us/research/careers/",
    sourceNotice: "Annual Winter Fellowship Notice",
  },

  // PAST / ARCHIVED BENCHMARK DRIVES
  {
    id: "job-8",
    title: "Day-1 Super Dream Recruitment 2025",
    company: "Cisco Systems",
    status: "Past",
    type: "Job Offer",
    location: "Bengaluru",
    packageOrStipend: "₹24 LPA (Closed CTC)",
    eligibilityCgpa: 8.0,
    batchEligible: "2025 Batch (Completed)",
    deadline: "Closed July 2025",
    skills: ["Computer Networks", "C++", "Kernel Networking"],
    applicationUrl: "https://jobs.cisco.com",
    sourceNotice: "Benchmark: Cleared by 48 campus candidates at 8.2+ CGPA",
  },
];

// -------------------------------------------------------------
// 3. UPCOMING HACKATHONS (FOR UG PURSUING)
// -------------------------------------------------------------
export const HACKATHONS_DATA: HackathonItem[] = [
  {
    id: "hack-1",
    name: "Smart India Hackathon 2026 (SIH Senior Software)",
    organizer: "Ministry of Education & AICTE",
    dates: "Grand Finale: November 18–20, 2026",
    mode: "Hybrid",
    prizePool: "₹1,00,000 per problem statement (Total ₹2.5 Cr+)",
    eligibility: "UG (Years I, II, III, IV) & PG Engineering Teams",
    registrationUrl: "https://sih.gov.in",
    tags: ["GovTech", "AI", "Smart Automation", "National Trophy"],
  },
  {
    id: "hack-2",
    name: "Shaastra Tech & AI Hackathon 2026",
    organizer: "IIT Madras Tech Fest",
    dates: "January 8–11, 2026",
    mode: "In-Person (IIT Madras Campus)",
    prizePool: "₹5,00,000 Cash Pool",
    eligibility: "Open to all College Students across India",
    registrationUrl: "https://shaastra.org",
    tags: ["Robotics", "Autonomous Systems", "FastAPI", "TensorFlow"],
  },
  {
    id: "hack-3",
    name: "Devfolio Build with AI Spring Hackathon",
    organizer: "Devfolio & Google Developers Group",
    dates: "October 20–22, 2026",
    mode: "Online",
    prizePool: "$15,000 USD + Google Cloud Credits",
    eligibility: "Beginner & Intermediate College Coders",
    registrationUrl: "https://devfolio.co",
    tags: ["Generative AI", "RAG", "Next.js", "Beginner Friendly"],
  },
  {
    id: "hack-4",
    name: "Flipkart GRiD 6.0 Robotics & Tech Challenge",
    organizer: "Flipkart Commerce",
    dates: "September 2026 – Final rounds",
    mode: "Online + Bangalore HQ",
    prizePool: "₹5,25,000 + Direct PPI (Pre-Placement Interview)",
    eligibility: "3rd & 4th Year B.Tech / M.Tech Students",
    registrationUrl: "https://unstop.com",
    tags: ["Direct Hiring", "Robotics", "E-Commerce System Design"],
  },
];

// -------------------------------------------------------------
// 4. YEAR-TAILORED PROJECT IDEAS (UG PURSUING)
// -------------------------------------------------------------
export const PROJECT_IDEAS_DATA: ProjectIdeaItem[] = [
  // Year I Projects
  {
    id: "proj-1",
    title: "Terminal-Based High Performance File Search & Hash Indexer",
    yearTarget: "I",
    difficulty: "Beginner",
    techStack: ["C++17 / C", "POSIX Threads", "SHA-256"],
    description: "Build a blazingly fast CLI tool that recursively traverses directories, computes checksums, and finds duplicate files in parallel.",
    learningOutcomes: "Mastery of pointers, file I/O, hash maps, and multithreading basics.",
  },
  {
    id: "proj-2",
    title: "Personal Developer Portfolio & Live Interactive Algorithm Visualizer",
    yearTarget: "I",
    difficulty: "Beginner",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    description: "An animated, responsive web portfolio that visually animates Sorting (Quicksort, Mergesort) and Pathfinding (A*, Dijkstra) step-by-step.",
    learningOutcomes: "DOM manipulation, state management, algorithm visualization, responsive design.",
  },

  // Year II Projects
  {
    id: "proj-3",
    title: "Semantic Document Search Engine using Local Vector Embeddings & RAG",
    yearTarget: "II",
    difficulty: "Intermediate",
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "HuggingFace"],
    description: "A full-stack knowledge retrieval assistant where users upload PDFs and ask questions in natural language with cited source snippets.",
    learningOutcomes: "Vector similarity math, REST APIs, token chunking, and modern AI engineering.",
  },
  {
    id: "proj-4",
    title: "Real-Time OpenCV Face Attendance & Anti-Spoofing Campus System",
    yearTarget: "II",
    difficulty: "Intermediate",
    techStack: ["Python", "OpenCV", "SQLite", "Streamlit"],
    description: "Recognize student faces in video streams, verify eye-blink liveness to prevent photo spoofing, and log attendance automatically to database.",
    learningOutcomes: "Computer vision matrix transforms, feature extraction, database triggers.",
  },

  // Year III & IV Projects
  {
    id: "proj-5",
    title: "Distributed Fault-Tolerant Key-Value Store with Raft Consensus",
    yearTarget: "III",
    difficulty: "Advanced",
    techStack: ["Go / Rust", "gRPC", "Protobuf", "Docker"],
    description: "Implement leader election, log replication, and heartbeat monitoring across 5 cluster nodes handling network partition failures.",
    learningOutcomes: "Distributed consensus, RPC protocols, network latency, system design interview mastery.",
  },

  // PG Projects
  {
    id: "proj-6",
    title: "Autonomous Multi-Agent Collaborative Task Orchestration Engine",
    yearTarget: "PG",
    difficulty: "Advanced",
    techStack: ["Python", "PyTorch", "AsyncIO", "Ray", "vLLM"],
    description: "A multi-agent framework where specialized planner, executor, and verifier models collaborate to decompose and solve multi-step engineering queries.",
    learningOutcomes: "Agentic reflection loops, high-throughput model serving, low-latency asynchronous architecture.",
  },
];

// -------------------------------------------------------------
// 5. ACCREDITED CERTIFICATIONS WITH DIRECT VERIFIED URLS
// -------------------------------------------------------------
export const CERTIFICATIONS_DATA: CertificationLinkItem[] = [
  {
    id: "cert-1",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    provider: "Amazon Web Services",
    level: "Foundational",
    directUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    estimatedWeeks: "3–4 Weeks",
    highlightSkill: "Cloud Computing, S3, EC2, IAM Security",
  },
  {
    id: "cert-2",
    title: "Google Cloud Associate Cloud Engineer",
    provider: "Google Cloud",
    level: "Associate",
    directUrl: "https://cloud.google.com/learn/certification/cloud-engineer",
    estimatedWeeks: "6–8 Weeks",
    highlightSkill: "GCP Compute Engine, Cloud Run, GKE Kubernetes",
  },
  {
    id: "cert-3",
    title: "DeepLearning.AI Machine Learning Specialization",
    provider: "Andrew Ng / Coursera",
    level: "Intermediate",
    directUrl: "https://www.coursera.org/specializations/machine-learning-introduction",
    estimatedWeeks: "6–10 Weeks",
    highlightSkill: "Supervised Learning, Neural Networks, Decision Trees",
  },
  {
    id: "cert-4",
    title: "Meta Front-End Developer Professional Certificate",
    provider: "Meta / Coursera",
    level: "Beginner to Intermediate",
    directUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    estimatedWeeks: "8–12 Weeks",
    highlightSkill: "React, JavaScript ES6+, UI UX, Version Control",
  },
  {
    id: "cert-5",
    title: "freeCodeCamp Responsive Web Design & JavaScript Algorithms",
    provider: "freeCodeCamp (100% Free Verified)",
    level: "Foundational",
    directUrl: "https://www.freecodecamp.org/learn",
    estimatedWeeks: "6 Weeks",
    highlightSkill: "Data Structures, Algorithms, Modern Web Development",
  },
];

// -------------------------------------------------------------
// 6. STANDARDIZED EXAMS: AMCAT, SAT, IELTS, JLPT (REGISTRATION RULES)
// -------------------------------------------------------------
export const STANDARDIZED_EXAMS_DATA: StandardizedExamItem[] = [
  {
    id: "exam-amcat",
    examName: "AMCAT",
    fullTitle: "Aspiring Minds Computer Adaptive Test",
    conductingBody: "SHL (Aspiring Minds)",
    examDates: "Weekly Slots (Every Saturday & Sunday throughout the year)",
    registrationStatus: "Open",
    registrationDeadline: "Book 48 hours in advance",
    directRegistrationUrl: "https://www.myamcat.com",
    notice: "Registrations currently OPEN. Accepted by 3,000+ top IT recruiters (Cognizant, Mindtree, Accenture, Titan).",
  },
  {
    id: "exam-sat",
    examName: "SAT",
    fullTitle: "Scholastic Assessment Test (Digital SAT 2026)",
    conductingBody: "College Board",
    examDates: "Upcoming: March 14, 2026 • May 2, 2026 • June 6, 2026",
    registrationStatus: "Open",
    registrationDeadline: "February 27, 2026 (for March Test)",
    directRegistrationUrl: "https://satsuite.collegeboard.org/sat/registration",
    notice: "Registrations currently OPEN for 2026 spring and summer testing windows.",
  },
  {
    id: "exam-ielts",
    examName: "IELTS",
    fullTitle: "International English Language Testing System (Academic / General)",
    conductingBody: "IDP India & British Council",
    examDates: "Up to 4 times a month (Computer-delivered slots daily in Chennai, Bangalore, Hyderabad)",
    registrationStatus: "Open",
    registrationDeadline: "Slots open on rolling basis",
    directRegistrationUrl: "https://www.ieltsidpindia.com",
    notice: "Registrations currently OPEN. Essential for global university admissions and foreign tech visas.",
  },
  {
    id: "exam-jlpt",
    examName: "JLPT",
    fullTitle: "Japanese-Language Proficiency Test (N5 to N1)",
    conductingBody: "Japan Foundation / ABK-AOTS DOSOKAI (Chennai & National Centers)",
    examDates: "Sunday, July 5, 2026 & Sunday, December 6, 2026",
    registrationStatus: "Closed", // Per user instruction: if closed, direct link is NOT shown!
    notice: "Registrations CLOSED for current cycle. Official registration window opens on March 15, 2026 for the July test.",
    // directRegistrationUrl is purposefully omitted/undefined when closed!
  },
];

// -------------------------------------------------------------
// 7. TAILORED APTITUDE QUESTIONS BY QUALIFICATION LEVEL
// -------------------------------------------------------------

// Level 1: 12th Std capability (PCM logic, board algebra, probability, sequences)
export const TWELFTH_APTITUDE_QUESTIONS = [
  {
    id: 1,
    question: "A body starts from rest and moves with uniform acceleration of 4 m/s². What distance does it cover in the 5th second?",
    options: ["16 meters", "18 meters", "20 meters", "24 meters"],
    correctIndex: 1, // Sn = u + a/2 (2n - 1) = 0 + 4/2 * (2*5 - 1) = 2 * 9 = 18m
    domain: "Physics (Kinematics)",
  },
  {
    id: 2,
    question: "If two coins are tossed simultaneously, what is the probability of getting at least one head?",
    options: ["1/4", "1/2", "3/4", "1"],
    correctIndex: 2, // Outcomes: HH, HT, TH, TT -> 3/4
    domain: "Mathematics (Probability)",
  },
  {
    id: 3,
    question: "What is the derivative of f(x) = x³ · sin(x) with respect to x?",
    options: ["3x² · cos(x)", "3x² · sin(x) + x³ · cos(x)", "x³ · cos(x) - 3x² · sin(x)", "6x · sin(x)"],
    correctIndex: 1, // Product rule: u'v + uv' = 3x² sin(x) + x³ cos(x)
    domain: "Mathematics (Calculus)",
  },
  {
    id: 4,
    question: "Complete the sequence: 3, 7, 15, 31, 63, ___?",
    options: ["127", "128", "94", "125"],
    correctIndex: 0, // 2n + 1: 63*2 + 1 = 127
    domain: "Logical Reasoning",
  },
  {
    id: 5,
    question: "In a circuit, two resistors of 6 Ω and 12 Ω are connected in parallel. What is their equivalent resistance?",
    options: ["18 Ω", "6 Ω", "4 Ω", "3 Ω"],
    correctIndex: 2, // (6 * 12) / (6 + 12) = 72 / 18 = 4 Ω
    domain: "Physics (Current Electricity)",
  },
  {
    id: 6,
    question: "If log₁₀(x) = 3, what is the value of x?",
    options: ["30", "100", "300", "1000"],
    correctIndex: 3,
    domain: "Mathematics (Algebra)",
  },
  {
    id: 7,
    question: "Which of the following organic functional groups has the highest priority in IUPAC nomenclature?",
    options: ["Aldehyde (-CHO)", "Carboxylic Acid (-COOH)", "Alcohol (-OH)", "Ketone (-C=O)"],
    correctIndex: 1,
    domain: "Chemistry (Organic)",
  },
  {
    id: 8,
    question: "If all P are Q, and some Q are R, which of the following is definitively true?",
    options: ["All P are R", "Some P are R", "All Q are P", "None of these are guaranteed"],
    correctIndex: 3,
    domain: "Logical Deduction",
  },
  {
    id: 9,
    question: "A train 150m long passes an electric pole in 10 seconds. What is the speed of the train in km/h?",
    options: ["45 km/h", "54 km/h", "60 km/h", "72 km/h"],
    correctIndex: 1, // 15 m/s * 18/5 = 54 km/h
    domain: "Speed & Distance",
  },
  {
    id: 10,
    question: "What is the sum of roots for the quadratic equation 2x² - 10x + 7 = 0?",
    options: ["-5", "5", "7/2", "10"],
    correctIndex: 1, // -b/a = -(-10)/2 = 5
    domain: "Mathematics (Polynomials)",
  },
  {
    id: 11,
    question: "If sin(θ) + cos(θ) = √2, what is the value of sin(2θ)?",
    options: ["0", "1/2", "1", "√2"],
    correctIndex: 2, // Squaring both sides: 1 + sin(2θ) = 2 -> sin(2θ) = 1
    domain: "Mathematics (Trigonometry)",
  },
  {
    id: 12,
    question: "A ray of light enters a glass prism of refractive index √3 at an angle of incidence 60°. What is the angle of refraction inside the prism?",
    options: ["30°", "45°", "60°", "90°"],
    correctIndex: 0, // Snell's Law: 1 * sin(60°) = √3 * sin(r) -> (√3/2) = √3 sin(r) -> sin(r) = 1/2 -> r = 30°
    domain: "Physics (Optics)",
  },
  {
    id: 13,
    question: "In a code language, if DELHI is coded as 73541 and CALCUTTA is 82589662, how is CALICUT coded?",
    options: ["8251896", "8251269", "8251396", "8543691"],
    correctIndex: 0, // C=8, A=2, L=5, I=1, C=8, U=9, T=6 -> 8251896
    domain: "Logical Reasoning (Coding)",
  },
  {
    id: 14,
    question: "What is the maximum number of electrons that can be accommodated in an orbital shell with principal quantum number n = 3?",
    options: ["8", "14", "18", "32"],
    correctIndex: 2, // 2n² = 2*(3²) = 18 electrons
    domain: "Chemistry (Atomic Structure)",
  },
  {
    id: 15,
    question: "A cylindrical tank has radius 7m and height 10m. What is the total volume in cubic meters? (Use π = 22/7)",
    options: ["770 m³", "1,540 m³", "2,200 m³", "3,080 m³"],
    correctIndex: 1, // V = πr²h = (22/7)*49*10 = 1540 m³
    domain: "Quantitative Geometry",
  },
];

// Level 2: UG Pursuing 1st & 2nd Year (Basic MNC hiring aptitude, logical reasoning, critical thinking)
export const UG_JUNIOR_APTITUDE_QUESTIONS = [
  {
    id: 1,
    question: "Pointing to a man in a photograph, Priya said: 'His mother's only son is my father.' How is Priya related to the man?",
    options: ["Sister", "Mother", "Daughter", "Niece"],
    correctIndex: 2, // Mother's only son is the man himself. He is Priya's father. Priya is his daughter.
    domain: "Logical Reasoning (Blood Relations)",
  },
  {
    id: 2,
    question: "If 'CLOUD' is coded as 'DMPVE', how is 'STORM' coded in the same cipher?",
    options: ["TUPSN", "TUPRN", "TSPQN", "UVPTN"],
    correctIndex: 0, // Each letter +1: S->T, T->U, O->P, R->S, M->N
    domain: "Coding & Decoding",
  },
  {
    id: 3,
    question: "A father is 3 times as old as his son. In 12 years, he will be twice as old as his son. What is the son's current age?",
    options: ["10 years", "12 years", "14 years", "16 years"],
    correctIndex: 1, // F = 3S. 3S + 12 = 2(S + 12) -> S = 12.
    domain: "MNC Quantitative Aptitude",
  },
  {
    id: 4,
    question: "Statements: All laptops are screens. Some screens are portable. Conclusions: I. Some laptops are portable. II. All screens are laptops.",
    options: ["Only I follows", "Only II follows", "Both follow", "Neither I nor II follows"],
    correctIndex: 3,
    domain: "Critical Thinking (Syllogisms)",
  },
  {
    id: 5,
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree (AVL / Red-Black Tree)?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctIndex: 1,
    domain: "Basic Computer Science",
  },
  {
    id: 6,
    question: "A pipe can fill a cistern in 6 hours, while another empties it in 8 hours. If both open together, how long to fill the cistern?",
    options: ["14 hours", "20 hours", "24 hours", "48 hours"],
    correctIndex: 2, // 1/6 - 1/8 = 1/24 -> 24 hours
    domain: "Time & Work (Pipes & Cisterns)",
  },
  {
    id: 7,
    question: "What is the missing number in matrix: Row 1: [4, 9, 2], Row 2: [3, 5, 7], Row 3: [8, 1, ?] (Row sums = 15)?",
    options: ["5", "6", "4", "7"],
    correctIndex: 1, // 8 + 1 + 6 = 15 (Lo Shu Magic Square)
    domain: "Spatial & Pattern Reasoning",
  },
  {
    id: 8,
    question: "If a shopkeeper marks an item 40% above cost and offers a 20% discount, what is his net profit percentage?",
    options: ["12%", "15%", "18%", "20%"],
    correctIndex: 0, // 100 -> 140 -> 140 - 28 = 112 -> 12% profit
    domain: "Commercial Mathematics",
  },
  {
    id: 9,
    question: "Which data structure operates strictly on First-In-First-Out (FIFO) principle?",
    options: ["Stack", "Queue", "Max Heap", "Binary Tree"],
    correctIndex: 1,
    domain: "Data Structures",
  },
  {
    id: 10,
    question: "Find the odd one out: 64, 125, 216, 343, 512, 729, 1000, 1331, 1500?",
    options: ["343", "729", "1331", "1500"],
    correctIndex: 3, // All others are perfect cubes: 4³, 5³, 6³, 7³, 8³, 9³, 10³, 11³. 1500 is not.
    domain: "Number Series",
  },
  {
    id: 11,
    question: "A car travels the first half of a distance at 40 km/h and the second half at 60 km/h. What is the average speed for the entire journey?",
    options: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
    correctIndex: 0, // Harmonic mean: 2*40*60 / (40+60) = 48 km/h
    domain: "Quantitative Aptitude",
  },
  {
    id: 12,
    question: "Seven people A, B, C, D, E, F, G sit in a circle facing the center. B is between A and C. G is to the immediate right of E. If D is third to the left of B, who is opposite to B?",
    options: ["D", "E", "F", "G"],
    correctIndex: 0,
    domain: "Seating Arrangements",
  },
  {
    id: 13,
    question: "What is the decimal output of the logical bitwise AND operation: (12 & 10)?",
    options: ["6", "8", "10", "14"],
    correctIndex: 1, // 1100 & 1010 = 1000 = 8
    domain: "Computer Architecture Logic",
  },
  {
    id: 14,
    question: "In a group of 100 students, 60 study Python, 45 study Java, and 20 study both. How many study neither language?",
    options: ["10", "15", "20", "25"],
    correctIndex: 1, // 100 - (60 + 45 - 20) = 15
    domain: "Set Theory & Venn Diagrams",
  },
  {
    id: 15,
    question: "Statements: Some keys are doors. All doors are locks. All locks are keys. Which conclusion is definitively valid?",
    options: ["All doors are keys", "No key is a lock", "Some locks are not doors", "None of these"],
    correctIndex: 0,
    domain: "Deductive Logic (Syllogisms)",
  },
];

// Level 3: UG Completed & UG 3rd/4th Year (MNC placement level - TCS NQT, Cognizant, Infosys SP, Amazon OA)
export const UG_SENIOR_APTITUDE_QUESTIONS = [
  {
    id: 1,
    question: "In how many distinct ways can the letters of the word 'EQUATION' be arranged such that all 5 vowels always appear together?",
    options: ["720", "2,880", "14,400", "40,320"],
    correctIndex: 1, // Vowels: E, U, A, I, O (5). Consonants: Q, T, N (3). Units: 3+1 = 4 units -> 4! * 5! = 24 * 120 = 2,880
    domain: "Permutations & Combinations",
  },
  {
    id: 2,
    question: "Two trains of length 140m and 160m travel in opposite directions at 60 km/h and 48 km/h. How many seconds do they take to cross each other?",
    options: ["8.0 seconds", "10.0 seconds", "12.5 seconds", "15.0 seconds"],
    correctIndex: 1, // Relative speed = 108 km/h = 30 m/s. Total distance = 300m. Time = 300 / 30 = 10 seconds.
    domain: "Speed, Distance & Time",
  },
  {
    id: 3,
    question: "A and B can do a piece of work in 12 days and 18 days respectively. A works for 4 days alone, then B joins. How many total days to finish?",
    options: ["8.8 days", "9.6 days", "10.4 days", "11.2 days"],
    correctIndex: 0, // A in 4 days does 4/12 = 1/3. Remaining 2/3. Combined rate = 1/12 + 1/18 = 5/36. Time = (2/3) / (5/36) = 24/5 = 4.8 days. Total = 4 + 4.8 = 8.8 days.
    domain: "Time & Work",
  },
  {
    id: 4,
    question: "In a cryptarithmetic puzzle: SEND + MORE = MONEY. What is the value of the letter 'M'?",
    options: ["0", "1", "2", "9"],
    correctIndex: 1, // Carry over in addition of two 4-digit numbers cannot exceed 1. Thus M = 1.
    domain: "MNC Placement Logic",
  },
  {
    id: 5,
    question: "Which of the following database isolation levels completely prevents 'Phantom Reads'?",
    options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"],
    correctIndex: 2,
    domain: "Database Internals",
  },
  {
    id: 6,
    question: "What is the expected average case time complexity of QuickSelect to find the K-th smallest element in an unsorted array?",
    options: ["O(log N)", "O(N)", "O(N log N)", "O(N²)"],
    correctIndex: 1, // QuickSelect average is linear O(N)
    domain: "Algorithms & System Design",
  },
  {
    id: 7,
    question: "A sum of ₹12,000 becomes ₹15,972 in 3 years at compound interest compounded annually. What is the rate of interest per annum?",
    options: ["8%", "10%", "12%", "15%"],
    correctIndex: 1, // (15972/12000)^(1/3) = (1.331)^(1/3) = 1.10 -> 10%
    domain: "Quantitative Finance",
  },
  {
    id: 8,
    question: "If a fair 6-sided die is rolled 3 times, what is the probability that the sum of the numbers is strictly equal to 6?",
    options: ["5/108", "10/216", "7/216", "25/216"],
    correctIndex: 1, // Compositions of 6 into 3 positive integers: (6-1)C(3-1) = 5C2 = 10. 10 / 216.
    domain: "Probability & Statistics",
  },
  {
    id: 9,
    question: "In a binary max-heap with N distinct elements, what is the worst-case asymptotic time complexity of building the heap from an unsorted array (bottom-up build_heap) versus inserting elements sequentially?",
    options: ["O(N) for bottom-up build vs O(N log N) for sequential inserts", "O(N log N) for bottom-up build vs O(N) for sequential inserts", "O(N²) for bottom-up vs O(N log N) for sequential inserts", "O(log N) for both approaches"],
    correctIndex: 0,
    domain: "Data Structures (Heaps)",
  },
  {
    id: 10,
    question: "Given the recurrence relation T(n) = 2T(n/2) + n log(n), what is its tight asymptotic bound Θ using the Master Theorem?",
    options: ["Θ(n log² n)", "Θ(n log n)", "Θ(n²)", "Θ(n² log n)"],
    correctIndex: 0,
    domain: "Algorithm Complexity",
  },
  {
    id: 11,
    question: "Pipe A fills a reservoir in 10 hours and Pipe B fills it in 15 hours. Due to a leak at the bottom, it takes 2 hours longer to fill the reservoir with both pipes open. How long will the leak alone take to empty the full reservoir?",
    options: ["20 hours", "24 hours", "30 hours", "40 hours"],
    correctIndex: 1, // Combined fill rate without leak = 1/10 + 1/15 = 1/6 (6h). With leak = 8h. Leak rate = 1/6 - 1/8 = 1/24 -> 24 hours.
    domain: "Quantitative Aptitude (Pipes)",
  },
  {
    id: 12,
    question: "Which of the following conditions is NOT one of Coffman's four necessary conditions for deadlock to occur in an operating system?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption of allocated resources", "Circular Wait"],
    correctIndex: 2, // Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. "Preemption" prevents deadlock.
    domain: "Operating Systems",
  },
  {
    id: 13,
    question: "A network engineer assigns the CIDR block 192.168.10.0/26. How many valid assignable host IP addresses are available within this subnet?",
    options: ["62 hosts", "64 hosts", "126 hosts", "254 hosts"],
    correctIndex: 0, // 2^(32-26) - 2 = 64 - 2 = 62 hosts
    domain: "Computer Networks (Subnetting)",
  },
  {
    id: 14,
    question: "A bag contains 4 red and 6 black balls. Two balls are drawn successively at random without replacement. What is the probability that both drawn balls are red?",
    options: ["2/15", "4/25", "1/5", "8/45"],
    correctIndex: 0, // (4/10) * (3/9) = 12/90 = 2/15
    domain: "Probability & Permutations",
  },
  {
    id: 15,
    question: "Statement: 'Despite elevated macroeconomic interest rates, enterprise adoption of Generative AI platforms accelerated by 180% year-over-year.' Which assumption is implicit?",
    options: [
      "Elevated interest rates typically suppress enterprise capital expenditure and exploratory technology spending",
      "All enterprises have completely decommissioned legacy databases in favor of vector search",
      "Generative AI platforms are immune to data governance regulations",
      "Traditional cloud software providers reported negative net revenue"
    ],
    correctIndex: 0,
    domain: "Critical & Verbal Reasoning",
  },
];

// Level 4: PG & PG Pursuing (Advanced MNC quiz, research reasoning, and course-specific questions)
export const PG_TECHNICAL_QUESTIONS = [
  {
    id: 1,
    question: "Why does the Scaled Dot-Product Attention in Transformer architectures divide by √dₖ (square root of key dimension)?",
    options: [
      "To prevent dot products from growing excessively large, which pushes the softmax function into regions with vanishing gradients",
      "To normalize key embeddings to unit length L2 ball",
      "To reduce memory bandwidth during cross-attention",
      "To ensure bidirectional self-attention symmetry",
    ],
    correctIndex: 0,
    domain: "Deep Learning (Attention Mechanisms)",
  },
  {
    id: 2,
    question: "In distributed machine learning, what is the primary architectural difference between FSDP (Fully Sharded Data Parallel) and standard DDP (Distributed Data Parallel)?",
    options: [
      "DDP shards model parameters, gradients, and optimizer states across GPUs, while FSDP duplicates them.",
      "FSDP shards model parameters, gradients, and optimizer states across all ranks, trading communication bandwidth for zero redundant GPU memory.",
      "FSDP is strictly CPU-bound, whereas DDP runs only on Tensor Cores.",
      "FSDP requires asynchronous parameter servers, while DDP is completely decentralized.",
    ],
    correctIndex: 1,
    domain: "Distributed Computing & MLOps",
  },
  {
    id: 3,
    question: "In vector databases, what is the core structural graph principle behind HNSW (Hierarchical Navigable Small World)?",
    options: [
      "Multi-layered graph with skip-list probabilistic hierarchies allowing logarithmic approximate nearest neighbor routing",
      "B-Tree disk-based page clustering indexed by cosine similarity",
      "K-D Tree hypercube space partitioning with orthogonal bounding boxes",
      "Uniform grid hashing using cryptographic SHA-256",
    ],
    correctIndex: 0,
    domain: "Vector Databases & Search",
  },
  {
    id: 4,
    question: "In statistical learning, which condition guarantees that the Maximum Likelihood Estimator (MLE) is asymptotically normal and efficient?",
    options: [
      "Cramér-Rao regularity conditions and identifiability of parameter space",
      "Linear independence of predictors without Gauss-Markov assumptions",
      "Zero correlation between error terms and dependent variable",
      "Laplace prior assumption on parameter distributions",
    ],
    correctIndex: 0,
    domain: "Statistical Machine Learning",
  },
  {
    id: 5,
    question: "In the Raft consensus algorithm, under what exact condition can a cluster leader commit an entry from a previous term?",
    options: [
      "Only after an entry from its current term has been committed by storing it on a majority of servers",
      "Immediately upon receiving acknowledgment from at least one follower",
      "Whenever the term number is an even integer",
      "After executing a two-phase rollback commit",
    ],
    correctIndex: 0,
    domain: "Distributed Systems Consensus",
  },
  {
    id: 6,
    question: "In Low-Rank Adaptation (LoRA), how does decomposing a weight update matrix ΔW into two low-rank matrices B and A (where ΔW = B · A) reduce memory footprint during fine-tuning?",
    options: [
      "By constraining the rank r << min(d, k), dramatically reducing the number of trainable parameters and optimizer states without modifying frozen base weights",
      "By pruning 90% of model attention heads via L1 regularization",
      "By quantizing all 32-bit floating point weights into ternary 1.58-bit representations",
      "By eliminating all backpropagation passes through feedforward blocks"
    ],
    correctIndex: 0,
    domain: "Generative AI (Parameter-Efficient Fine-Tuning)",
  },
  {
    id: 7,
    question: "How does the Linux `splice()` or `sendfile()` system call achieve true 'Zero-Copy' data streaming from disk storage to a network socket?",
    options: [
      "By transferring data directly within kernel page cache buffers via DMA without copying pages across the user-space boundary",
      "By caching all socket descriptors directly within CPU L1 instruction cache",
      "By disabling TCP window scaling and cryptographic integrity checks",
      "By bypassing physical RAM and writing directly into network interface EEPROM"
    ],
    correctIndex: 0,
    domain: "Systems Programming (Kernel & I/O)",
  },
  {
    id: 8,
    question: "Under the PACELC theorem, if a distributed database system experiences network partitioning (P), it trades off Availability (A) versus Consistency (C); Else (E), when execution is healthy, what trade-off is governed?",
    options: [
      "Latency (L) versus Consistency (C)",
      "Linearizability (L) versus Concurrency (C)",
      "Throughput (T) versus Fault Tolerance (F)",
      "Durability (D) versus Atomicity (A)"
    ],
    correctIndex: 0,
    domain: "Distributed Systems Architecture",
  },
  {
    id: 9,
    question: "In PPO-based Reinforcement Learning from Human Feedback (RLHF), why is a Kullback-Leibler (KL) divergence penalty enforced between the active policy and the frozen reference model?",
    options: [
      "To prevent the policy model from drifting too far from the reference model and degenerating into reward hacking or mode collapse",
      "To maximize generation temperature across multinomial sampling rounds",
      "To compute supervised teacher-forcing cross-entropy loss",
      "To reduce the variance of the generalized advantage estimator across mini-batches"
    ],
    correctIndex: 0,
    domain: "Reinforcement Learning & Alignment",
  },
  {
    id: 10,
    question: "For a real-valued continuous function f(x) defined on a non-empty convex set, what fundamental mathematical property ensures that every local minimum is also guaranteed to be a global minimum?",
    options: [
      "Convexity of f(x) across the domain",
      "Zero second derivative everywhere",
      "Strict Lipschitz continuity with Lipschitz constant L < 1",
      "Radial symmetry with respect to the coordinate origin"
    ],
    correctIndex: 0,
    domain: "Convex Optimization",
  },
  {
    id: 11,
    question: "How does the FlashAttention algorithm achieve a 2x to 4x wall-clock speedup over classical Transformer multi-head attention?",
    options: [
      "By tiling Query, Key, and Value blocks within fast GPU on-chip SRAM and computing softmax incrementally online without materializing the full N×N intermediate matrix in slow HBM",
      "By quantizing attention weights to 4-bit integers during runtime execution",
      "By routing attention computations asynchronously to host CPU memory",
      "By replacing matrix multiplications with randomized approximate nearest neighbor projections"
    ],
    correctIndex: 0,
    domain: "Hardware Acceleration & GPU Architecture",
  },
  {
    id: 12,
    question: "Under which specific workload characteristic is a Bitmap Index architecturally superior in query throughput and storage compression compared to a B+ Tree index?",
    options: [
      "Low cardinality columns (few distinct values) evaluated in high-concurrency multi-attribute Boolean analytical filter queries (AND/OR/NOT)",
      "Columns with uniformly distributed unique primary key UUIDs",
      "High write-throughput OLTP workloads with millions of single-row concurrent inserts",
      "Unstructured textual corpus requiring fuzzy trigram similarity searches"
    ],
    correctIndex: 0,
    domain: "Database Systems & Storage Engines",
  },
  {
    id: 13,
    question: "In Bayesian statistics and generative models (such as Latent Dirichlet Allocation), which probability distribution is the natural conjugate prior for the multinomial likelihood distribution?",
    options: [
      "Dirichlet distribution",
      "Gaussian (Normal) distribution",
      "Student-t distribution",
      "Poisson distribution"
    ],
    correctIndex: 0,
    domain: "Bayesian Statistics & Generative Models",
  },
  {
    id: 14,
    question: "In zero-knowledge succinct non-interactive arguments of knowledge (zk-SNARKs), what does the term 'succinct' specifically define?",
    options: [
      "The generated proof is extremely small (a few hundred bytes) and verification takes negligible constant or logarithmic time regardless of statement complexity",
      "Private witness keys are encoded using lossy Huffman compression",
      "Zero communication rounds occur between prover and verifier during setup phase",
      "The polynomial commitment scheme operates strictly without elliptic curves"
    ],
    correctIndex: 0,
    domain: "Applied Cryptography & Zero-Knowledge",
  },
  {
    id: 15,
    question: "Which algorithm computes all-pairs shortest paths on a directed graph with arbitrary (including negative, but no negative cycles) edge weights in O(V² log V + VE) asymptotic time?",
    options: [
      "Johnson's Algorithm (reweighting edges via Bellman-Ford followed by Dijkstra from every vertex)",
      "Floyd-Warshall Dynamic Programming Algorithm",
      "Kruskal's Minimum Spanning Tree Algorithm",
      "Tarjan's Strongly Connected Components Algorithm"
    ],
    correctIndex: 0,
    domain: "Advanced Graph Algorithms",
  },
];

