import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import organizationService from "../../Services/organizationService";

import OrganizationTable from "../../Components/organization/OrganizationTable";
// import CreateOrganizationModal from "../../Components/organization/OrganizationFormModal";
import OrganizationFormModal from "../../Components/organization/OrganizationFormModal";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  /**
   * Fetch Organizations
   */
  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const response = await organizationService.getAllOrganizations();

      setOrganizations(response);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch organizations.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create Organization
   */
  const handleCreateOrganization = async (formData) => {
    try {
      if (selectedOrganization) {
        await organizationService.updateOrganization(
          selectedOrganization.organizationId,
          formData,
        );

        toast.success("Organization updated successfully.");
      } else {
        await organizationService.createOrganization(formData);

        toast.success("Organization created successfully.");
      }

      setOpenModal(false);
      setSelectedOrganization(null);

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to save organization.");
    }
  };

  /**
   * Send Onboarding Email
   */
  const handleSendOnboarding = async (organizationId) => {
    try {
      await organizationService.sendOnboarding(organizationId);

      toast.success("Onboarding email sent successfully.");

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to send onboarding email.");
    }
  };

  /**
   * Activate Organization
   */
  const handleActivateOrganization = async (organizationId) => {
    try {
      await organizationService.activateOrganization(organizationId);

      toast.success("Organization activated successfully.");

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to activate organization.");
    }
  };

  /**
   * Deactivate Organization
   */
  const handleDeactivateOrganization = async (organizationId) => {
    try {
      await organizationService.deactivateOrganization(organizationId);

      toast.success("Organization deactivated successfully.");

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to deactivate organization.");
    }
  };

  const handleEditOrganization = (organization) => {
    setSelectedOrganization(organization);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Organizations</h1>

          <p className="text-slate-500 mt-1">
            Manage all organizations from one place.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedOrganization(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Create Organization
        </button>
      </div>

      {/* Organization Table */}

      <OrganizationTable
        organizations={organizations}
        loading={loading}
        onSendOnboarding={handleSendOnboarding}
        onActivate={handleActivateOrganization}
        onDeactivate={handleDeactivateOrganization}
        onEdit={handleEditOrganization}
      />

      {/* Create Organization Modal */}

      <OrganizationFormModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedOrganization(null);
        }}
        onSubmit={handleCreateOrganization}
        initialData={selectedOrganization}
      />
    </div>
  );
};

export default Organizations;
