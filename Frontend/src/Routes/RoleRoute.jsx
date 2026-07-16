import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const normalizeRoleName = (role) => {
  if (!role) return null;

  const rawValue = typeof role === "string" ? role : role?.authority || role?.name || role?.role || role?.roleName;
  if (!rawValue) return null;

  const value = String(rawValue).trim().toUpperCase();

  if (!value) return null;
  if (value.startsWith("ROLE_")) return value.replace(/^ROLE_/, "");
  if (value.endsWith("_ROLE")) return value.replace(/_ROLE$/, "");
  if (value === "SUPERADMIN") return "SUPER_ADMIN";
  if (value === "ORGADMIN" || value === "ORGANIZATIONADMIN" || value === "ORGANIZATION_ADMIN") return "ORG_ADMIN";
  if (value === "VENDORUSER") return "VENDOR";
  if (value === "ADMIN") return "SUPER_ADMIN";
  if (value === "ORG") return "ORG_ADMIN";

  return value;
};

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const userRole = normalizeRoleName(user?.roleName || user?.role || user?.roleType || user?.authorities?.[0]);
  const normalizedAllowedRoles = allowedRoles.map((role) => normalizeRoleName(role));

  const hasRequiredRole = normalizedAllowedRoles.some((role) => role === userRole);

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
