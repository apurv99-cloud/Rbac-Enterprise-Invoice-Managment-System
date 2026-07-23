import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import PaymentTable from "../../Components/Payment/PaymentTable";
import paymentService from "../../Services/paymentService";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await paymentService.getAllPayments();

      setPayments(response || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load payments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="space-y-6">
      {/* <DashboardHeader
        title="Payments"
        subtitle="View all completed payment transactions across the organization."
      /> */}

      <PaymentTable payments={payments} loading={loading} />
    </div>
  );
};

export default Payments;
