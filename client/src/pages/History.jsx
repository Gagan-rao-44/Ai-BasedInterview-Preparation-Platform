import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";

function getScoreBadgeClass(score) {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  return "poor";
}

function History() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/interview/history",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInterviews(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <DashboardLayout
      title="Interview History"
      subtitle="Review your past mock interviews and scores"
    >
      {loading ? (
        <div className="loading-page" style={{ minHeight: "40vh" }}>
          <div className="spinner" />
          <p>Loading history...</p>
        </div>
      ) : interviews.length === 0 ? (
        <div className="empty-state">
          <h3>No interviews yet</h3>
          <p>Start your first mock interview from the dashboard.</p>
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="history-list">
          {interviews.map((item) => (
            <div className="history-card" key={item._id}>
              <div className="history-card-header">
                <h2>
                  {item.category}
                  {item.interviewType === "voice" && (
                    <span className="voice-history-tag">Voice</span>
                  )}
                </h2>
                {item.completed && (
                  <span className={`score-badge ${getScoreBadgeClass(item.score)}`}>
                    {item.score}%
                  </span>
                )}
              </div>

              <span
                className={`status-badge ${
                  item.completed ? "completed" : "pending"
                }`}
              >
                {item.completed ? "Completed" : "Pending"}
              </span>

              {item.completed && item.feedback && (
                <p>{item.feedback}</p>
              )}

              {item.completed && (
                <Link to={`/result/${item._id}`} className="view-result-link">
                  View Full Results <FiArrowRight />
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default History;
