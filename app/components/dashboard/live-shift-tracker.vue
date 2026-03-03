<script setup lang="ts">
type ShiftStatus = "en-route" | "started" | "completed" | "no-show";

type TimeSheetItem = {
  actionName: string;
  actionCode?: string;
  timestamp: string;
  description: string;
  category:
    | "clinical_service"
    | "dispensing"
    | "consultation"
    | "operational"
    | "incident"
    | "break"
    | "other";
  quantity?: number;
  value?: string;
  notes?: string;
  severity?: "low" | "medium" | "high";
};

export type Shift = {
  shiftDetails: {
    id: string;
    pharmacyName: string;
    pharmacyLocation: string;
    startTime: string;
    endTime: string;
    staff: {
      name: string;
      rating: number;
      img?: string;
    };
    shiftStatus: ShiftStatus;
    clockedInTime?: string;
    clockedOutTime?: string;
    eta?: string;
  };
  timesheet: TimeSheetItem[];
};

const props = defineProps<{
  shifts: Shift[];
}>();

const activeShiftsCount = computed(
  () =>
    props.shifts.filter(
      (shift) =>
        shift.shiftDetails.shiftStatus === "en-route" ||
        shift.shiftDetails.shiftStatus === "started",
    ).length,
);

type ShiftConfig = {
  label: string;
  color: string;
  icon: string;
  pulse: boolean;
};

const SHIFT_CONFIG: Record<ShiftStatus, ShiftConfig> = {
  "en-route": {
    label: "En Route",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    icon: "lucide:navigation",
    pulse: true,
  },
  started: {
    label: "In Progress",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    icon: "lucide:clock",
    pulse: true,
  },
  completed: {
    label: "Completed",
    color: "bg-muted text-muted-foreground border-border",
    icon: "lucide:check-circle",
    pulse: false,
  },
  "no-show": {
    label: "No show",
    color: "bg-red-200/50 text-red-500/90 border-border",
    icon: "lucide:alarm-clock-minus",
    pulse: false,
  },
};

const shiftsWithConfig = computed(() =>
  props.shifts.map((shift) => ({
    ...shift,
    shiftConfig: SHIFT_CONFIG[shift.shiftDetails.shiftStatus as ShiftStatus],
    isActive: shift.shiftDetails.shiftStatus === "started",
  })),
);
</script>

<template>
  <div v-if="shifts.length === 0">
    <div class="flex items-center gap-2 mb-3">
      <span class="relative flex h-2 w-2">
        <span
          class="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground/30"
        />
      </span>
      <h3 class="text-base font-semibold">Today's Shifts</h3>
    </div>
    <div class="text-center py-6 text-muted-foreground">
      <Icon name="lucide:clock" class="h-8 w-8 mx-auto opacity-50" />
      <p class="text-sm">No active shifts today</p>
    </div>
  </div>
  <div v-else>
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
        <span class="relative flex h-2 w-2">
          <template v-if="activeShiftsCount > 0">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"
            />
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"
            />
          </template>
          <template v-else>
            <span
              class="relative indline-flex rounded-full h-2 w-2 bg-muted-foreground/40"
            />
          </template>
        </span>
        Today's Shifts
      </h3>
      <UIBadge variant="secondary" class="text-xs">
        {{ props.shifts.length }} shift{{ shifts.length !== 1 ? "s" : "" }}
      </UIBadge>
    </div>
    <div class="space-y-2">
      <div
        v-for="shift in shiftsWithConfig"
        :key="shift.shiftDetails.id"
        class="p-3 rounded-xl border bg-card hover:shadow-md transition-all"
      >
        <div class="flex items-start gap-3">
          <UIAvatar class="h-11 w-11 ring-2 ring-emerald-500/10">
            <UIAvatarImage :src="shift.shiftDetails.staff.img || ''" />
            <UIAvatarFallback
              class="bg-emerald-500/10 text-primary font-semibold"
            >
              {{
                shift.shiftDetails.staff.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }}
            </UIAvatarFallback>
          </UIAvatar>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1">
              <div class="flex items-center gap-2 min-w-0">
                <p class="font-semibold text-sm truncate">
                  {{ shift.shiftDetails.staff.name }}
                </p>
                <div
                  class="flex items-center gap-0 5 text-xs text-muted-foreground shrink-0"
                >
                  <Icon
                    name="lucide:star"
                    class="h-3 w-3 fill-current text-yellow-500"
                  />
                  {{ shift.shiftDetails.staff.rating }}
                </div>
              </div>
              <UIBadge
                variant="outline"
                :class="`text-[10px] shrink-0 ${shift.shiftConfig.color}`"
              >
                <template v-if="shift.shiftConfig.pulse">
                  <span class="relative flex h-1 5 w-1 5 mr-1">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"
                    />
                    <span
                      class="relative inline-flex rounded-full h-1 5 w-1 5 bg-current"
                    />
                  </span>
                </template>
                {{ shift.shiftConfig.label }}
              </UIBadge>
            </div>
            <div
              class="flex items-center gap-3 text-xs text-muted-foreground mb-2"
            >
              <span class="flex items-center gap-1">
                <Icon name="lucide:map-pin" class="h-3 w-3" />
                {{ shift.shiftDetails.pharmacyLocation }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="lucide:clock" class="h-3 w-3" />
                {{ shift.shiftDetails.startTime }} -
                {{ shift.shiftDetails.endTime }}
              </span>
              <span
                v-if="shift.isActive && shift.shiftDetails.clockedInTime"
                class="text-success font-medium"
              >
                <span class="text-success"
                  >Clocked in: {{ shift.shiftDetails.clockedInTime }}</span
                >
                <span class="text-success font-medium">
                  {{ shift.timesheet.length }} logged</span
                >
              </span>
              <span
                v-if="
                  shift.shiftDetails.shiftStatus === 'en-route' &&
                  shift.shiftDetails.eta
                "
              >
                <span class="text-yellow-500 font-medium"
                  >ETA: {{ shift.shiftDetails.eta }}</span
                >
              </span>
            </div>
            <ClientOnly>
              <div class="flex items-center gap-2">
                <UIButton
                  variant="outline"
                  size="sm"
                  class="h-7 text-xs gap-1 px-2"
                >
                  <Icon name="lucide:message-square" class="h-3 w-3" />
                  Message
                </UIButton>
                <UIButton
                  v-if="shift.isActive"
                  size="sm"
                  variant="outline"
                  class="h-7 text-xs gap-1 px-2"
                >
                  <Icon name="lucide:eye" class="h-3 w-3" />
                  Live view
                </UIButton>
                <UIButton
                  v-if="shift.isActive"
                  class="h-7 text-xs gap-1 px-2 bg-emerald-500 hover:bg-emerald-500/90"
                >
                  <Icon name="lucide:check-circle" class="h-3 w-3" />
                  Complete
                </UIButton>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
