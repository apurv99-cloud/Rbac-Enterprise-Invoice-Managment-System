import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Building2,
  ShieldCheck,
  Calendar,
  CircleCheckBig,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import authService from "../../Services/authService";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load profile.",
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Finance Profile"
        subtitle="View your finance account information and organization details."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Card */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
              <User size={42} className="text-indigo-600" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-800">
              {user.fullName}
            </h2>

            <p className="text-slate-500">Finance Team</p>
          </div>
        </div>

        {/* Right Card */}

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Account Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={user.email}
            />

            <InfoItem
              icon={<Building2 size={18} />}
              label="Organization"
              value={user.organizationName}
            />

            <InfoItem
              icon={<ShieldCheck size={18} />}
              label="Role"
              value={user.roleName}
            />

            <InfoItem
              icon={<CircleCheckBig size={18} />}
              label="Status"
              value={user.active ? "Active" : "Inactive"}
            />

            <InfoItem
              icon={<Calendar size={18} />}
              label="Joined On"
              value={user.createdAt?.split("T")[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
    <div className="mt-1 text-indigo-600">{icon}</div>

    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="font-medium text-slate-800">{value || "-"}</p>
    </div>
  </div>
);

export default Profile;
