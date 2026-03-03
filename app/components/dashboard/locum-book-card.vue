<script setup lang="ts">
type Availability = "available" | "busy" | "unknown";
export type FavouriteLocum = {
  name: string;
  rating: number;
  availability: Availability;
  locumId: string;
  lastWorked: string;
  image: string;
};

type FavConfig = {
  icon: string;
  style: string;
  text: string;
};

const props = defineProps<{ favourites: FavouriteLocum[] }>();
const showAll = ref(false);

const FAV_CONFIG: Record<Availability, FavConfig> = {
  available: {
    icon: "lucide:circle",
    style: "h-2.5 w-2.5 fill-emerald-500 text-emerald-500",
    text: "Available now",
  },
  busy: {
    icon: "lucide:clock",
    style: "h-2.5 w-2.5 text-warning",
    text: "On shift",
  },
  unknown: {
    icon: "lucide:circle",
    style: "h-2.5 w-2.5 fill-muted-foreground/30 text-muted-foreground/30",
    text: "",
  },
};

const formatLastWorked = (date?: string) => {
  if (!date) return "Never";
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString("en-KE", { month: "short", day: "numeric" });
};

const favouritesWithAvailabilityConfig = computed(() =>
  props.favourites.map((fav) => ({
    ...fav,
    config: FAV_CONFIG[fav.availability as Availability],
    last: formatLastWorked(fav.lastWorked),
  })),
);

const displayedFavourites = computed(() =>
  !showAll.value
    ? favouritesWithAvailabilityConfig.value.slice(0, 3)
    : favouritesWithAvailabilityConfig.value,
);
const handleClick = () => (showAll.value = !showAll.value);
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h3 class="text-sm font-semibold text-foreground">Priority Locums</h3>
      <UIBadge variant="secondary" class="text-xs">
        {{ favourites.length }} favourites
      </UIBadge>
    </div>
    <div
      :class="`space-y-1.5 ${showAll && `grid grid-cols-1 sm:grid-cols-2 gap-2`}`"
    >
      <div
        v-for="favourite in displayedFavourites"
        :key="favourite.locumId"
        :class="`flex items-center gap-6 p-2.5 rounded-xl border bg-card hover:bg-muted/50 transition-all group ${favourite.availability === 'available' && 'border-emerald-500/30 hover:border-emerald-500/50'}`"
      >
        <div class="relative">
          <UIAvatar class="h-11 w-11 ring-2 ring-emerald-500/10">
            <UIAvatarImage :src="favourite.image || ''" />
            <UIAvatarFallback
              class="bg-emerald-500/10 text-primary font-semibold"
            >
              {{
                favourite.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }}
            </UIAvatarFallback>
          </UIAvatar>
          <Icon
            name="lucide:check-circle"
            class="absolute -bottom-0.5 -right-2.5 h-4 w-4 text-emerald-500 bg-emerald-500 rounded-full"
          />
        </div>
        <div class="flex flex-col flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-0.5">
            <p class="font-medium text-sm truncate">{{ favourite.name }}</p>
            <div
              class="flex items-center gap-0 5 text-xs text-muted-foreground"
            >
              <Icon
                name="lucide:star"
                class="h-3 w-3 fill-current text-yellow-500"
              />
              {{ favourite.rating }}
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              class="flex items-center gap-1"
              v-if="favourite.availability !== 'unknown'"
            >
              <Icon
                :name="favourite.config.icon"
                :class="favourite.config.style"
              />
              {{ favourite.config.text }}
            </span>
            <span
              class="text-border"
              v-if="favourite.availability !== 'unknown'"
              >•</span
            >
            <span>Last: {{ favourite.last }}</span>
          </div>
        </div>
        <ClientOnly>
          <UIButton
            size="sm"
            :class="`h-8 px-3 text-xs font-medium transition-all ${favourite.availability === 'available' ? 'bg-emerald-500/30 hover:bg-emerald-200/90 text-emerald-500' : 'bg-gray-500 hover:bg-gray-500/90'}`"
          >
            Book
          </UIButton>
        </ClientOnly>
      </div>
    </div>
    <ClientOnly>
      <UIButton
        v-if="favourites.length > 4"
        variant="ghost"
        size="sm"
        class="w-full text-xs text-emerald-500 hover:text-emerald-500/90 gap-1"
        @click="handleClick()"
      >
        {{ showAll ? "Show less" : "Show all" }}
        <Icon :name="showAll ? 'lucide:chevron-up' : 'lucide:chevron-down'" />
      </UIButton>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
