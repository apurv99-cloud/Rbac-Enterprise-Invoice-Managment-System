import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceTable from "../../Components/invoice/InvoiceTable";

const ApprovalHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getOrganizationInvoices();
      setInvoices((response || []).filter((item) => ["APPROVED", "REJECTED"].includes(item.status)));
    } catch (error) {
      toast.error(error?.message || "Failed to load approval history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader title="Approval History" subtitle="Track approved and rejected invoices that have already passed through review." />
      <InvoiceTable invoices={invoices} loading={loading} />
    </div>
  );
};

export default ApprovalHistory;
