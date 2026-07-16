import { Mail, Pencil, Power, PowerOff, User } from "lucide-react";

import RoleBadge from "./RoleBadge";
import StatusBadge from "../Common/StatusBadge";

const UserTable = ({ users = [], loading = false, onEdit, onActivate, onDeactivate }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr className="text-left text-slate-700">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <User size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {user.fullName || "-"}
                    </h3>
                    <p className="text-sm text-slate-500">{user.email || "-"}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5">
                <RoleBadge roleName={user.roleName} />
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail size={16} />
                  <span>{user.phoneNumber || "No phone"}</span>
                </div>
              </td>

              <td className="px-6 py-5">
                <StatusBadge active={user.active} />
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <button
                    title="Edit"
                    onClick={() => onEdit?.(user)}
                    className="text-blue-600 transition hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  {user.active ? (
                    <button
                      title="Deactivate"
                      onClick={() => onDeactivate?.(user.userId)}
                      className="text-red-600 transition hover:text-red-800"
                    >
                      <PowerOff size={18} />
                    </button>
                  ) : (
                    <button
                      title="Activate"
                      onClick={() => onActivate?.(user.userId)}
                      className="text-green-600 transition hover:text-green-800"
                    >
                      <Power size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
