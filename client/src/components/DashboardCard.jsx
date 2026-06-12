function DashboardCard({ title, value, icon: Icon, color = "blue" }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3>{title}</h3>
        {Icon && (
          <div className={`dashboard-card-icon ${color}`}>
            <Icon />
          </div>
        )}
      </div>
      <h1>{value}</h1>
    </div>
  );
}

export default DashboardCard;
