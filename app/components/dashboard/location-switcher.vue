<script setup lang="ts">
import Badge from "../ui/badge/Badge.vue";

type Location = {
  id: number;
  name: string;
  favouriteCount: number;
  complianceStatus: number; // 0 - compliant, 1 - non-compliant
  shifts?: number;
  selected: boolean;
};

const props = withDefaults(
  defineProps<{
    locations: Location[];
    all: boolean;
  }>(),
  {
    all: true,
  },
);

const emits = defineEmits<{
  (e: "selectLocation", location: Location): void;
}>();

const open = ref(false);

const nonCompliance = computed(() => {
  return props.locations.some((loc) => loc.complianceStatus === 1);
});

const selectedLocationId = defineModel<string>("selectedId", {
  default: "all",
});
const selectedLocation = computed(() => {
  return props.locations.find(
    (loc) => loc.id.toString() === selectedLocationId.value,
  );
});

const handleLocationSelection = (location: Location) => {
  selectedLocationId.value = location.id.toString();
  open.value = false;
  emits("selectLocation", location);
};
</script>

<template>
  <UIDropdownMenu v-model:open="open">
    <UIDropdownMenuTrigger asChild>
      <UIButton
        variant="outline"
        class="gap-2 h-9 text-sm justify-between min-w-[180px]"
        :class="nonCompliance ? 'border-yellow-500/30' : ''"
      >
        <div class="flex items-center gap-2">
          <Icon name="lucide:map-pin" class="w-4 h-4 text-muted-foreground" />
          <span class="truncate max-w-[120px]">
            {{ selectedLocation?.name ?? "All Locations" }}
          </span>
        </div>
        <UIBadge
          v-if="locations.some((loc) => loc.complianceStatus === 1)"
          class="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[10px] px-1.5 py-0"
          >!</UIBadge
        >
        <Icon
          name="lucide:chevron-down"
          class="w-4 h-4 text-muted-foreground"
        />
      </UIButton>
      <ChevronDownIcon class="w-4 h-4" />
    </UIDropdownMenuTrigger>
    <UIDropdownMenuContent align="start" class="w-72">
      <UIDropdownMenuLabel class="text-xs text-muted-foreground"
        >Select Location</UIDropdownMenuLabel
      >
      <UIDropdownMenuSeparator />

      <UIDropdownMenuItem
        @click="
          handleLocationSelection({
            name: 'All Locations',
            id: 0,
            favouriteCount: 0,
            complianceStatus: 0,
            shifts: 0,
            selected: true,
          })
        "
        class="py-2.5 cursor-pointer hover:bg-emerald-500/10!"
        :class="selectedLocationId === 'all' && 'bg-emerald-500/30!'"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
            <Icon name="lucide:map-pin" class="w-4 h-4 text-muted-foreground" />
            <span class="font-medium">All Locations</span>
          </div>
          <Badge variant="secondary" class="text-xs">{{
            locations.length
          }}</Badge>
        </div>
      </UIDropdownMenuItem>

      <UIDropdownMenuSeparator />

      <template v-for="location in locations" :key="location.id">
        <UIDropdownMenuItem
          @click="handleLocationSelection(location)"
          class="cursor-pointer py-2.5 hover:bg-emerald-500/10!"
        >
          <div class="flex flex-col w-full gap-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon
                  :name="
                    location.complianceStatus
                      ? 'lucide:circle-alert'
                      : 'lucide:circle-check'
                  "
                  :class="
                    location.complianceStatus
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-gradient-primary'
                  "
                />
                <span class="font-medium text-sm">{{ location.name }}</span>
              </div>
            </div>
            <div
              class="flex items-center gap-3 text-xs text-muted-foreground ml-5"
            >
              <span v-if="location.shifts">
                <span class="flex items-center gap-1 text-yellow-500/80">
                  <Icon name="lucide:clock" class="w-3 h-3 text-yellow-500" />
                  Gap: {{ location.shifts }} shifts
                </span>
              </span>
              <span class="flex items-center gap-1">
                <Icon
                  name="lucide:users"
                  fill="currentColor"
                  class="w-3 h-3 text-muted-foreground"
                />
                {{ location.favouriteCount }} favorites
              </span>
            </div>
          </div>
        </UIDropdownMenuItem>
      </template>
    </UIDropdownMenuContent>
  </UIDropdownMenu>
</template>

<style scoped></style>
