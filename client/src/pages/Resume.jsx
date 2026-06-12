import { useState, useRef } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import ScoreRing from "../components/ScoreRing";

function Resume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  return (
    <DashboardLayout
      title="Resume Analyzer"
      subtitle="Upload your resume to get an AI-powered score and suggestions"
    >
      <form onSubmit={uploadHandler}>
        <div
          className="upload-zone"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-zone-icon"><FiUploadCloud /></div>
          <h3>{file ? file.name : "Drop your resume here or click to browse"}</h3>
          <p>Supports PDF, DOC, and DOCX files</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!file || loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && (
        <div className="resume-result">
          <div className="resume-score-row">
            <ScoreRing score={result.score ?? 0} size={140} />
            <div>
              <h2 style={{ marginBottom: "0.5rem" }}>Resume Score</h2>
              <p style={{ color: "var(--text-secondary)" }}>{result.feedback}</p>
            </div>
          </div>

          <div className="improvement-box" style={{ marginTop: "1.5rem" }}>
            <h3>Suggestions</h3>
            <ul>
              {(result.suggestions ?? []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Resume;
