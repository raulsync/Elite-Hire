# EliteHire

EliteHire is a production-grade MERN stack job portal application designed to connect job seekers with employers, supercharged with advanced AI screening and real-time collaboration tools.

This repository represents a robust portfolio project demonstrating production engineering practices, including structured logging, security hardening, real-time WebSocket communication, and integration with the Google Gemini API.

---

## Key Highlights & Production-Grade Features

### 🛡️ 1. Security Hardening & Protection
- **NoSQL Injection Protection**: Active request sanitization using `express-mongo-sanitize` to defend database schemas.
- **HTTP Parameter Pollution (HPP)**: Integration of `hpp` middleware to safeguard request parameters.
- **Payload Size Limits**: Strict `10kb` request body sizing limits to prevent memory exhaustion / Denial of Service (DoS) attacks.
- **Configurable CORS & Helmet**: Custom HTTP security headers via `helmet` and environment-configured CORS policy matching target deployment environments.
- **Role-Based Access Control (RBAC)**: Custom middlewares protecting administrative paths for Recruiters while isolating candidate features.
- **Leak Protection**: Clean, secure user authentication responses that strip out hashes and private keys prior to client transmission.

### 🤖 2. AI Resume Parser
- **Google Gemini Integration**: Uses `gemini-1.5-flash` to extract structured profile information (Bio, Skills, Experience, Education) from uploaded resumes (PDF, TXT, DOCX).
- **Graceful Local Fallback**: Seamless offline parsing fallback using specialized regex heuristic patterns if API keys are missing.
- **One-Click Autofill**: Front-end parsing interface with a review panel allowing candidates to auto-populate their profile with parsed data.

### 📊 3. Recruiter Analytics Dashboard
- **Aggregate Dashboards**: MongoDB Aggregation pipelines calculating pipeline metrics.
- **Hiring Funnel**: Custom funnel visualization mapping progress from applied to screened, interviewed, and hired.
- **Application Trends**: Time-series charts tracing application counts over the last 30 days.
- **Skill Pool Analyzer**: Distribution analysis of candidate skills to identify talent density.
- **Recharts Integration**: Visually stunning, responsive charts styled with Outfit/Inter typography and tailored CSS gradients.

### ⚡ 4. Real-Time Notification System
- **WebSocket Infrastructure**: Event-driven architecture utilizing `Socket.IO` supporting multi-tab active user synchronizations.
- **Recruiter Alerts**: Real-time push updates triggered on application submission.
- **Applicant Alerts**: Instant status updates when application status changes (Pending → Interview → Accepted/Rejected).
- **Persisted Notifications**: Database backing to review notification history with read/unread statuses.

### 🧠 5. Smart Job Recommendations
- **Skill Matching Matrix**: Dynamic matching algorithm pairing student skill profiles with job description requirements.
- **Match Score Badges**: Displays percentage match scores and lists matching skill tags directly on job cards to guide applicants.

### 📝 6. Code Quality & Structured Logging
- **Winston Structured Logger**: Complete removal of scattered `console.log` calls in favor of a standard Winston logger. Generates formatted console output in development and automatic JSON log files in production.
- **Centralized Client Types**: Clear TypeScript interfaces mapping application states inside `client/src/types/index.ts`.

---

## Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Redux Toolkit, React Query, Recharts, Lucide React
- **Backend**: Node.js, Express.js, TypeScript, Socket.IO, Winston, Mongoose
- **Database**: MongoDB (Atlas)
- **AI Integrations**: Google Gemini API via `@langchain/google-genai`
- **File Storage**: Cloudinary

---

## Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB (Atlas or Local)
- Cloudinary Account (for image/resume uploads)
- Google Gemini API Key (Optional, falls back to regex-based parser if omitted)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/raulsync/Elite-Hire.git
   cd Elite-Hire
   ```

2. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set Up Environment Variables**
   
   Configure environment settings by renaming `.env.example` templates to `.env`:

   **Server Configuration (`server/.env`)**:
   ```env
   PORT=7777
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET_KEY=your_jwt_signing_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CORS_ORIGIN=http://localhost:5173
   GEMINI_API_KEY=your_gemini_api_key
   ```

   **Client Configuration (`client/.env`)**:
   ```env
   VITE_API_BASE_URL=http://localhost:7777/api
   ```

4. **Run Development Servers**
   ```bash
   # In server folder
   npm run dev

   # In client folder
   npm run dev
   ```

---

## Directory Overview

```text
├── client
│   ├── src
│   │   ├── components      # UI, layout, and feature components (ResumeParser, NotificationBell)
│   │   ├── hooks           # API hooks & state trackers
│   │   ├── lib             # Axios client wrapper
│   │   ├── pages           # Router targets (Home, Detail, Dashboard)
│   │   ├── store           # Redux slices (auth, jobs, companies)
│   │   └── types           # Centralized type declarations
└── server
    ├── src
    │   ├── config          # Database, Cloudinary configuration
    │   ├── controllers     # User, Job, Company, Notification, Analytics controllers
    │   ├── middlewares     # Security, Auth, Upload and Global error middlewares
    │   ├── models          # Mongoose Schemas (User, Job, Application, Notification)
    │   ├── router          # Express Route mappings
    │   └── utils           # Winston logger, Gemini client, Socket.IO wrapper
```
