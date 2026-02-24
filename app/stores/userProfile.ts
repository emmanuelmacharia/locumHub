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
  let generation = 0;

  async function init() {
    if (data.value) return data.value; // already loaded
    if (inflight) return inflight; // already loading

    pending.value = true;
    error.value = null;

    const currentGen = ++generation;

    inflight = (async () => {
      try {
        if (currentGen !== generation) {
          // A newer init() call has been made, so we should ignore this one.
          return data.value;
        }
        type GetUserProfileResponse = {
          user: User;
          profile: UserProfile;
        } | null;
        const url: string = "/api/auth/getUserProfile";

        let res: GetUserProfileResponse;
        if (import.meta.server) {
          const reqFetch = useRequestFetch();
          res = await reqFetch<GetUserProfileResponse>(url, {
            credentials: "include",
          });
        } else {
          res = await $fetch<GetUserProfileResponse>(url, {
            credentials: "include",
          });
        }
        data.value = res;
        return res;
      } catch (err) {
        if (currentGen !== generation) {
          // A newer init() call has been made, so we should ignore this one.
          return null;
        }
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
    generation++;
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
