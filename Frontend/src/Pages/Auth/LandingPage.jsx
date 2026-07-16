import Login from "./Login";
import { Building2, ShieldCheck, Workflow } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Section */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-indigo-700 font-medium mb-6">
            <ShieldCheck size={18} />
            Enterprise Invoice Approval Platform
          </div>

          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Simplify Multi-Tenant
            <br />
            Invoice Approvals
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Securely manage organizations, users, workflows and invoice
            approvals from one centralized platform with enterprise-grade role
            based access control.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <Building2 className="text-indigo-600 mt-1" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Multi-Tenant Organizations
                </h3>

                <p className="text-slate-500">
                  Manage multiple organizations from a single platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Workflow className="text-indigo-600 mt-1" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Approval Workflows
                </h3>

                <p className="text-slate-500">
                  Automate invoice approvals with configurable approval chains.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="text-indigo-600 mt-1" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Enterprise Security
                </h3>

                <p className="text-slate-500">
                  JWT authentication with role-based authorization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
