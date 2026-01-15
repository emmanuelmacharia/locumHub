<script setup lang="ts">
const days = ["S", "M", "T", "W", "T", "F", "S"];

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthDays = (year: number, month: number) =>
  new Date(year, month, 0).getDate();
</script>

<template>
  <div class="relative w-full h-80 flex items-center justify-center">
    <div
      class="absolute w-56 h-56 bg-emerald-600/10 rounded-3xl rotate-12 blur-xl"
    />
    <div class="relative bg-card border rounded-2xl p-6 shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-foreground">{{
          `${months[month - 1]} ${year}`
        }}</span>
        <Icon name="lucide:calendar" class="w-5 h-5 text-emerald-600" />
      </div>
      <div class="grid grid-cols-7 gap-2 text-center text-xs">
        <span
          v-for="day in days"
          :key="day"
          class="text-muted-foreground font-medium"
          >{{ day }}</span
        >
        <span
          v-for="(i, index) in [...Array(monthDays(year, month))]"
          :key="index"
          :class="`w-8 h-8 flex items-center justify-center rounded-lg ${
            [4, 11, 18, 25].includes(index)
              ? 'bg-emerald-600 text-primary-foreground font-medium'
              : [2, 9, 16, 23].includes(index)
                ? 'bg-emerald-600/20 text-primary'
                : 'text-muted-foreground'
          }`"
        >
          {{ index + 1 }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
