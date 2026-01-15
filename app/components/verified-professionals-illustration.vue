<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-80 flex items-center justify-center">
    <div class="absolute w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
    <div class="relative bg-card border rounded-2xl p-8 shadow-lg">
      <div class="flex items-center gap-4 mb-4">
        <div
          class="w-16 h-16 bg-linear-to-br from-emerald-600 to-emerald-600/70 rounded-full flex items-center justify-center"
        >
          <Icon name="lucide:shield" class="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <div class="h-4 w-32 bg-muted rounded mb-2" />
          <div class="h-3 w-24 bg-muted/60 rounded" />
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <Icon
            name="lucide:check-circle"
            class="w-5 h-5 text-emerald-600/50"
          />
          <span class="text-sm text-foreground">License Verified</span>
        </div>
        <div class="flex items-center gap-3">
          <Icon
            name="lucide:check-circle"
            class="w-5 h-5 text-emerald-600/50"
          />
          <span class="text-sm text-foreground">Mutual Reviews</span>
        </div>
        <div class="flex items-center gap-3">
          <Icon
            name="lucide:check-circle"
            class="w-5 h-5 text-emerald-600/50"
          />
          <span class="text-sm text-foreground">References Checked</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
