import { createContext, useContext, useEffect, useState } from "react";
import authService from "../Services/authService";
import authStorage from "../Utils/authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuthState = () => {
    authStorage.clearAuth();
    setUser(null);
  };

  /**
   * Login
   */
  const login = async (credentials) => {
    setUser(null);
    setLoading(true);
    clearAuthState();

    try {
      const loginUser = await authService.login(credentials);

      let currentUser = loginUser;

      if (!currentUser?.roleName && !currentUser?.role) {
        try {
          currentUser = await authService.getCurrentUser();
        } catch {
          currentUser = loginUser;
        }
      }

      setUser(currentUser);
      setLoading(false);
      return currentUser;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    clearAuthState();
  };

  /**
   * Load User on Refresh
   */
  const loadUser = async () => {
    if (!authStorage.isAuthenticated()) {
      clearAuthState();
      setLoading(false);
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    } catch (error) {
      clearAuthState();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const handleAuthEvent = () => {
      clearAuthState();
    };

    window.addEventListener("auth:expired", handleAuthEvent);

    return () => {
      window.removeEventListener("auth:expired", handleAuthEvent);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
