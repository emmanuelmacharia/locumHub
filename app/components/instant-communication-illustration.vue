<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-80 flex items-center justify-center">
    <div class="absolute w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl" />
    <div class="relative space-y-3">
      <div
        class="bg-card border rounded-2xl rounded-bl-sm p-4 shadow-md max-w-50"
      >
        <p class="text-sm text-foreground">
          Hi! I'm available for your Saturday shift.
        </p>
        <span class="text-xs text-muted-foreground mt-1 block">9:42 AM</span>
      </div>
      <div
        class="bg-gradient-primary rounded-2xl rounded-br-sm p-4 shadow-md max-w-50 ml-auto"
      >
        <p class="text-sm text-primary-foreground">
          Perfect! Booking confirmed ✓
        </p>
        <span class="text-xs text-primary-foreground/70 mt-1 block"
          >9:43 AM</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
