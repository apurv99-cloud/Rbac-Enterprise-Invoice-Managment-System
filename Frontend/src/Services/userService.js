import api from "./api";

const normalizeUserPayload = (userData = {}) => {
  const payload = { ...userData };

  const resolvedActive =
    payload.active ?? payload.isActive ?? payload.enabled ?? false;

  payload.active = Boolean(resolvedActive);
  payload.isActive = Boolean(resolvedActive);
  payload.enabled = Boolean(resolvedActive);

  return payload;
};

const normalizeUser = (user = null) => {
  if (!user) return null;

  const activeValue = user.active ?? user.isActive ?? user.enabled ?? false;

  return {
    ...user,
    active: Boolean(activeValue),
    isActive: Boolean(activeValue),
    enabled: Boolean(activeValue),
  };
};

const userService = {
  /**
   * Create User
   * POST /user
   */
  createUser: async (userData) => {
    try {
      const payload = normalizeUserPayload(userData);
      const response = await api.post("/user", payload);
      return normalizeUser(response.data.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update User
   * PUT /user/{userId}
   */
  updateUser: async (userId, userData) => {
    try {
      const payload = normalizeUserPayload(userData);
      const response = await api.put(`/user/${userId}`, payload);
      return normalizeUser(response.data.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get User By ID
   * GET /user/{userId}
   */
  getUser: async (userId) => {
    try {
      const response = await api.get(`/user/${userId}`);
      return normalizeUser(response.data.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get All Users
   * GET /user
   */
  getAllUsers: async () => {
    try {
      const response = await api.get("/user");
      return (response.data.data || []).map(normalizeUser);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get Users By Organization
   * GET /user/organization/{organizationId}
   */
  getUsersByOrganization: async (organizationId) => {
    try {
      const response = await api.get(`/user/organization/${organizationId}`);
      return (response.data.data || []).map(normalizeUser);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create Organization User
   * POST /user/organization-user
   */
  createOrganizationUser: async (userData) => {
    try {
      const payload = normalizeUserPayload(userData);
      const response = await api.post("/user/organization-user", payload);
      return normalizeUser(response.data.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get My Organization Users
   * GET /user/my-organization
   */
  getMyOrganizationUsers: async () => {
    try {
      const response = await api.get("/user/my-organization");
      return (response.data.data || []).map(normalizeUser);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Activate User
   * PATCH /user/{userId}/activate
   */
  activateUser: async (userId) => {
    try {
      const response = await api.patch(`/user/${userId}/activate`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Deactivate User
   * PATCH /user/{userId}/deactivate
   */
  deactivateUser: async (userId) => {
    try {
      const response = await api.patch(`/user/${userId}/deactivate`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default userService;
