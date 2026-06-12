import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCode, FiCoffee, FiTerminal, FiMessageCircle } from "react-icons/fi";

const categoryIcons = {
  "MERN Stack": FiCode,
  Java: FiCoffee,
  Python: FiTerminal,
  "HR Round": FiMessageCircle,
};

function CategoryCard({ title, description }) {
  const navigate = useNavigate();
  const Icon = categoryIcons[title] || FiCode;

  const startInterview = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/interview/create",
        { category: title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(
        response.data.interviewType === "voice"
          ? `/hr-interview/${response.data._id}`
          : `/interview/${response.data._id}`
      );
    } catch (error) {
      console.log(error);
      alert("Failed to start interview. Please try again.");
    }
  };

  return (
    <div className="category-card">
      <div className="category-card-icon"><Icon /></div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={startInterview}>Start Mock Interview</button>
    </div>
  );
}

export default CategoryCard;
