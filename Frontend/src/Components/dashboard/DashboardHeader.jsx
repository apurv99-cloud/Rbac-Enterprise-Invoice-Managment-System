import { CalendarDays } from "lucide-react";

const DashboardHeader = ({ title, subtitle, userName }) => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left */}

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {title}
            {userName ? `, ${userName}` : ""}
          </h1>

          {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 text-slate-500">
          <CalendarDays size={18} />

          <span className="text-sm font-medium">{today}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
