# 🚀 AI Interview Preparation Platform

An AI-powered interview preparation platform built using the MERN Stack that helps users practice technical and HR interviews through dynamic AI-generated questions, voice-based assessments, resume analysis, and performance analytics.

---

## 📌 Features

### 🔐 Authentication & Authorization

* Secure JWT-based authentication
* User registration and login
* Protected routes and role-based access

### 🤖 AI-Powered Technical Interviews

* AI-generated MCQ interview questions
* Category-based interview generation (Java, MERN, Python, DBMS, etc.)
* Dynamic question generation using OpenRouter AI APIs
* Automatic answer evaluation
* Score and percentage calculation

### 🎤 HR Voice Interview Module

* Voice-based HR interview questions
* Speech-to-text conversion using browser speech recognition
* Voice answer recording and processing
* Automated HR answer evaluation
* Real-time feedback generation

### 📄 Resume Analyzer

* Resume upload functionality
* Resume parsing and analysis
* Candidate skill assessment
* Resume-based feedback generation

### 📊 Analytics Dashboard

* Interview history tracking
* Performance monitoring
* Score visualization
* Percentage analysis
* Progress tracking dashboard

### 👨‍💼 Admin Dashboard

* User management
* Interview monitoring
* Platform analytics
* Performance insights

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

### Database

* MongoDB
* Mongoose

### AI Integration

* OpenRouter API
* Large Language Models (LLMs)

### Additional Tools

* Multer (File Upload)
* Speech Recognition API
* Git & GitHub

---

## 🏗️ System Architecture

```text
User
  ↓
React Frontend
  ↓
Express.js Backend
  ↓
OpenRouter AI API
  ↓
MongoDB Database
```

---

## 📂 Project Structure

```text
AI-Interview-Preparation-Platform
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
├── uploads
├── README.md
└── package.json
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Interview-Preparation-Platform.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## 🎯 Key Functionalities

### Technical Interview Module

* AI-generated MCQ questions
* Automated scoring system
* Percentage calculation
* Performance evaluation

### HR Interview Module

* Voice-based interviews
* Speech-to-text processing
* HR response evaluation
* Feedback generation

### Resume Analysis

* Resume upload
* Resume evaluation
* Skill extraction
* Personalized suggestions

---

## 📈 Future Enhancements

* Webcam monitoring
* AI-powered coding interviews
* Real-time coding assessments
* Interview scheduling
* Email notifications
* Leaderboards and rankings
* Detailed analytics reports

---

## 👨‍💻 Author

**Gagan**

Computer Science & Engineering Student

---

## ⭐ Project Highlights

* Full-Stack MERN Application
* AI-Powered Interview Generation
* Voice-Based HR Evaluation
* Resume Analysis System
* Real-Time Performance Tracking
* Secure Authentication & Authorization
* Scalable REST API Architecture
* Modern Responsive User Interface

```
```
