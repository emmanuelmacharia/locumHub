import type { Doc } from "~~/convex/_generated/dataModel";

type Pharmacy = Doc<"pharmacies">;
type PharmacyLocation = Doc<"pharmacyLocations">;

type PharmacyState = {
  pharmacy: Pharmacy;
  location: PharmacyLocation[];
} | null;

export const usePharmacyStore = defineStore("pharmacy", () => {
  const data = ref<PharmacyState>(null);
  const pending = ref(false);
  const error = ref<unknown>(null);

  let inflight: Promise<PharmacyState> | null = null;

  async function init(id: Pharmacy["_id"]) {
    if (data.value) return data.value; // already loaded
    if (inflight) return inflight; // already loading

    pending.value = true;
    error.value = null;

    inflight = (async () => {
      try {
        type GetPharmacyResponse = {
          pharmacy: Pharmacy;
          location: PharmacyLocation[];
        } | null;
        const url = `/api/pharmacy/getPharmacy?id=${id}`;
        let res: GetPharmacyResponse;
        if (import.meta.server) {
          const reqFetch = useRequestFetch();
          res = await reqFetch<GetPharmacyResponse>(url, {
            credentials: "include",
          });
        } else {
          res = await $fetch<GetPharmacyResponse>(url, {
            credentials: "include",
          });
        }
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

  async function refresh(id: Pharmacy["_id"]) {
    clear();
    return await init(id);
  }

  return { data, pending, error, init, clear, refresh };
});
