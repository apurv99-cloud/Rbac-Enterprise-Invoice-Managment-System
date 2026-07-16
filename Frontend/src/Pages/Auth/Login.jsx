import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const normalizeRole = (role) => {
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

    return value;
  };

  const navigateByRole = (role) => {
    const normalizedRole = normalizeRole(role);

    switch (normalizedRole) {
      case "SUPER_ADMIN":
        navigate("/super-admin/dashboard");
        break;

      case "ORG_ADMIN":
        navigate("/organization/dashboard");
        break;

      case "REVIEWER":
        navigate("/reviewer/dashboard");
        break;

      case "FINANCE":
        navigate("/finance/dashboard");
        break;

      case "VENDOR":
        navigate("/vendor/dashboard");
        break;

      case "CFO":
        navigate("/cfo/dashboard");
        break;

      default:
        navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const user = await login(credentials);

      toast.success("Login successful");

      navigateByRole(user.roleName);
    } catch (error) {
      toast.error(error?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>

        <p className="mt-2 text-slate-500">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <LogIn size={18} />

          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Login;
