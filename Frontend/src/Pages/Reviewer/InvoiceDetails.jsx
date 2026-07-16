import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceStatusBadge from "../../Components/invoice/InvoiceStatusBadge";
import InvoiceTimeline from "../../Components/invoice/InvoiceTimeline";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getInvoice(invoiceId);
      setInvoice(response);
    } catch (error) {
      toast.error(error?.message || "Failed to load invoice details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [invoiceId]);

  const handleApprove = async () => {
    try {
      setSubmitting(true);
      await invoiceService.approveInvoice(invoiceId, { remarks });
      toast.success("Invoice approved.");
      fetchInvoice();
    } catch (error) {
      toast.error(error?.message || "Approval failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    try {
      setSubmitting(true);
      await invoiceService.rejectInvoice(invoiceId, { remarks });
      toast.success("Invoice rejected.");
      fetchInvoice();
    } catch (error) {
      toast.error(error?.message || "Rejection failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const summaryItems = useMemo(() => [
    { label: "Invoice Number", value: invoice?.invoiceNumber || "-" },
    { label: "Vendor", value: invoice?.vendorName || "-" },
    { label: "Amount", value: invoice?.amount || "-" },
    { label: "Due Date", value: invoice?.dueDate || "-" },
    { label: "Status", value: <InvoiceStatusBadge status={invoice?.status} /> },
  ], [invoice]);

  if (loading) {
    return <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">Loading invoice details...</div>;
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft size={16} /> Back
      </button>

      <DashboardHeader title="Invoice Review" subtitle="Inspect the invoice and decide whether to approve or reject it." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Invoice Summary</h2>
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
            <h2 className="text-xl font-semibold text-slate-800">Approval Remarks</h2>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="5" className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Add review comments" />
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={handleApprove} disabled={submitting} className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-60">
                <CheckCircle2 size={18} /> Approve
              </button>
              <button onClick={handleReject} disabled={submitting} className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-60">
                <XCircle size={18} /> Reject
              </button>
            </div>
          </div>

          <InvoiceTimeline invoice={invoice} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
