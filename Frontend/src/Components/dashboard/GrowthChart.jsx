// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const GrowthChart = ({ organizations = [] }) => {
//   /**
//    * Group organizations by creation date
//    */
//   const groupedData = organizations.reduce((acc, organization) => {
//     const date = new Date(organization.createdAt).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//     });

//     if (!acc[date]) {
//       acc[date] = 0;
//     }

//     acc[date]++;

//     return acc;
//   }, {});

//   /**
//    * Convert object into chart data
//    */
//   const chartData = Object.entries(groupedData).map(([date, count]) => ({
//     date,
//     organizations: count,
//   }));

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//       {/* Header */}

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-slate-800">
//           Organization Growth
//         </h2>

//         <p className="text-sm text-slate-500 mt-1">
//           Organizations created over time.
//         </p>
//       </div>

//       {/* Chart */}

//       <div className="h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={chartData}>
//             <defs>
//               <linearGradient id="growthColor" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />

//                 <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid strokeDasharray="3 3" />

//             <XAxis dataKey="date" />

//             <YAxis allowDecimals={false} />

//             <Tooltip />

//             <Area
//               type="monotone"
//               dataKey="organizations"
//               stroke="#4f46e5"
//               strokeWidth={3}
//               fill="url(#growthColor)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default GrowthChart;

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const GrowthChart = ({
  title = "Growth",
  description = "",
  data = [],
  xKey = "createdAt",
  dataKey = "Items",
}) => {
  const safeData = Array.isArray(data) ? data : [];
  /**
   * Group data by creation date
   */
  const groupedData = safeData.reduce((acc, item) => {
    if (!item[xKey]) return acc;

    const date = new Date(item[xKey]).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date]++;

    return acc;
  }, {});

  /**
   * Convert to chart data
   */
  const chartData = Object.entries(groupedData).map(([date, count]) => ({
    date,
    [dataKey]: count,
  }));

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
          No growth data available.
        </div>
      ) : (
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="growthColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />

                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#4f46e5"
                strokeWidth={3}
                fill="url(#growthColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GrowthChart;
