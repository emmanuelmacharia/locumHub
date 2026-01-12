<template>
  <div class="relative w-full max-w-md mx-auto">
    <div
      class="absolute inset-0 bg-linear-to-br from-gradient-primary/20 to-accent/20 rounded-3xl blur-3xl"
    />
    <div
      class="relative bg-card/80 backdrop-blur border border-emerald-500/50 rounded-2xl p-8"
    >
      <div class="flex items-center justify-center gap-4 mb-6">
        <div v-for="i in 3" :key="i" class="relative">
          <div
            :class="[
              'w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center',
              i === 2
                ? 'from-emerald-500 to-emerald-500/60 scale-110 text-muted-foreground'
                : 'from-muted to-muted/70',
            ]"
          >
            <span class="text-xl font-bold text-primary-foreground">
              {{ ["JM", "SK", "AN"][i - 1] }}
            </span>
          </div>
          <div
            v-if="i === 2"
            class="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center"
          >
            <Icon
              name="lucide:check-circle-2"
              class="w-3 h-3 text-emerald-500 bg-green-700"
            />
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <div
          class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-primary/20" />
            <div>
              <div class="h-3 w-24 bg-foreground/20 rounded" />
              <div class="h-2 w-16 bg-muted-foreground/30 rounded mt-1" />
            </div>
          </div>
          <div class="flex items-center gap-1">
            <Icon
              name="lucide:star"
              class="w-3 h-3 fill-yellow-500 text-yellow-500"
            />
            <span class="text-sm font-medium">4.9</span>
          </div>
        </div>
        <div
          class="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-emerald-500/20"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-500/30" />
            <div>
              <div class="h-3 w-28 bg-emerald-500/30 rounded" />
              <div class="h-2 w-20 bg-emerald-500/30 rounded mt-1" />
            </div>
          </div>
          <span
            class="px-2 py-1 rounded-full font-medium bg-green-500/20 text-emerald-500 text-xs"
          >
            Available
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or state needed for this component
</script>

<style scoped></style>
