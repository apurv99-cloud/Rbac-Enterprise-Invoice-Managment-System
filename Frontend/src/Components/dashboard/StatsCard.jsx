import { TrendingUp } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "text-indigo-600",
  bgColor = "bg-indigo-50",
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${bgColor}`}
        >
          {Icon ? (
            <Icon className={color} size={28} />
          ) : (
            <TrendingUp className={color} size={28} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
