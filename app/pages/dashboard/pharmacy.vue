<script setup lang="ts">
definePageMeta({
  layout: "logged-in",
  middleware: ["01-user-type"],
});

const mockLocations = [
  {
    id: 1,
    name: "Central Clinic",
    favouriteCount: 5,
    complianceStatus: 0,
    shifts: 2,
    selected: false,
  },
  {
    id: 2,
    name: "Westside Medical",
    favouriteCount: 2,
    complianceStatus: 1,
    shifts: 2,
    selected: false,
  },
  {
    id: 3,
    name: "Downtown Health",
    favouriteCount: 0,
    complianceStatus: 0,
    shifts: 2,
    selected: false,
  },
  {
    id: 4,
    name: "Lakeside Practice",
    favouriteCount: 3,
    complianceStatus: 1,
    shifts: 2,
    selected: false,
  },
];
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 mg:pb-8">
    <section class="mb-10">
      <div class="flex items-center justify-between mb-6">
        <ClientOnly>
          <DashboardLocationSwitcher :locations="mockLocations" :all="true" />
        </ClientOnly>
      </div>
      <div class="grid grid-cols-4 gap-6">
        <div>
          <p class="text-3xl font-bold text-foreground">3</p>
          <p class="text-sm text-muted-foreground">Open Shifts</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-foreground">
            KES {{ 3000 / 1000 }}k
          </p>
          <p class="text-sm text-muted-foreground">Weekly spend</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-foreground">40%</p>
          <p class="text-sm text-muted-foreground">Repeat bookings</p>
        </div>
        <div>
          <div class="flex items-center gap-1">
            <Icon
              name="lucide:star"
              fill="currentColor"
              class="w-5 h-5 text-yellow-500"
            />
            <p class="text-3xl font-bold text-foreground">4.8</p>
          </div>
          <p class="text-sm text-muted-foreground">Avg Rating given</p>
        </div>
      </div>
    </section>
    <UISeparator class="mb-8" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 my-6">
      <div class="lg:col-span-2 space-y-10">
        <section>
          <ClientOnly>
            <DashboardApplicationReviewSummary
              :review="{
                type: 'Job',
                count: 20,
                urgency: 'info',
                stats: { averageRating: 4.1, returning: 2 },
              }"
            />
          </ClientOnly>
        </section>
      </div>
    </div>
    <UISeparator class="mb-8" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="lg:col-span-2 space-y-10">
        <section>
          <ClientOnly>
            <DashboardApplicationReviewSummary
              :review="{
                type: 'Timesheet',
                count: 20,
                urgency: 'info',
                stats: { totalHours: '41', locations: 4 },
              }"
            />
          </ClientOnly>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
