import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FiCheck, FiAward, FiAlertCircle, FiMic } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import ScoreRing from "../components/ScoreRing";

function Result() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const isVoice = result?.interviewType === "voice";

  const getResult = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/interview/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  const correctCount = result?.questions?.reduce((count, q, i) => {
    return result.answers?.[i] === q.answer ? count + 1 : count;
  }, 0) ?? 0;

  const totalQuestions = result?.questions?.length ?? 0;
  const incorrectCount = totalQuestions - correctCount;

  const avgQuestionScore =
    result?.questionEvaluations?.length > 0
      ? Math.round(
          result.questionEvaluations.reduce((s, e) => s + e.score, 0) /
            result.questionEvaluations.length
        )
      : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-page" style={{ minHeight: "50vh" }}>
          <div className="spinner" />
          <p>{isVoice ? "AI is evaluating your answers..." : "Calculating your results..."}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!result) {
    return (
      <DashboardLayout title="Result Not Found">
        <div className="empty-state">
          <h3>Unable to load results</h3>
          <p>The interview result could not be found.</p>
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: "1rem" }}>
            Back to Dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="result-hero">
        <h2>{isVoice ? "HR Interview Complete!" : "Test Complete!"}</h2>
        <p className="result-category">
          {result.category} Interview
          {isVoice && (
            <span className="voice-result-tag"><FiMic /> AI Evaluated</span>
          )}
        </p>

        <ScoreRing score={result.score ?? 0} />

        {isVoice ? (
          <div className="score-stats">
            <div className="score-stat">
              <div className="score-stat-value">{result.score ?? 0}%</div>
              <div className="score-stat-label">Overall Score</div>
            </div>
            <div className="score-stat">
              <div className="score-stat-value">{avgQuestionScore}%</div>
              <div className="score-stat-label">Avg per Answer</div>
            </div>
            <div className="score-stat">
              <div className="score-stat-value">{totalQuestions}</div>
              <div className="score-stat-label">Questions</div>
            </div>
          </div>
        ) : (
          <div className="score-stats">
            <div className="score-stat">
              <div className="score-stat-value">{correctCount}</div>
              <div className="score-stat-label">Correct</div>
            </div>
            <div className="score-stat">
              <div className="score-stat-value">{incorrectCount}</div>
              <div className="score-stat-label">Incorrect</div>
            </div>
            <div className="score-stat">
              <div className="score-stat-value">{totalQuestions}</div>
              <div className="score-stat-label">Total Questions</div>
            </div>
          </div>
        )}
      </div>

      {isVoice && result.questionEvaluations?.length > 0 && (
        <div className="question-evaluations">
          <h2 className="section-title">Answer-by-Answer Evaluation</h2>
          {result.questionEvaluations.map((item, index) => (
            <div className="eval-card" key={index}>
              <div className="eval-card-header">
                <span className="question-number">{item.questionIndex + 1}</span>
                <span className={`score-badge ${getScoreClass(item.score)}`}>
                  {item.score}%
                </span>
              </div>
              <p className="eval-question">{item.question}</p>
              <p className="eval-answer"><strong>Your answer:</strong> {item.answer}</p>
              <p className="eval-feedback">{item.feedback}</p>
            </div>
          ))}
        </div>
      )}

      <div className="result-grid">
        <div className="feedback-box">
          <h3><FiAward /> Overall Feedback</h3>
          <p>{result.feedback || "No feedback available."}</p>
        </div>

        <div className="strength-box">
          <h3><FiCheck /> Strengths</h3>
          <ul>
            {(result.strengths ?? []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="improvement-box">
          <h3><FiAlertCircle /> Areas to Improve</h3>
          <ul>
            {(result.improvements ?? []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="result-actions">
        <Link to="/dashboard" className="btn btn-primary">
          Take Another Test
        </Link>
        <Link to="/history" className="btn btn-secondary">
          View History
        </Link>
      </div>
    </DashboardLayout>
  );
}

function getScoreClass(score) {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "average";
  return "poor";
}

export default Result;
