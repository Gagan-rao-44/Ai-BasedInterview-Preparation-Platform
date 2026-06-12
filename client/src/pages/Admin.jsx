import { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiClipboard, FiFileText } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

function Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Platform overview and user management"
    >
      {loading ? (
        <div className="loading-page" style={{ minHeight: "40vh" }}>
          <div className="spinner" />
          <p>Loading admin data...</p>
        </div>
      ) : (
        <>
          <div className="dashboard-cards">
            <DashboardCard
              title="Total Users"
              value={stats?.users ?? 0}
              icon={FiUsers}
              color="blue"
            />
            <DashboardCard
              title="Total Interviews"
              value={stats?.interviews ?? 0}
              icon={FiClipboard}
              color="green"
            />
            <DashboardCard
              title="Total Resumes"
              value={stats?.resumes ?? 0}
              icon={FiFileText}
              color="purple"
            />
          </div>

          <h2 className="section-title">Registered Users</h2>

          <div className="admin-users-grid">
            {(stats?.allUsers ?? []).map((user) => (
              <div className="user-card" key={user._id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span className="role-badge">{user.role}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Admin;
