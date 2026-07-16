// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#16a34a", "#f59e0b", "#ef4444", "#3b82f6"];

// const StatusPieChart = ({ organizations = [] }) => {
//   const completed = organizations.filter(
//     (org) => org.onboardingCompleted,
//   ).length;

//   const pending = organizations.filter(
//     (org) => !org.onboardingCompleted,
//   ).length;
//   const active = organizations.filter((org) => org.active).length;

//   const inactive = organizations.filter((org) => !org.active).length;

//   const data = [
//     {
//       name: "Completed",
//       value: completed,
//     },
//     {
//       name: "Pending",
//       value: pending,
//     },
//     {
//       name: "Active",
//       value: active,
//     },
//     {
//       name: "Inactive",
//       value: inactive,
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-slate-800">
//           Organization Onboarding Status
//         </h2>

//         <p className="text-sm text-slate-500 mt-1">
//           Overview of completed and pending onboardings.
//         </p>
//       </div>

//       <div className="h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               innerRadius={70}
//               outerRadius={110}
//               paddingAngle={5}
//               label={({ name, percent }) =>
//                 `${name} ${(percent * 100).toFixed(0)}%`
//               }
//             >
//               {data.map((entry, index) => (
//                 <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>

//             <Tooltip />

//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default StatusPieChart;

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_COLORS = [
  "#16a34a",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

const StatusPieChart = ({
  title = "Status Overview",
  description = "",
  data = [],
  colors = DEFAULT_COLORS,
}) => {
  const chartData = (data || []).filter((item) => Number(item.value) > 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {/* Empty State */}

      {chartData.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-slate-500">
          No data available.
        </div>
      ) : (
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatusPieChart;
