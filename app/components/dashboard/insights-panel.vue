<script setup lang="ts">
export interface DashboardStats {
  weeklySpend: number;
  lastWeekSpend: number;
  averageHourlyRate: number;
  avgRatingThisMonth: number;
  repeatBookingRate: number;
  totalPlacements: number;
  activeRequests: number;
  unreadMessages: number;
  fillRate: number;
  avgTimeToFill: number;
  shiftsThisWeek: number;
  shiftsFilled: number;
}

export interface CoverageAlert {
  id: string;
  type: "coverage_risk" | "compliance" | "rate_change";
  message: string;
  severity: "info" | "warning" | "critical";
  locationId?: string;
  date?: string;
  probability?: number;
}

export interface InsightsPanelProps {
  stats: DashboardStats;
  alerts: CoverageAlert[];
}

const { config } = defineProps<{ config: InsightsPanelProps }>();

const criticalAlerts = computed(() =>
  config.alerts.filter((c) => c.severity === "critical"),
);
const warningAlerts = computed(() =>
  config.alerts.filter((a) => a.severity === "warning"),
);
</script>

<template>
  <div
    v-if="criticalAlerts.length > 0 || warningAlerts.length > 0"
    class="space-y-4"
  >
    <div class="space-y-2">
      <div
        v-for="alert in criticalAlerts"
        :key="alert.id"
        class="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/10 border border-destructive/30"
      >
        <Icon
          name="alert-triangle"
          class="h-4 w-4 text-destructive shrink-0 mt-0.5"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-destructive">
            {{ alert.message }}
          </p>
          <p
            class="text-sm font-medium text-destructive"
            v-if="alert.probability"
          >
            {{ alert.probability }}% chance if high demand
          </p>
        </div>
      </div>
      <div
        v-for="alert in warningAlerts"
        :key="alert.id"
        class="flex items-start gap-2 5 p-3 rounded-lg bg-warning/10 border border-warning/30"
      >
        <Icon
          name="alert-triangle"
          class="h-4 w-4 text-warning shrink-0 mt-0.5"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-warning">
            {{ alert.message }}
          </p>
          <p
            v-if="alert.probability"
            class="text-xs text-destructive/80 mt-0.5"
          >
            {{ alert.probability }}% chance of high demand
          </p>
        </div>
      </div>
      <UICard class="border-0 shadow-sm bg-card/50">
        <UICardContent class="p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="rounded-lg p-1.5 bg-gradient-primary/10">
                <div class="h-4 w-4 text-primary">
                  <Icon
                    name="lucide:dollar-sign"
                    class="h-4 w-4 text-emerald-500"
                  />
                </div>
                <div>
                  <p class="text-sm font-medium">Weekly Spend</p>
                  <p class="text-xs text-muted-foreground">
                    KES{{ config.stats.weeklySpend.toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UICardContent>
      </UICard>
      <div class="grid grid-cols-2 gap-3">
        <UICard class="border-0 shadow-sm bg-card/50">
          <UICardContent class="p-3">
            <div class="flex items-center gap-2 mb-1.5">
              <Icon
                name="lucide:check-circle"
                class="h-3.5 w-3.5 text-emerald-500"
              />
              <p class="text-muted-foreground uppercase text-xs tracking-wider">
                Avg Fill Rate
              </p>
            </div>
            <p class="text-2xl font-bold">{{ config.stats.fillRate }}%</p>
            <p class="text-muted-foreground text-[10px]">
              {{ config.stats.shiftsFilled }}/{{ config.stats.shiftsThisWeek }}
            </p>
          </UICardContent>
        </UICard>
        <UICard class="border-0 shadow-sm bg-card/50">
          <UICardContent class="p-3">
            <div class="flex items-center gap-2 mb-1.5">
              <Icon name="lucide:clock" class="h-3.5 w-3.5 text-emerald-500" />
              <p class="text-muted-foreground uppercase text-xs tracking-wider">
                Time to fill
              </p>
            </div>
            <p class="text-2xl font-bold">{{ config.stats.avgTimeToFill }}h</p>
            <p class="text-muted-foreground text-[10px]">avg this week</p>
          </UICardContent>
        </UICard>
        <UICard class="border-0 shadow-sm bg-card/50">
          <UICardContent class="p-3">
            <div class="flex items-center gap-2 mb-1.5">
              <Icon name="lucide:star" class="h-3.5 w-3.5 text-emerald-500" />
              <p class="text-muted-foreground uppercase text-xs tracking-wider">
                Avg Rating
              </p>
            </div>
            <p class="text-2xl font-bold">
              {{ config.stats.avgRatingThisMonth }}
            </p>
            <p class="text-muted-foreground text-[10px]">this month</p>
          </UICardContent>
        </UICard>
        <UICard class="border-0 shadow-sm bg-card/50">
          <UICardContent class="p-3">
            <div class="flex items-center gap-2 mb-1.5">
              <Icon
                name="lucide:refresh-cw"
                class="h-3.5 w-3.5 text-emerald-500"
              />
              <p class="text-muted-foreground uppercase text-xs tracking-wider">
                Repeat
              </p>
            </div>
            <p class="text-2xl font-bold">
              {{ config.stats.repeatBookingRate }}%
            </p>
            <p class="text-muted-foreground text-[10px]">rebook rate</p>
          </UICardContent>
        </UICard>
      </div>
      <UICard
        class="border-00 shadow-lg bg-gradient-to-br from-gradient-primary/10 via-gradient-primary/5 to-transparent border-primary/20"
      >
        <UICardContent class="p-4">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-xl bg-gradient-primary/10">
              <Icon name="users" class="h-5 w-5 text-gradient-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-foreground">
                Find Available
              </h3>
              <p class="text-xs text-muted-foreground">
                Browse verified locums in your area
              </p>
            </div>
          </div>
          <UIButton
            class="w-full mt-3 bg-gradient-primary hover:opacity-90"
            size="sm"
            as-child
          >
            <NuxtLink>
              Browse Staff
              <Icon name="arrow-right" class="ml-1 h-4 w-4" />
            </NuxtLink>
          </UIButton>
        </UICardContent>
      </UICard>
    </div>
  </div>
</template>

<style scoped></style>
