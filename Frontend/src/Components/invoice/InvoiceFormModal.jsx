import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialFormData = {
  invoiceNumber: "",
  vendorName: "",
  description: "",
  amount: "",
  currency: "INR",
  dueDate: "",
  status: "DRAFT",
};

const InvoiceFormModal = ({ isOpen, onClose, onSubmit, initialData = null, compact = false }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        invoiceNumber: initialData.invoiceNumber || "",
        vendorName: initialData.vendorName || "",
        description: initialData.description || "",
        amount: initialData.amount || "",
        currency: initialData.currency || "INR",
        dueDate: initialData.dueDate || "",
        status: initialData.status || "DRAFT",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className={`w-full overflow-y-auto rounded-2xl bg-white shadow-xl ${compact ? "max-w-3xl" : "max-w-2xl"}`}>
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{initialData ? "Edit Invoice" : "Create Invoice"}</h2>
            <p className="mt-1 text-slate-500">{initialData ? "Update invoice information." : "Capture invoice details for approval."}</p>
          </div>
          <button onClick={handleClose} className="rounded-lg p-2 transition hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Invoice Number *</label>
              <input required name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="INV-1001" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Name *</label>
              <input required name="vendorName" value={formData.vendorName} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Vendor Ltd." />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe the invoice" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Amount *</label>
              <input required name="amount" value={formData.amount} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="150000" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button type="button" onClick={handleClose} className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">Cancel</button>
            <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700">{initialData ? "Save Changes" : "Create Invoice"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
