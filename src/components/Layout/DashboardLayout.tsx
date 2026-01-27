import { useState, type ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './DashboardLayout.scss';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <div className="dashboard-layout">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div className="dashboard-layout__overlay" onClick={closeSidebar} />
        )}
        <aside
          className={`dashboard-layout__sidebar ${isSidebarOpen ? 'dashboard-layout__sidebar--open' : ''}`}
        >
          <Sidebar />
        </aside>
        <main className="dashboard-layout__main">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
