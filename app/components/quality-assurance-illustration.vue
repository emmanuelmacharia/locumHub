<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-80 flex items-center justify-center">
    <div class="absolute w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl" />
    <div class="relative bg-card border rounded-2xl p-6 shadow-lg">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-12 h-12 bg-muted rounded-full" />
        <div>
          <div class="h-3 w-24 bg-muted rounded mb-2" />
          <div class="flex gap-1">
            <Icon
              v-for="(i, index) in [...Array(5)]"
              :key="index"
              name="lucide:star"
              class="w-4 h-4 text-yellow-500 fill-yellow-500!"
            />
          </div>
        </div>
      </div>
      <p class="text-sm text-muted-foreground italic">
        "Professional, punctual, and excellent patient care. Would definitely
        book again!"
      </p>
    </div>
  </div>
</template>

<style scoped></style>
