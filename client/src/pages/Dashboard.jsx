import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiClipboard, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import CategoryCard from "../components/CategoryCard";

function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/interview/stats/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <header className="page-header">
          <h1 className="page-title">Welcome back, {user?.name}</h1>
          <p className="page-subtitle">Track your progress and start a new mock interview</p>
        </header>

        <div className="dashboard-cards">
          <DashboardCard
            title="Total Interviews"
            value={stats?.totalInterviews || 0}
            icon={FiClipboard}
            color="blue"
          />
          <DashboardCard
            title="Average Score"
            value={`${stats?.averageScore || 0}%`}
            icon={FiTrendingUp}
            color="green"
          />
          <DashboardCard
            title="Completed"
            value={stats?.completed || 0}
            icon={FiCheckCircle}
            color="purple"
          />
        </div>

        <h2 className="section-title">Choose an Interview Category</h2>

        <div className="category-grid">
          <CategoryCard
            title="MERN Stack"
            description="Frontend and backend questions covering React, Node.js, MongoDB, and Express."
          />
          <CategoryCard
            title="Java"
            description="Core Java, OOP concepts, collections, and object-oriented design patterns."
          />
          <CategoryCard
            title="Python"
            description="Python fundamentals, data structures, and common programming concepts."
          />
          <CategoryCard
            title="HR Round"
            description="Voice-based behavioral interview with AI evaluation of your spoken answers."
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
