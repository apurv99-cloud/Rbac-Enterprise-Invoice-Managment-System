import api from "./api";

const paymentService = {
  createPayment: async (paymentData) => {
    const response = await api.post("/payments", paymentData);
    return response.data;
  },

  getPayment: async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  },

  getAllPayments: async () => {
    const response = await api.get("/payments");
    return response.data;
  },

  getPaymentByInvoice: async (invoiceId) => {
    const response = await api.get(`/payments/invoice/${invoiceId}`);
    return response.data;
  },
};

export default paymentService;
