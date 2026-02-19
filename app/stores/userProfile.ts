import type { Doc } from "~~/convex/_generated/dataModel";

type User = Doc<"users">;
type UserProfile = Doc<"userProfiles">;

type UserProfileState = {
  user: User;
  profile: UserProfile;
} | null;

export const useUserProfileStore = defineStore("userProfile", () => {
  const data = ref<UserProfileState>(null);
  const pending = ref(false);
  const error = ref<unknown>(null);

  let inflight: Promise<UserProfileState> | null = null;

  async function init() {
    if (data.value) return data.value; // already loaded
    if (inflight) return inflight; // already loading

    pending.value = true;
    error.value = null;

    inflight = (async () => {
      try {
        const reqFetch = import.meta.server ? useRequestFetch() : $fetch;
        const res = await reqFetch<{ user: User; profile: UserProfile } | null>(
          "/api/auth/getUserProfile",
          { credentials: "include" },
        );
        data.value = res;
        return res;
      } catch (err) {
        error.value = err;
        data.value = null;
        return null;
      } finally {
        pending.value = false;
        inflight = null;
      }
    })();

    return inflight;
  }

  function clear() {
    data.value = null;
    error.value = null;
    inflight = null;
    pending.value = false;
  }

  async function refresh() {
    clear();
    return await init();
  }

  function set(v: UserProfileState) {
    data.value = v;
  }

  const accountType = computed(() => data.value?.profile.accountType ?? null);

  return { data, pending, error, init, clear, refresh, set, accountType };
});
