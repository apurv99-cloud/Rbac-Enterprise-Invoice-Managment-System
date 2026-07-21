const methodStyles = {
  BANK_TRANSFER: "bg-blue-100 text-blue-700",
  UPI: "bg-violet-100 text-violet-700",
  NEFT: "bg-emerald-100 text-emerald-700",
  RTGS: "bg-cyan-100 text-cyan-700",
  IMPS: "bg-orange-100 text-orange-700",
  CHEQUE: "bg-yellow-100 text-yellow-700",
  CASH: "bg-green-100 text-green-700",
};

const formatMethod = (method) => {
  if (!method) return "-";

  return method
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const PaymentMethodBadge = ({ method }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        methodStyles[method] || "bg-slate-100 text-slate-700"
      }`}
    >
      {formatMethod(method)}
    </span>
  );
};

export default PaymentMethodBadge;
