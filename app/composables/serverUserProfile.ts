import { useUserProfileStore } from "~/stores/userProfile";

type Options = {
  // Whether to bypass cache and re-fetch data on init
  bypassCache?: boolean;
  /**
   * If true, will immediately kick off loading (and await in SSR contexts).
   * In middleware you typically want preload: true.
   */
  preload?: boolean;
};

export const useServerUserProfile = (options: Options = {}) => {
  const { bypassCache = false, preload = false } = options;
  const store = useUserProfileStore();

  const { data, pending, error, accountType } = storeToRefs(store);

  const isReady = computed(() => !pending.value && data.value !== null);

  const hasProfile = computed(() => !!data.value?.profile);

  async function ensureLoaded() {
    if (bypassCache) return store.refresh();
    return store.init();
  }
  if (preload) {
    // Kick off loading immediately (e.g. in middleware)
    // in Nuxt, it's fine to call and return the promise.
    // In a component/layout you can `await useServerUserProfile({ preload: true }).ensureLoaded()`
    // In middleware you can `await ensureLoaded()` right after calling composable.
    void store.init();
  }

  return {
    profileData: data,
    pending,
    accountType,
    isReady,
    hasProfile,
    ensureLoaded,
    refresh: () => store.refresh(),
    clear: () => store.clear(),
  };
};
