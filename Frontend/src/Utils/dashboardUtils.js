export const calculateOrganizationStats = (organizations) => {
  return {
    totalOrganizations: organizations.length,

    activeOrganizations: organizations.filter((org) => org.active).length,

    inactiveOrganizations: organizations.filter((org) => !org.active).length,

    completedOnboarding: organizations.filter((org) => org.onboardingCompleted)
      .length,

    pendingOnboarding: organizations.filter((org) => !org.onboardingCompleted)
      .length,
  };
};
