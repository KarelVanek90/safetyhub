import {
  LayoutDashboard,
  Users,
  FileText,
  HardHat,
  Stethoscope,
  GraduationCap,
  Wrench,
  AlertTriangle,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Zaměstnanci",
    path: "/employees",
    icon: Users,
  },
  {
    name: "Dokumenty",
    path: "/documents",
    icon: FileText,
  },
  {
    name: "OOPP",
    path: "/ppe",
    icon: HardHat,
  },
  {
    name: "Lékařské prohlídky",
    path: "/medical",
    icon: Stethoscope,
  },
  {
    name: "Školení",
    path: "/training",
    icon: GraduationCap,
  },
  {
    name: "Revize a kontroly",
    path: "/inspections",
    icon: Wrench,
  },
  {
    name: "Rizika",
    path: "/risks",
    icon: AlertTriangle,
  },
];

type SidebarNavProps = {
  onItemClick?: () => void;
};

const SidebarNav = ({ onItemClick }: SidebarNavProps) => {
  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-blue-700 shadow-lg" : "hover:bg-slate-800"
              }`
            }
          >
            <Icon size={20} />
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      <aside className="hidden lg:block w-64 min-h-screen bg-slate-950 text-white p-5">
        <h1 className="text-4xl font-bold mb-10">SafetyHub</h1>

        <SidebarNav />
      </aside>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <aside className="h-full w-64 bg-slate-950 p-5 text-white">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-4xl font-bold">SafetyHub</h1>

              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <SidebarNav onItemClick={onClose} />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
