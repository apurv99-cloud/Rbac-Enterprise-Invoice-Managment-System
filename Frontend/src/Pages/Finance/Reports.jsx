import DashboardHeader from "../../Components/dashboard/DashboardHeader";

const Reports = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Finance Reports" subtitle="View payment summaries and export-ready reporting views." />
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-sm text-slate-600">
        Finance reporting views will be connected to the reporting API once the backend endpoints are available.
      </div>
    </div>
  );
};

export default Reports;
