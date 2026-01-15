<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-80 flex items-center justify-center">
    <div
      class="absolute w-64 h-40 bg-emerald-600/10 rounded-3xl rotate-3 blur-xl"
    />
    <div class="relative bg-card border rounded-2xl p-6 shadow-lg">
      <div class="flex items-center justify-between mb-6">
        <span class="text-sm font-medium text-foreground"
          >Payment Received</span
        >
        <Icon name="lucide:check-circle" class="w-5 h-5 text-emerald-600/50" />
      </div>
      <div class="text-3xl font-bold text-foreground mb-2">$425.00</div>
      <div class="text-sm text-muted-foreground mb-4">
        8-hour shift • Jan 10, 2026
      </div>
      <div class="h-px bg-border mb-4" />
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="lucide:credit-card" class="w-4 h-4" />
        <span>Deposited to •••• 4829</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
