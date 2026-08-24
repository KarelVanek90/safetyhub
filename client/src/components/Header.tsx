import { Bell, Search, Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <button onClick={onMenuClick} className="lg:hidden">
        <Menu size={24} />
      </button>
      <h1 className="text-xl md:text-3xl font-bold text-slate-800">
        Dobrý den, Karle
      </h1>

      <p className="hidden md:block text-gray-500">
        Přehled bezpečnosti a plnění povinností
      </p>

      <div className="flex items-center gap-6">
        <div className="relative  hidden md:block">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Hledat..."
            className="pl-10 pr-4 h-11 w-72 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="relative">
          <Bell />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
