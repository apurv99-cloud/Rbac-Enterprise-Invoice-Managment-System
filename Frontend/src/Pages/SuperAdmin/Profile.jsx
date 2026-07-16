import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Profile</h1>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500 text-sm">Full Name</p>

            <h3 className="font-semibold text-lg">{user?.fullName}</h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Email</p>

            <h3 className="font-semibold text-lg">{user?.email}</h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Role</p>

            <h3 className="font-semibold text-lg">{user?.roleName}</h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Organization</p>

            <h3 className="font-semibold text-lg">
              {user?.organizationName || "N/A"}
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">Status</p>

            <h3
              className={`font-semibold text-lg ${
                user?.active ? "text-green-600" : "text-red-600"
              }`}
            >
              {user?.active ? "Active" : "Inactive"}
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">User ID</p>

            <h3 className="font-semibold text-lg">{user?.userId}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
