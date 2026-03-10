<script setup lang="ts">
import { useViewPort } from "~/composables/viewPort";
import type { Location } from "./location-switcher.vue";

const { isMobile } = useViewPort();

const open = ref(false);
const isUrgent = ref(false);
const step = ref(0);

defineProps<{ locations: Location[] }>();

const drawerDescription: Record<number, string> = {
  0: "Which location needs coverage?",
  1: "Select the date and time for the shift",
  2: "Enter job description and required skills",
  3: "Review and post request",
};

function handleOpenChange(nextOpen: boolean) {
  open.value = nextOpen;
  if (!nextOpen) {
    isUrgent.value = false;
  }
}

watch(
  () => isMobile,
  () =>
    console.log(
      "here is the whether we are in mobile view =====>",
      isMobile.value,
    ),
);
</script>

<template>
  <div v-if="isMobile">
    <UIDrawer v-model:open="open" @update:open="handleOpenChange">
      <UIDrawerTrigger as-child>
        <DashboardQuickRequestButton class="w-full" />
      </UIDrawerTrigger>
      <UIDrawerContent>
        <UIDrawerHeader>
          <UIDrawerTitle>
            <div class="flex justify-between items-center">
              <div class="text-lg font-semibold">Request staff</div>
              <div class="flex items-center gap-3">
                <UILabel
                  for="urgent-mode"
                  class="text-sm.text-muted-foreground"
                >
                  Urgent
                </UILabel>
                <UISwitch
                  id="urgent-mode"
                  v-model="isUrgent"
                  :class="isUrgent && 'data-[state=checked]:bg-red-500'"
                />
                <UIBadge variant="destructive" class="gap-1" v-if="isUrgent">
                  <Icon name="lucide:zap" />
                  +15%
                </UIBadge>
              </div>
            </div>
            <UIDrawerDescription>
              {{ drawerDescription[step] }}
            </UIDrawerDescription>
          </UIDrawerTitle>
        </UIDrawerHeader>
        <DashboardShiftRequestFormContent
          :open="open"
          :isUrgent="isUrgent"
          :locations="locations"
          @step-event="($event) => (step = $event)"
        />
      </UIDrawerContent>
    </UIDrawer>
  </div>
  <div v-else>
    <UIDialog v-model:open="open" @update:open="handleOpenChange">
      <UIDialogTrigger as-child>
        <DashboardQuickRequestButton class="w-full" />
      </UIDialogTrigger>
      <UIDialogContent>
        <UIDialogHeader>
          <UIDialogTitle>
            <div class="flex justify-between items-center">
              <div class="text-lg font-semibold">Request staff</div>
              <div class="flex items-center gap-3">
                <UILabel
                  for="urgent-mode"
                  class="text-sm.text-muted-foreground"
                >
                  Urgent
                </UILabel>
                <UISwitch
                  id="urgent-mode"
                  v-model="isUrgent"
                  :class="isUrgent && 'data-[state=checked]:bg-red-500'"
                />
                <UIBadge variant="destructive" class="gap-1" v-if="isUrgent">
                  <Icon name="lucide:zap" />
                  +15%
                </UIBadge>
              </div>
            </div>
            <UIDialogDescription>
              {{ drawerDescription[step] }}
            </UIDialogDescription>
          </UIDialogTitle>
        </UIDialogHeader>
        <DashboardShiftRequestFormContent
          :open="open"
          :isUrgent="isUrgent"
          :locations="locations"
          @step-event="($event) => (step = $event)"
        />
      </UIDialogContent>
    </UIDialog>
  </div>
</template>

<style scoped></style>
