import api from "./api";

const invoiceService = {
  /**
   * Create Invoice
   * POST /invoices
   */
  createInvoice: async (invoiceData) => {
    try {
      const response = await api.post("/invoices", invoiceData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update Invoice
   * PUT /invoices/{invoiceId}
   */
  updateInvoice: async (invoiceId, invoiceData) => {
    try {
      const response = await api.put(`/invoices/${invoiceId}`, invoiceData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Submit Invoice
   * POST /invoices/{invoiceId}/submit
   */
  submitInvoice: async (invoiceId) => {
    try {
      const response = await api.post(`/invoices/${invoiceId}/submit`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get Invoice By ID
   * GET /invoices/{invoiceId}
   */
  getInvoice: async (invoiceId) => {
    try {
      const response = await api.get(`/invoices/${invoiceId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get All Organization Invoices
   * GET /invoices
   */
  getOrganizationInvoices: async () => {
    try {
      const response = await api.get("/invoices");
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get Pending Invoices Assigned To Logged-in User
   * GET /invoices/pending
   */
  getMyPendingInvoices: async () => {
    try {
      const response = await api.get("/invoices/pending");
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Approve Invoice
   * PATCH /invoices/{invoiceId}/approve
   */
  approveInvoice: async (invoiceId, approvalData) => {
    try {
      const response = await api.patch(
        `/invoices/${invoiceId}/approve`,
        approvalData,
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Reject Invoice
   * PATCH /invoices/{invoiceId}/reject
   */
  rejectInvoice: async (invoiceId, rejectionData) => {
    try {
      const response = await api.patch(
        `/invoices/${invoiceId}/reject`,
        rejectionData,
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default invoiceService;
