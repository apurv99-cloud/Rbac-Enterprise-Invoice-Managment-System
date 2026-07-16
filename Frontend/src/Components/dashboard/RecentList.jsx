import {
  CalendarDays,
  CircleCheckBig,
  Clock3,
  User,
  Building2,
} from "lucide-react";

const RecentList = ({
  title,
  subtitle,
  items = [],
  primaryField,
  secondaryField,
  statusField,
  dateField,
}) => {
  const safeItems = Array.isArray(items) ? items : [];

  const recentItems = [...safeItems]
    .sort((a, b) => {
      const first = a?.[dateField] ? new Date(a[dateField]).getTime() : 0;
      const second = b?.[dateField] ? new Date(b[dateField]).getTime() : 0;

      return second - first;
    })
    .slice(0, 5);

  const getStatusBadge = (item) => {
    const value = item[statusField];

    // Boolean Status
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <CircleCheckBig size={14} />
          Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <Clock3 size={14} />
          Inactive
        </span>
      );
    }

    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {value}
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* Empty */}

      {recentItems.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No records available.
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {recentItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  {item.organizationName ? (
                    <Building2 size={22} className="text-indigo-600" />
                  ) : (
                    <User size={22} className="text-indigo-600" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item[primaryField] || "Unnamed"}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item[secondaryField] || "No additional details"}
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-8">
                <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
                  <CalendarDays size={16} />

                  {new Date(item[dateField]).toLocaleDateString("en-IN")}
                </div>

                {getStatusBadge(item)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentList;
