import { Link } from "react-router-dom";
import { FiCpu, FiTarget, FiTrendingUp, FiFileText, FiZap, FiMessageCircle } from "react-icons/fi";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-badge">
          <FiZap /> AI-Powered Interview Prep
        </div>

        <h1 className="hero-title">
          Ace Your Next Interview with <span>Smart Practice</span>
        </h1>

        <p className="hero-subtitle">
          Prepare for technical and HR rounds with AI-generated mock interviews,
          instant scoring, and personalized feedback to boost your confidence.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Get Started Free
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Sign In
          </Link>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>4+</h3>
            <p>Interview Categories</p>
          </div>
          <div className="stat-item">
            <h3>20</h3>
            <p>Questions Per Test</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Instant AI Feedback</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <h2>Everything You Need to Succeed</h2>
          <p>Comprehensive tools designed to help you land your dream job</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FiCpu /></div>
            <h3>AI Mock Interviews</h3>
            <p>Practice with category-specific MCQ tests covering MERN, Java, Python, and HR rounds.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiTarget /></div>
            <h3>Instant Scoring</h3>
            <p>Get your score immediately after completing a test with detailed performance breakdown.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiTrendingUp /></div>
            <h3>Performance Tracking</h3>
            <p>Track your progress over time with interview history and average score analytics.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiFileText /></div>
            <h3>Resume Analyzer</h3>
            <p>Upload your resume and receive AI-powered feedback with actionable improvement tips.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiMessageCircle /></div>
            <h3>HR Voice Interviews</h3>
            <p>Answer behavioral questions by voice and receive AI-powered evaluation on clarity and communication.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FiZap /></div>
            <h3>Quick & Easy</h3>
            <p>Start a mock interview in seconds — no setup required, just pick a category and go.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
