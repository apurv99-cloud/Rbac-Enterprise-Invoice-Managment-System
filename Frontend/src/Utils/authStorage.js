const TOKEN_KEY = "accessToken";

const decodeJwtPayload = (token) => {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

const authStorage = {
  /**
   * Save JWT Token
   */
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Get JWT Token
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Remove JWT Token
   */
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("email");
    localStorage.removeItem("user");
  },

  /**
   * Check Authentication
   */
  isAuthenticated() {
    const token = this.getToken();

    if (!token) return false;

    const payload = decodeJwtPayload(token);

    if (!payload?.exp) return true;

    return Date.now() < payload.exp * 1000;
  },

  /**
   * Clear all auth-related storage
   */
  clearAuth() {
    this.removeToken();
  },
};

export default authStorage;
