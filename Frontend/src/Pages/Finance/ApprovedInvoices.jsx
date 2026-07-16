import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceTable from "../../Components/invoice/InvoiceTable";

const ApprovedInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getOrganizationInvoices();
      setInvoices((response || []).filter((item) => item.status === "APPROVED"));
    } catch (error) {
      toast.error(error?.message || "Failed to load approved invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleView = (invoice) => {
    navigate(`/finance/payments/${invoice.invoiceId}`);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="Approved Invoices" subtitle="Review invoices that have passed reviewer approval and are ready for payment processing." />
      <InvoiceTable invoices={invoices} loading={loading} onEdit={handleView} onSubmit={undefined} />
    </div>
  );
};

export default ApprovedInvoices;
