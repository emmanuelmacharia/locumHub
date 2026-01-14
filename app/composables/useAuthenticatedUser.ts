import { useUser } from "@clerk/vue";
import { useConvexQuery } from "convex-vue";
import { api } from "~~/convex/_generated/api";

export const useAuthenticatedUser = () => {
  // clerk auth
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();

  const userId = computed(() => clerkUser.value?.id);
  const shouldSkip = computed(() => !isClerkLoaded.value || !userId.value);

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

  return {
    user: computed(() => clerkUser.value),
    userData: computed(() => (shouldSkip.value ? null : userData.value)),
    isAuthenticated: computed(() => isClerkLoaded.value && !!clerkUser.value),
    isLoaded: computed(() => isClerkLoaded.value && !isPending.value),
    isLoading: computed(() => !isClerkLoaded.value || isPending.value),
    error,
    // Individual refs for destructuring
    isClerkLoaded,
    isPending,
  };
};
