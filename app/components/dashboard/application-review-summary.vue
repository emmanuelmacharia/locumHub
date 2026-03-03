<script setup lang="ts">
type ApplicationStats = {
  averageRating: number;
  returning?: number;
};

type TimesheetStats = {
  totalHours: string;
  locations?: number;
};

type Urgency = "info" | "warning" | "critical";

type Reviews = {
  header?: string;
  type: "Job" | "Timesheet";
  count: number;
  urgency: Urgency;
  stats: ApplicationStats | TimesheetStats;
};

const props = defineProps<{ review: Reviews }>();

// const emit = defineEmits<{
//   (e: "routeToReview"): void;
// }>();

const type = computed(() =>
  props.review.type === "Job" ? "Applicaitons" : "Shift Reviews",
);

const CRITICAL_COLORS: Record<Urgency, string> = {
  info: "bg-teal-500",
  warning: "bg-yellow-500",
  critical: "bg-red-400",
};

const computedCardTypeColor = computed(() => {
  if (props.review.type === "Timesheet")
    return {
      buttongrad: "bg-linear-to-br from-red-500/5 via-card to-yellow-500/5",
      hoverColor: "hover:bg-red-100/5 hover:border-red-500/30",
    };
  return {
    buttongrad: "bg-linear-to-br from-card via-card to-emerald-500/5",
    hoverColor: "hover:bg-emerald-500/5 hover:border-emerald-500/30",
  };
});

const avatarLimit = computed(() =>
  props.review.count > 3 ? 3 : props.review.count,
);
</script>

<template>
  <div v-if="props.review.count === 0">
    <div class="flex items-center gap-2 mb-3">
      <Icon
        :name="
          props.review.type === 'Job'
            ? 'lucide:users'
            : 'lucide:clipboard-check'
        "
      />
      <h3 class="text-base font-semibold">
        {{ type }}
      </h3>
    </div>
    <div class="p-6 rounded-xl border border-dashed bg-muted/20 text-center">
      <div class="text-sm text-muted-foreground mb-1">
        No pending {{ type }}
      </div>
      <div class="text-xs text-muted-foreground">
        {{
          props.review.type === "Job"
            ? `Applications will appear here when locums apply to your shifts`
            : `Completed shifts will appear here for your review`
        }}
      </div>
    </div>
  </div>
  <div v-else>
    <div class="">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <Icon
            :name="
              props.review.type === 'Job'
                ? 'lucide:users'
                : 'lucide:clipboard-check'
            "
          />
          <h3 class="text-base font-semibold">
            {{ type }}
          </h3>
          <UIBadge
            :class="`${CRITICAL_COLORS[props.review.urgency]} text-xs px-2`"
          >
            {{ props.review.count }} pending
          </UIBadge>
        </div>
      </div>
      <ClientOnly>
        <button
          class="w-full group relative overflow-hidden rounded-2xl border text-left transition-all hover:shadow-lg"
          :class="`${computedCardTypeColor.buttongrad} ${computedCardTypeColor.hoverColor}`"
        >
          <div
            class="absolute inset-0 bg-grid-primary/[0.02] pointer-events-none"
          />
          <div class="relative p-4">
            <div class="flex items-center mb-4">
              <div class="flex -space-x-3">
                <div
                  v-for="num in avatarLimit"
                  :key="num"
                  class="relative"
                  :style="{ 'z-index': `${props.review.count - num}` }"
                >
                  <UIAvatar class="h-11 w-11 ring-2 ring-background bg-muted">
                    <UIAvatarImage src="" />
                    <UIAvatarFallback
                      class="bg-primary/10 text-primary text-xs font-semibold"
                    />
                  </UIAvatar>
                  <Icon
                    v-if="props.review.type === 'Job'"
                    name="lucide:circle-check"
                    class="text-emerald-500/50 absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full"
                  />
                </div>
                <div
                  v-if="props.review.count - 4 > 0"
                  class="h-11 w-11 rounded-full ring-2 ring-background bg-muted flex items-center justify-center"
                >
                  <span class="text-xs font-medium text-muted-foreground">
                    +{{ props.review.count - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4 px-4 text-sm">
            <div class="">
              <p class="text-2xl font-bold text-foreground">
                {{ props.review.count }}
              </p>
              <p class="text-xs text-muted-foreground">Awaiting review</p>
            </div>
            <div class="h-10 w-px bg-border" />
            <div class="">
              <div class="flex flex-col items-center gap-1">
                <div class="flex items-center gap-2">
                  <Icon
                    v-if="props.review.type === 'Job'"
                    name="lucide:star"
                    class="text-lg text-muted-foreground fill-yellow-500 text-yellow-500"
                  />
                  <Icon
                    v-else
                    name="lucide:clock-check"
                    class="text-lg text-muted-foreground"
                  />
                  <span class="text-2xl font-semibold">
                    {{
                      props.review.type === "Job"
                        ? (props.review.stats as ApplicationStats).averageRating
                        : `${(props.review.stats as TimesheetStats).totalHours}h`
                    }}
                  </span>
                </div>
                <p
                  v-if="props.review.type === 'Job'"
                  class="text-xs text-muted-foreground"
                >
                  Avg rating
                </p>
                <p v-else class="text-xs text-muted-foreground">Total hours</p>
              </div>
            </div>
            <div class="h-10 w-px bg-border" />
            <div class="">
              <div class="flex gap-2 items-center">
                <Icon
                  v-if="props.review.type === 'Timesheet'"
                  name="lucide:map-pin"
                  class="text-lg text-muted-foreground"
                />
                <span class="text-2xl font-semibold text-emerald-500">
                  {{
                    props.review.type === "Job"
                      ? (props.review.stats as ApplicationStats).returning
                      : (props.review.stats as TimesheetStats).locations
                  }}
                </span>
              </div>
              <p class="text-xs text-muted-foreground">
                {{ props.review.type === "Job" ? "Returning" : "Locations" }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between p-4">
            <p
              v-if="props.review.type === 'Job'"
              class="text-sm text-muted-foreground"
            >
              Review and respond to applicants
            </p>
            <p v-else class="text-sm text-muted-foreground">
              Review timesheets & verify activities
            </p>
            <div
              class="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
            >
              Review All
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
            </div>
          </div>
        </button>
        <template #fallback>
          <div
            class="p-6 rounded-xl border border-dashed bg-muted/20 text-center"
          >
            <div class="text-sm text-muted-foreground mb-1">
              Loading data...
            </div>
            <div class="text-xs text-muted-foreground">
              {{
                props.review.type === "Job"
                  ? `Applications will appear here when locums apply to your shifts`
                  : `Completed shifts will appear here for your review`
              }}
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
