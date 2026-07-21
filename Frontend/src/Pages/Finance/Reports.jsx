import { useEffect, useMemo, useState } from "react";
import { IndianRupee, CircleCheckBig, Clock3, XCircle } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import StatusPieChart from "../../Components/dashboard/StatusPieChart";

const Reports = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const response = await invoiceService.getOrganizationInvoices();

      setInvoices(response || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load reports.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const paidInvoices = useMemo(
    () => invoices.filter((i) => i.status === "PAID"),
    [invoices],
  );

  const approvedInvoices = useMemo(
    () => invoices.filter((i) => i.status === "APPROVED"),
    [invoices],
  );

  const rejectedInvoices = useMemo(
    () => invoices.filter((i) => i.status === "REJECTED"),
    [invoices],
  );

  const totalPaid = paidInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0,
  );

  const pendingAmount = approvedInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0,
  );

  const rejectedAmount = rejectedInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0,
  );

  const stats = [
    {
      title: "Total Paid",
      value: `₹${totalPaid.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Amount",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
      icon: Clock3,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.length,
      icon: CircleCheckBig,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Rejected Invoices",
      value: rejectedInvoices.length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const chartData = [
    {
      name: "Paid",
      value: totalPaid,
    },
    {
      name: "Pending",
      value: pendingAmount,
    },
    {
      name: "Rejected",
      value: rejectedAmount,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Finance Reports"
        subtitle="Financial overview of invoices and payments across the organization."
      />

      <StatsGrid stats={stats} />

      <StatusPieChart
        title="Financial Distribution"
        description="Paid, pending, and rejected invoice amounts."
        data={chartData}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          Report Summary
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-3">
            <span>Total Invoices</span>

            <span className="font-semibold">{invoices.length}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>Paid Invoices</span>

            <span className="font-semibold">{paidInvoices.length}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>Awaiting Payment</span>

            <span className="font-semibold">{approvedInvoices.length}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>Rejected Invoices</span>

            <span className="font-semibold">{rejectedInvoices.length}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Amount Paid</span>

            <span className="font-semibold text-green-600">
              ₹{totalPaid.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
