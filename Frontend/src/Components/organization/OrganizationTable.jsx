import { Mail, User, Send, Pencil, Power, PowerOff } from "lucide-react";

const OrganizationTable = ({
  organizations,
  loading,
  onSendOnboarding,
  onActivate,
  onDeactivate,
  onEdit,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        Loading organizations...
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
        No organizations found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr className="text-left text-slate-700">
            <th className="px-6 py-4">Organization</th>
            <th className="px-6 py-4">Contact Person</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Onboarding</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {organizations.map((organization) => (
            <tr
              key={organization.organizationId}
              className="border-t border-slate-200 hover:bg-slate-50"
            >
              {/* Organization */}
              <td className="px-6 py-5">
                <h3 className="font-semibold text-slate-800">
                  {organization.organizationName}
                </h3>

                <p className="text-sm text-slate-500">
                  {organization.businessType || "-"}
                </p>
              </td>

              {/* Contact */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {organization.contactPersonName || "-"}
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {organization.contactPersonEmail || "-"}
                </div>
              </td>

              {/* Onboarding */}
              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    organization.onboardingCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {organization.onboardingCompleted ? "Completed" : "Pending"}
                </span>
              </td>

              {/* Status */}
              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    organization.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {organization.active ? "Active" : "Inactive"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  {/* Edit */}
                  <button
                    title="Edit"
                    onClick={() => onEdit?.(organization)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Send Onboarding */}
                  {!organization.onboardingCompleted && (
                    <button
                      title="Send Onboarding"
                      onClick={() =>
                        onSendOnboarding(organization.organizationId)
                      }
                      className="text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <Send size={18} />
                    </button>
                  )}

                  {/* Activate / Deactivate */}
                  {organization.active ? (
                    <button
                      title="Deactivate"
                      onClick={() => onDeactivate(organization.organizationId)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <PowerOff size={18} />
                    </button>
                  ) : (
                    <button
                      title="Activate"
                      onClick={() => onActivate(organization.organizationId)}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <Power size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationTable;
