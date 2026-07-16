const roleStyles = {
  SUPER_ADMIN: "bg-purple-100 text-purple-700",
  ORG_ADMIN: "bg-indigo-100 text-indigo-700",
  REVIEWER: "bg-amber-100 text-amber-700",
  FINANCE: "bg-emerald-100 text-emerald-700",
  CFO: "bg-sky-100 text-sky-700",
  VENDOR: "bg-pink-100 text-pink-700",
};

const roleLabels = {
  SUPER_ADMIN: "Super Admin",
  ORG_ADMIN: "Org Admin",
  REVIEWER: "Reviewer",
  FINANCE: "Finance",
  CFO: "CFO",
  VENDOR: "Vendor",
};

const RoleBadge = ({ roleName }) => {
  const style = roleStyles[roleName] || "bg-slate-100 text-slate-700";
  const label = roleLabels[roleName] || roleName || "Unknown";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {label}
    </span>
  );
};

export default RoleBadge;
