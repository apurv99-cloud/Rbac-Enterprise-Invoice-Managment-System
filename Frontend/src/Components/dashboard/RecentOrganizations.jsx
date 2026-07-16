import { Building2, CalendarDays, CircleCheckBig, Clock3 } from "lucide-react";

const RecentOrganizations = ({ organizations = [] }) => {
  const recentOrganizations = [...organizations]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800">
          Recent Organizations
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Recently onboarded organizations
        </p>
      </div>

      {/* Empty State */}

      {recentOrganizations.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No organizations available.
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {recentOrganizations.map((organization) => (
            <div
              key={organization.organizationId}
              className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Building2 className="text-indigo-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {organization.organizationName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {organization.businessType || "Business"}
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-8">
                {/* Created */}

                <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm">
                  <CalendarDays size={16} />

                  {new Date(organization.createdAt).toLocaleDateString("en-IN")}
                </div>

                {/* Onboarding */}

                <div>
                  {organization.onboardingCompleted ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                      <CircleCheckBig size={14} />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-semibold">
                      <Clock3 size={14} />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrganizations;
