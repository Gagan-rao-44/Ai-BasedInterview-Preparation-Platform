import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiMic,
  FiMicOff,
  FiVolume2,
  FiChevronRight,
  FiChevronLeft,
  FiCheck,
} from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import { useSpeechRecognition, useSpeechSynthesis } from "../hooks/useSpeech";

function HRInterview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    transcript,
    setTranscript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  const totalQuestions = interview?.questions?.length ?? 0;
  const currentQuestion = interview?.questions?.[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

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

  useEffect(() => {
    if (currentQuestion?.question) {
      const timer = setTimeout(() => {
        speak(currentQuestion.question);
      }, 600);
      return () => {
        clearTimeout(timer);
        stop();
      };
    }
  }, [currentIndex, currentQuestion?.question]);

  useEffect(() => {
    if (answers[currentIndex]) {
      setTranscript(answers[currentIndex]);
    } else {
      resetTranscript();
    }
  }, [currentIndex]);

  const handleToggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const saveCurrentAnswer = () => {
    const updated = [...answers];
    updated[currentIndex] = transcript.trim();
    setAnswers(updated);
    return updated;
  };

  const goNext = () => {
    if (!transcript.trim()) {
      alert("Please record or type your answer before continuing.");
      return;
    }
    saveCurrentAnswer();
    stop();
    stopListening();
    setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    saveCurrentAnswer();
    stop();
    stopListening();
    setCurrentIndex((i) => i - 1);
  };

  const submitHandler = async () => {
    if (!transcript.trim()) {
      alert("Please record or type your answer before submitting.");
      return;
    }

    const finalAnswers = saveCurrentAnswer();

    if (finalAnswers.some((a) => !a.trim())) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    stop();
    stopListening();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/interview/submit/${id}`,
        { answers: finalAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/result/${response.data._id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to submit. AI evaluation may take a moment — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = answers.filter((a) => a.trim()).length;
  const progressPercent = totalQuestions
    ? ((currentIndex + (transcript.trim() ? 1 : 0)) / totalQuestions) * 100
    : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-page" style={{ minHeight: "50vh" }}>
          <div className="spinner" />
          <p>Preparing your HR interview...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="HR Voice Interview"
      subtitle="Listen to each question and respond using your voice"
    >
      <div className="voice-interview-badge">
        <FiMic /> Voice-based · AI evaluated
      </div>

      <div className="interview-progress">
        <div className="progress-header">
          <span>
            Question <strong>{currentIndex + 1} / {totalQuestions}</strong>
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="voice-question-card">
        <div className="voice-question-header">
          <span className="question-number">{currentIndex + 1}</span>
          <button
            className="voice-listen-btn"
            onClick={() => speak(currentQuestion?.question)}
            disabled={isSpeaking}
          >
            <FiVolume2 />
            {isSpeaking ? "Speaking..." : "Listen Again"}
          </button>
        </div>

        <h2 className="voice-question-text">{currentQuestion?.question}</h2>

        <div className="voice-answer-section">
          <label className="voice-answer-label">Your Answer</label>

          <div className="voice-controls">
            {isSupported ? (
              <button
                className={`voice-record-btn${isListening ? " recording" : ""}`}
                onClick={handleToggleRecording}
                type="button"
              >
                {isListening ? <FiMicOff /> : <FiMic />}
                {isListening ? "Stop Recording" : "Start Recording"}
              </button>
            ) : (
              <p className="voice-fallback-note">
                Voice input is not supported in this browser. Type your answer below.
              </p>
            )}

            {isListening && (
              <span className="recording-indicator">
                <span className="recording-dot" /> Recording...
              </span>
            )}
          </div>

          <textarea
            className="voice-transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your spoken answer will appear here, or type your response..."
            rows={6}
          />
        </div>
      </div>

      <div className="voice-nav-actions">
        <button
          className="btn btn-secondary"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <FiChevronLeft /> Previous
        </button>

        {isLastQuestion ? (
          <button
            className="submit-btn"
            onClick={submitHandler}
            disabled={submitting || !transcript.trim()}
          >
            {submitting ? "AI Evaluating..." : "Submit & Get Score"}
            {!submitting && <FiCheck />}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={goNext}
            disabled={!transcript.trim()}
          >
            Next Question <FiChevronRight />
          </button>
        )}
      </div>

      <div className="voice-question-dots">
        {interview?.questions.map((_, i) => (
          <button
            key={i}
            className={`voice-dot${
              i === currentIndex ? " active" : ""
            }${answers[i]?.trim() ? " answered" : ""}`}
            onClick={() => {
              saveCurrentAnswer();
              stop();
              stopListening();
              setCurrentIndex(i);
            }}
            title={`Question ${i + 1}`}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default HRInterview;
