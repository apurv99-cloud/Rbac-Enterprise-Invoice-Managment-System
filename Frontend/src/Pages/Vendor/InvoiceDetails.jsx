import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import InvoiceTimeline from "../../Components/invoice/InvoiceTimeline";

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await invoiceService.getInvoice(invoiceId);
        setInvoice(response);
      } catch (error) {
        toast.error(error?.message || "Failed to fetch invoice.");
      } finally {
        setLoading(false);
      }
    };

    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  if (loading) {
    return <div className="text-slate-500">Loading invoice...</div>;
  }

  if (!invoice) {
    return <div className="text-slate-500">Invoice not found.</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/vendor/invoices")}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to invoices
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{invoice.invoiceNumber}</h1>
            <p className="mt-1 text-slate-500">{invoice.vendorName || "Vendor"}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <FileText size={24} className="text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Invoice Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Status</span><span className="font-medium text-slate-800">{invoice.status}</span></div>
            <div className="flex justify-between"><span>Amount</span><span className="font-medium text-slate-800">{invoice.amount || "-"}</span></div>
            <div className="flex justify-between"><span>Currency</span><span className="font-medium text-slate-800">{invoice.currency || "-"}</span></div>
            <div className="flex justify-between"><span>Due Date</span><span className="font-medium text-slate-800">{invoice.dueDate || "-"}</span></div>
          </div>
        </div>

        <InvoiceTimeline invoice={invoice} />
      </div>
    </div>
  );
};

export default InvoiceDetails;
