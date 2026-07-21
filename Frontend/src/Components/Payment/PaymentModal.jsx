import { useEffect, useState } from "react";

const paymentMethods = [
  "BANK_TRANSFER",
  "UPI",
  "NEFT",
  "RTGS",
  "IMPS",
  "CHEQUE",
  "CASH",
];

const PaymentModal = ({ open, onClose, onConfirm, invoice, processing }) => {
  const [formData, setFormData] = useState({
    paymentMethod: "BANK_TRANSFER",
    paymentReference: "",
    paymentDate: "",
    remarks: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        paymentMethod: "BANK_TRANSFER",
        paymentReference: "",
        paymentDate: new Date().toISOString().split("T")[0],
        remarks: "",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.paymentReference.trim()) {
      alert("Payment Reference is required.");
      return;
    }

    onConfirm({
      invoiceId: invoice.invoiceId,
      paymentMethod: formData.paymentMethod,
      paymentReference: formData.paymentReference,
      paymentDate: formData.paymentDate,
      remarks: formData.remarks,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">Process Payment</h2>
          <p className="mt-1 text-sm text-slate-500">
            Confirm payment for the approved invoice.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Invoice Number</p>

              <p className="font-semibold">{invoice.invoiceNumber}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Amount</p>

              <p className="font-semibold">₹ {invoice.amount}</p>
            </div>
          </div>

          {/* Payment Method */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Reference */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Reference
            </label>

            <input
              type="text"
              name="paymentReference"
              value={formData.paymentReference}
              onChange={handleChange}
              placeholder="Enter UTR / Transaction ID"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Payment Date */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Date
            </label>

            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Remarks */}

          <div>
            <label className="mb-2 block text-sm font-medium">Remarks</label>

            <textarea
              rows={4}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Optional remarks..."
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            disabled={processing}
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:bg-slate-400"
          >
            {processing ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
