import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dobrý den, Karle</h1>

        <p className="text-gray-500">Přehled bezpečnosti a plnění povinností</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
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
