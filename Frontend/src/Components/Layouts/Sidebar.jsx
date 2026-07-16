import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import sidebarConfig from "../../config/sidebarConfig";

const Sidebar = () => {
  const { user } = useAuth();

  const menus = sidebarConfig[user?.roleName] || [];

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wide">InvoiceFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{menu.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
