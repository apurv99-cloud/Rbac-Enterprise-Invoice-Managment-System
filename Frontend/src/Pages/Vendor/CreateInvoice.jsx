import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import InvoiceFormModal from "../../Components/invoice/InvoiceFormModal";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await invoiceService.createInvoice(formData);
      toast.success("Invoice created successfully.");
      navigate("/vendor/invoices");
    } catch (error) {
      toast.error(error?.message || "Failed to create invoice.");
    }
  };

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
        <h1 className="text-3xl font-bold text-slate-800">Create Invoice</h1>
        <p className="mt-1 text-slate-500">Capture invoice details and submit them for review.</p>
      </div>

      <InvoiceFormModal
        isOpen={true}
        onClose={() => navigate("/vendor/invoices")}
        onSubmit={handleSubmit}
        initialData={null}
        compact={true}
      />
    </div>
  );
};

export default CreateInvoice;
