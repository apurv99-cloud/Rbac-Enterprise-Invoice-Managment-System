import api from "./api";

const organizationService = {
  /**
   * Create Organization
   * POST /organizations
   */
  createOrganization: async (organizationData) => {
    try {
      const response = await api.post("/organizations", organizationData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update Organization
   * PUT /organizations/{organizationId}
   */
  updateOrganization: async (organizationId, organizationData) => {
    try {
      const response = await api.put(
        `/organizations/${organizationId}`,
        organizationData,
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get Organization by ID
   * GET /organizations/{organizationId}
   */
  getOrganization: async (organizationId) => {
    try {
      const response = await api.get(`/organizations/${organizationId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get All Organizations
   * GET /organizations
   */
  getAllOrganizations: async () => {
    try {
      const response = await api.get("/organizations");
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Activate Organization
   * PATCH /organizations/{organizationId}/activate
   */
  activateOrganization: async (organizationId) => {
    try {
      const response = await api.patch(
        `/organizations/${organizationId}/activate`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Deactivate Organization
   * PATCH /organizations/{organizationId}/deactivate
   */
  deactivateOrganization: async (organizationId) => {
    try {
      const response = await api.patch(
        `/organizations/${organizationId}/deactivate`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Send Onboarding Email
   * POST /organizations/{organizationId}/send-onboarding
   */
  sendOnboarding: async (organizationId) => {
    try {
      const response = await api.post(
        `/organizations/${organizationId}/send-onboarding`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Complete Organization Onboarding
   * POST /organizations/complete-onboarding
   */
  completeOnboarding: async (onboardingData) => {
    try {
      const response = await api.post(
        "/organizations/complete-onboarding",
        onboardingData,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default organizationService;
