const InvoiceStatusBadge = ({ status }) => {
  const normalized = (status || "DRAFT").toUpperCase();

  const styles = {
    DRAFT: "bg-slate-100 text-slate-700",
    SUBMITTED: "bg-blue-100 text-blue-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    PENDING: "bg-amber-100 text-amber-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[normalized] || "bg-slate-100 text-slate-700"}`}>
      {normalized}
    </span>
  );
};

export default InvoiceStatusBadge;
