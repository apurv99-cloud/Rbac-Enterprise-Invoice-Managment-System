// import { LogOut, UserCircle2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// const Topbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
//       {/* Left */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

//         <p className="text-sm text-slate-500">Welcome back, {user?.fullName}</p>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-6">
//         {/* User */}
//         <div className="flex items-center gap-3">
//           <div className="h-11 w-11 rounded-full bg-indigo-100 flex items-center justify-center">
//             <UserCircle2 size={28} className="text-indigo-600" />
//           </div>

//           <div className="hidden md:block">
//             <h3 className="font-semibold text-slate-800">{user?.fullName}</h3>

//             <p className="text-sm text-slate-500">{user?.roleName}</p>
//           </div>
//         </div>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100 transition"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Topbar;

import { LogOut, UserCircle2, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const organizationName = user?.organizationName || user?.organization?.organizationName || user?.organization?.name;

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-sm text-slate-500">Welcome back, {user?.fullName}</p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        {/* User */}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100">
            <UserCircle2 size={28} className="text-indigo-600" />
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800">{user?.fullName}</h3>

            {/* Organization */}

            {organizationName && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Building2 size={13} />
                <span>{organizationName}</span>
              </div>
            )}

            {/* Role */}

            <p className="text-sm font-medium text-indigo-600">
              {user?.roleName}
            </p>
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
