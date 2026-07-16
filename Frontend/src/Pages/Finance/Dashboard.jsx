import { useEffect, useState } from "react";
import { FileText, CircleCheckBig, Clock3, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import StatusPieChart from "../../Components/dashboard/StatusPieChart";
import GrowthChart from "../../Components/dashboard/GrowthChart";
import RecentList from "../../Components/dashboard/RecentList";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getOrganizationInvoices();
      setInvoices(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load finance dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const approvedInvoices = invoices.filter((item) => item.status === "APPROVED").length;
  const pendingPayments = invoices.filter((item) => item.status === "APPROVED").length;
  const completedPayments = invoices.filter((item) => item.status === "PAID").length;
  const failedPayments = invoices.filter((item) => item.status === "REJECTED").length;

  const stats = [
    { title: "Approved Invoices", value: approvedInvoices, icon: CircleCheckBig, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Pending Payments", value: pendingPayments, icon: Clock3, color: "text-amber-600", bgColor: "bg-amber-100" },
    { title: "Completed Payments", value: completedPayments, icon: FileText, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Failed Payments", value: failedPayments, icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
  ];

  const pieChartData = [
    { name: "Approved", value: approvedInvoices },
    { name: "Pending", value: pendingPayments },
    { name: "Paid", value: completedPayments },
    { name: "Failed", value: failedPayments },
  ];

  if (loading) {
    return <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">Loading finance dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader title="Finance Dashboard" subtitle="Process approved invoices and track payment progress across the organization." />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StatusPieChart title="Payment Status" description="State of invoices ready for payment processing." data={pieChartData} />
        <GrowthChart title="Payment Growth" description="Invoice payment activity over time." data={invoices} xKey="createdAt" dataKey="Payments" />
      </div>
      <RecentList title="Recent Payments" subtitle="Latest invoices requiring finance action." items={invoices} primaryField="invoiceNumber" secondaryField="vendorName" statusField="status" dateField="createdAt" />
    </div>
  );
};

export default Dashboard;
