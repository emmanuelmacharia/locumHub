<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-80 flex items-center justify-center">
    <div class="absolute w-64 h-64 bg-emerald-600/5 rounded-full" />
    <div class="absolute w-48 h-48 bg-emerald-600/10 rounded-full" />
    <div class="relative flex items-center gap-6">
      <div class="bg-card border rounded-xl p-4 shadow-md">
        <Icon
          name="lucide:building-2"
          class="w-8! h-8! text-emerald-600 mb-2"
        />
        <div class="h-3 w-20 bg-muted rounded" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="w-12 h-0.5 bg-emerald-600" />
        <Icon name="lucide:zap" class="w-6 h-6 text-emerald-600" />
        <div class="w-12 h-0.5 bg-emerald-600" />
      </div>
      <div class="bg-card border rounded-xl p-4 shadow-md">
        <Icon name="lucide:user" class="w-8! h-8! text-emerald-600 mb-2" />
        <div class="h-3 w-20 bg-muted rounded" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
