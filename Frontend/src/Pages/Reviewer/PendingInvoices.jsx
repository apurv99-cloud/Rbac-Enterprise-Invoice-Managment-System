import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceTable from "../../Components/invoice/InvoiceTable";

const PendingInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getMyPendingInvoices();
      setInvoices(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load pending invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleView = (invoice) => {
    navigate(`/reviewer/invoices/${invoice.invoiceId}`);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader title="Pending Invoices" subtitle="Review and act on invoices that are waiting for your approval." />
      <InvoiceTable invoices={invoices} loading={loading} onEdit={handleView} onSubmit={undefined} />
    </div>
  );
};

export default PendingInvoices;
