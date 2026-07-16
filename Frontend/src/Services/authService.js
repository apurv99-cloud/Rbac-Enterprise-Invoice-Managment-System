import api from "./api";
import authStorage from "../Utils/authStorage";

const normalizeRoleName = (role) => {
  if (!role) return null;

  const rawValue = typeof role === "string" ? role : role?.authority || role?.name || role?.role || role?.roleName;
  if (!rawValue) return null;

  const value = String(rawValue).trim().toUpperCase();

  if (!value) return null;
  if (value.startsWith("ROLE_")) return value.replace(/^ROLE_/, "");
  if (value.endsWith("_ROLE")) return value.replace(/_ROLE$/, "");
  if (value === "SUPERADMIN" || (value.includes("SUPER") && value.includes("ADMIN"))) return "SUPER_ADMIN";
  if (value === "ORGADMIN" || value === "ORGANIZATIONADMIN" || value === "ORGANIZATION_ADMIN" || (value.includes("ORG") && value.includes("ADMIN"))) return "ORG_ADMIN";
  if (value === "VENDORUSER" || value.includes("VENDOR")) return "VENDOR";
  if (value.includes("REVIEW")) return "REVIEWER";
  if (value.includes("FINANCE")) return "FINANCE";
  if (value.includes("CFO")) return "CFO";

  return value;
};

const getRoleCandidates = (user) => {
  const candidates = [];

  const pushValue = (value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(pushValue);
      return;
    }
    if (typeof value === "object") {
      pushValue(value.authority);
      pushValue(value.name);
      pushValue(value.role);
      pushValue(value.roleName);
      return;
    }
    candidates.push(value);
  };

  pushValue(user?.roleName);
  pushValue(user?.role);
  pushValue(user?.roleType);
  pushValue(user?.authority);
  pushValue(user?.authorities);
  pushValue(user?.roles);

  return candidates;
};

const normalizeUserSession = (user = null) => {
  if (!user) return null;

  const organizationName =
    user.organizationName ||
    user.organization?.organizationName ||
    user.organization?.name ||
    null;

  const roleName = getRoleCandidates(user)
    .map(normalizeRoleName)
    .find(Boolean);

  return {
    ...user,
    organizationName,
    roleName,
  };
};

const authService = {
  /**
   * Login
   * POST /auth/login
   */
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const authData = response.data.data;
      const token = authData?.token || authData?.accessToken || authData?.jwt || null;
      const email = authData?.email || credentials?.email || null;
      const userPayload = authData?.user || authData?.data || authData || null;

      if (token) {
        authStorage.setToken(token);
      }

      if (email) {
        localStorage.setItem("email", email);
      }

      return normalizeUserSession(userPayload);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get Current Logged-in User
   * GET /auth/me
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return normalizeUserSession(response.data.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout
   */
  logout: () => {
    authStorage.clearAuth();
  },

  /**
   * Is User Logged In?
   */
  isAuthenticated: () => {
    return authStorage.isAuthenticated();
  },

  /**
   * Get Stored Token
   */
  getToken: () => {
    return authStorage.getToken();
  },

  /**
   * Get Stored Email
   */
  getEmail: () => {
    return localStorage.getItem("email");
  },
};

export default authService;
