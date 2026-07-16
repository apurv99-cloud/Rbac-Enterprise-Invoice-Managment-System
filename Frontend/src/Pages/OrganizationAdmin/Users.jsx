import { useEffect, useState } from "react";
import { Plus, Users as UsersIcon, UserCheck, UserX, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import userService from "../../Services/userService";

import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import UserTable from "../../Components/user/UserTable";
import UserFormModal from "../../Components/user/UserFormModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await userService.getMyOrganizationUsers();

      setUsers(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdateUser = async (formData) => {
    try {
      const payload = {
        ...formData,
        active: formData.active ?? false,
        isActive: formData.active ?? false,
        enabled: formData.active ?? false,
      };

      let createdOrUpdatedUser;

      if (selectedUser) {
        createdOrUpdatedUser = await userService.updateUser(
          selectedUser.userId,
          payload,
        );
        toast.success("User updated successfully.");
      } else {
        createdOrUpdatedUser = await userService.createOrganizationUser(payload);
        toast.success("User created successfully.");
      }

      setUsers((prev) => {
        if (selectedUser) {
          return prev.map((user) =>
            user.userId === createdOrUpdatedUser?.userId ? createdOrUpdatedUser : user,
          );
        }

        return createdOrUpdatedUser
          ? [createdOrUpdatedUser, ...prev]
          : prev;
      });

      setOpenModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Failed to save user.");
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      await userService.activateUser(userId);
      toast.success("User activated successfully.");
      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Failed to activate user.");
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await userService.deactivateUser(userId);
      toast.success("User deactivated successfully.");
      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Failed to deactivate user.");
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.active).length;
  const inactiveUsers = users.filter((user) => !user.active).length;
  const adminUsers = users.filter((user) =>
    ["ORG_ADMIN", "SUPER_ADMIN"].includes(user.roleName),
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: UsersIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      icon: ShieldCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Users</h1>

          <p className="mt-1 text-slate-500">
            Manage team members, roles, and account status.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create User
        </button>
      </div>

      <DashboardHeader
        title="Organization User Management"
        subtitle="Create new users, update access roles, and manage activity."
      />

      <StatsGrid stats={stats} />

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEditUser}
        onActivate={handleActivateUser}
        onDeactivate={handleDeactivateUser}
      />

      <UserFormModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedUser(null);
        }}
        onSubmit={handleCreateOrUpdateUser}
        initialData={selectedUser}
      />
    </div>
  );
};

export default Users;
