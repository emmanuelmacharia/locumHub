import { useUser } from "@clerk/vue";
import { useConvexQuery } from "convex-vue";
import { api } from "~~/convex/_generated/api";

export const useAuthenticatedUser = () => {
  // clerk auth
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();

  const userId = computed(() => {
    if (!isClerkLoaded.value) return null;
    return clerkUser.value?.id;
  });
  const shouldSkip = computed(() => !userId.value);

  const {
    data: userData,
    isPending,
    error,
  } = useConvexQuery(
    api.users.user.fetchUser,
    computed(() =>
      shouldSkip.value ? { userId: "" } : { userId: userId.value! }
    )
  );

  const userProfileArgs = computed(() => {
    if (shouldSkip.value || !userData.value?._id) return null;
    return { userId: userData.value._id };
  });

  const { data: userProfileData } = useConvexQuery(
    api.users.userProfile.getUserProfileByUserId,
    computed(() => userProfileArgs.value || { userId: undefined }) //TODO: investigate the "skip" behaviour built into useConvexQuery
  );

  const isFullyOnboarded = computed(
    () => !!userData.value && !!userProfileData.value
  );

  return {
    user: computed(() => clerkUser.value), // Clerk user object
    userData: computed(() => (shouldSkip.value ? null : userData.value)), // userf from Convex
    userProfileData: computed(() =>
      shouldSkip.value ? null : userProfileData.value
    ), // user profile from Convex
    isFullyOnboarded, // has both user, user profile on convex
    isLoaded: computed(() => isClerkLoaded.value && !isPending.value), // both clerk loaded and convex query not pending
    error,
    // Individual refs for destructuring
    isClerkLoaded,
    isPending,
  };
};
