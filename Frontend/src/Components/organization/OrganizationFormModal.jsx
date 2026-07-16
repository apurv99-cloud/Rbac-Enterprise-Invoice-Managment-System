import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialFormData = {
  organizationName: "",
  legalBusinessName: "",
  businessType: "",
  industryType: "",
  gstNumber: "",
  registrationNumber: "",
  email: "",
  phoneNumber: "",
  website: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  contactPersonName: "",
  contactPersonEmail: "",
};

const OrganizationFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  /**
   * Populate form while editing
   */
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        organizationName: initialData.organizationName || "",
        legalBusinessName: initialData.legalBusinessName || "",
        businessType: initialData.businessType || "",
        industryType: initialData.industryType || "",
        gstNumber: initialData.gstNumber || "",
        registrationNumber: initialData.registrationNumber || "",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        website: initialData.website || "",
        addressLine1: initialData.addressLine1 || "",
        addressLine2: initialData.addressLine2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "",
        pincode: initialData.pincode || "",
        contactPersonName: initialData.contactPersonName || "",
        contactPersonEmail: initialData.contactPersonEmail || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, initialData]);

  /**
   * Handle Input Change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Submit Form
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  /**
   * Close Modal
   */
  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="sticky top-0 bg-white border-b px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {initialData ? "Edit Organization" : "Create Organization"}
            </h2>

            <p className="text-slate-500 mt-1">
              {initialData
                ? "Update organization details."
                : "Fill the details below to onboard a new organization."}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* ============================
                Organization Information
          ============================ */}

          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Organization Information
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization Name *
                </label>

                <input
                  required
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Infosys Ltd."
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Legal Business Name
                </label>

                <input
                  name="legalBusinessName"
                  value={formData.legalBusinessName}
                  onChange={handleChange}
                  placeholder="Infosys Limited"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Type
                </label>

                <input
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="Private Limited"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Industry Type
                </label>

                <input
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleChange}
                  placeholder="IT Services"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  GST Number
                </label>

                <input
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="22AAAAA0000A1Z5"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Registration Number
                </label>

                <input
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="CIN / Registration No."
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </section>
          {/* ============================
                Contact Details
          ============================ */}

          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Contact Details
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="company@email.com"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>

                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Website
                </label>

                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://company.com"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* ============================
                Address
          ============================ */}

          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Address
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <input
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Address Line 2"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border rounded-xl px-4 py-3"
              />
            </div>
          </section>

          {/* ============================
                Contact Person
          ============================ */}

          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-5">
              Contact Person
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <input
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Contact Person Name"
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="email"
                name="contactPersonEmail"
                value={formData.contactPersonEmail}
                onChange={handleChange}
                placeholder="Contact Person Email"
                className="border rounded-xl px-4 py-3"
              />
            </div>
          </section>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              {initialData ? "Update Organization" : "Create Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizationFormModal;
