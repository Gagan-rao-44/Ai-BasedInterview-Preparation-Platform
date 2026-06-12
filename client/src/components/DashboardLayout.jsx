import Sidebar from "./Sidebar";

function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        {(title || subtitle) && (
          <header className="page-header">
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
