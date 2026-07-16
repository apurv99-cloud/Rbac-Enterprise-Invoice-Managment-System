import useAuth from "../../hooks/useAuth";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <DashboardHeader title="Reviewer Profile" subtitle="View your account details and team context." />

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">Full Name</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{user?.fullName || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{user?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Role</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{user?.roleName || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Organization</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{user?.organizationName || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
