import { Eye, Pencil, Send, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import InvoiceStatusBadge from "./InvoiceStatusBadge";

const InvoiceTable = ({ invoices = [], loading = false, onEdit, onSubmit }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Loading invoices...
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        No invoices found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr className="text-left text-slate-700">
            <th className="px-6 py-4">Invoice</th>
            <th className="px-6 py-4">Vendor</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceId} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{invoice.invoiceNumber || "-"}</h3>
                    <p className="text-sm text-slate-500">{invoice.description || "No description"}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 text-slate-700">{invoice.vendorName || "-"}</td>
              <td className="px-6 py-5 text-slate-700">{invoice.amount || "-"}</td>
              <td className="px-6 py-5"><InvoiceStatusBadge status={invoice.status} /></td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <Link to={`/vendor/invoices/${invoice.invoiceId}`} className="text-indigo-600 transition hover:text-indigo-800" title="View">
                    <Eye size={18} />
                  </Link>
                  <button onClick={() => onEdit?.(invoice)} className="text-blue-600 transition hover:text-blue-800" title="Edit">
                    <Pencil size={18} />
                  </button>
                  {invoice.status !== "SUBMITTED" && invoice.status !== "APPROVED" && invoice.status !== "REJECTED" && (
                    <button onClick={() => onSubmit?.(invoice.invoiceId)} className="text-green-600 transition hover:text-green-800" title="Submit">
                      <Send size={18} />
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

export default InvoiceTable;
