import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const getInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/interview/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInterview(response.data);
      setAnswers(new Array(response.data.questions.length).fill(""));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterview();
  }, []);

  const selectOption = (questionIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);
  };

  const answeredCount = answers.filter((a) => a !== "").length;
  const totalQuestions = interview?.questions?.length ?? 0;
  const progressPercent = totalQuestions ? (answeredCount / totalQuestions) * 100 : 0;
  const allAnswered = answeredCount === totalQuestions && totalQuestions > 0;

  const submitHandler = async () => {
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/interview/submit/${id}`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/result/${response.data._id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to submit interview. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-page" style={{ minHeight: "50vh" }}>
          <div className="spinner" />
          <p>Loading interview questions...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={`${interview?.category} Interview`}
      subtitle="Select the best answer for each question"
    >
      <div className="interview-progress">
        <div className="progress-header">
          <span>
            Progress: <strong>{answeredCount} / {totalQuestions}</strong> answered
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="question-list">
        {interview?.questions.map((item, index) => (
          <div
            className={`question-card${answers[index] ? " answered" : ""}`}
            key={index}
          >
            <h3>
              <span className="question-number">{index + 1}</span>
              {item.question}
            </h3>

            <div className="options-box">
              {item.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`option-btn${
                    answers[index] === option ? " selected-option" : ""
                  }`}
                  onClick={() => selectOption(index, option)}
                >
                  <span className="option-indicator" />
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="interview-actions">
        <button
          className="submit-btn"
          onClick={submitHandler}
          disabled={!allAnswered || submitting}
        >
          {submitting ? "Submitting..." : "Submit & View Score"}
        </button>
        {!allAnswered && (
          <span className="submit-hint">
            Answer all {totalQuestions} questions to submit
          </span>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Interview;
