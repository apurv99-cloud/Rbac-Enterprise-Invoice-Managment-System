import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialFormData = {
  invoiceTitle: "",
  description: "",
  amount: "",
  invoiceDate: "",
  dueDate: "",
};
const InvoiceFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  compact = false,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        invoiceTitle: initialData.invoiceTitle || "",
        description: initialData.description || "",
        amount: initialData.amount || "",
        invoiceDate: initialData.invoiceDate || "",
        dueDate: initialData.dueDate || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div
        className={`w-full overflow-y-auto rounded-2xl bg-white shadow-xl ${compact ? "max-w-3xl" : "max-w-2xl"}`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {initialData ? "Edit Invoice" : "Create Invoice"}
            </h2>
            <p className="mt-1 text-slate-500">
              {initialData
                ? "Update invoice information."
                : "Capture invoice details for approval."}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Invoice Title */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Invoice Title *
              </label>

              <input
                required
                name="invoiceTitle"
                value={formData.invoiceTitle}
                onChange={handleChange}
                placeholder="Office Chairs Purchase"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description *
              </label>

              <textarea
                required
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Invoice description..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Amount *
              </label>

              <input
                required
                type="number"
                step="0.01"
                min="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="25000"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Invoice Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Invoice Date *
              </label>

              <input
                required
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Due Date *
              </label>

              <input
                required
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              {initialData ? "Save Changes" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
