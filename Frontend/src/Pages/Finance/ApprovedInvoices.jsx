import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceTable from "../../Components/invoice/InvoiceTable";
import invoiceService from "../../Services/invoiceService";

const ApprovedInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const response = await invoiceService.getOrganizationInvoices();

      const approvedInvoices = (response || []).filter(
        (invoice) => invoice.status === "APPROVED",
      );

      setInvoices(approvedInvoices);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load approved invoices.",
      );
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
      <DashboardHeader
        title="Approved Invoices"
        subtitle="Invoices approved by reviewers and awaiting payment by the finance team."
      />

      <InvoiceTable
        invoices={invoices}
        loading={loading}
        onEdit={handleView}
        editLabel="Process Payment"
        emptyMessage="No approved invoices are awaiting payment."
      />
    </div>
  );
};

export default ApprovedInvoices;
