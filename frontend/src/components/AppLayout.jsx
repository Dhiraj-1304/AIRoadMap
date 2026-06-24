import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './AIGenerator/DashboardNavbar';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
