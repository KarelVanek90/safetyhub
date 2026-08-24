import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
