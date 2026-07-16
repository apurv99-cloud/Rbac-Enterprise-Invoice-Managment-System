import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceStatusBadge from "../../Components/invoice/InvoiceStatusBadge";
import InvoiceTimeline from "../../Components/invoice/InvoiceTimeline";

const PaymentDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getInvoice(invoiceId);
      setInvoice(response);
    } catch (error) {
      toast.error(error?.message || "Failed to load payment details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [invoiceId]);

  const summaryItems = useMemo(() => [
    { label: "Invoice Number", value: invoice?.invoiceNumber || "-" },
    { label: "Vendor", value: invoice?.vendorName || "-" },
    { label: "Amount", value: invoice?.amount || "-" },
    { label: "Due Date", value: invoice?.dueDate || "-" },
    { label: "Status", value: <InvoiceStatusBadge status={invoice?.status} /> },
  ], [invoice]);

  if (loading) {
    return <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">Loading payment details...</div>;
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft size={16} /> Back
      </button>

      <DashboardHeader title="Payment Details" subtitle="Review the approved invoice and prepare payment processing." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600">
            <CreditCard size={18} />
            <h2 className="text-xl font-semibold text-slate-800">Invoice Information</h2>
          </div>
          <div className="mt-6 space-y-4">
            {summaryItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-medium text-slate-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">Payment Actions</h2>
            <p className="mt-2 text-sm text-slate-500">Finance workflow placeholder for payment processing and transaction reference capture.</p>
            <button className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700">Mark as Paid</button>
          </div>
          <InvoiceTimeline invoice={invoice} />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
