import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './DashboardLayout.scss';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <div className="dashboard-layout">
        <aside className="dashboard-layout__sidebar">
          <Sidebar />
        </aside>
        <main className="dashboard-layout__main">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
