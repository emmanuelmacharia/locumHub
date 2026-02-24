import { api } from "~~/convex/_generated/api";

export const useDashboardNavbarInfo = () => {
  const { profileData } = useServerUserProfile();

  const args = computed(() =>
    profileData.value?.user?._id ? { userId: profileData.value.user._id } : {},
  );

  const { data: navbarData } = useConvexQuery(
    api.dashboard.consolidatedDashboardNavbarInfo,
    args,
  );

  const navData = computed(() => navbarData.value);

  const pharmacyData = computed(() => {
    if (navData.value && "code" in navData.value) {
      // error case
      return null;
    }

    if (navData.value?.accountType === "pharmacy") {
      return {
        pharmacy: navData.value.pharmacy,
        locations: navData.value.locations,
      };
    }
    return null;
  });

  const locumData = computed(() => {
    if (navData.value && "code" in navData.value) {
      // error case
      return null;
    }

    if (navData.value?.accountType === "locum") {
      return { locum: navData.value.locumProfile };
    }
    return null;
  });

  return { profileData, pharmacyData, locumData };
};
