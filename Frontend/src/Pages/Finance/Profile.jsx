import DashboardHeader from "../../Components/dashboard/DashboardHeader";

const Profile = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Finance Profile" subtitle="Maintain your finance role profile and account details." />
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-sm text-slate-600">
        Finance profile settings are ready for future account management enhancements.
      </div>
    </div>
  );
};

export default Profile;
