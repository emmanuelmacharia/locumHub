<script setup lang="ts">
const props = defineProps<{
  header: string;
  subtitle: string;
  icon: string;
  id: string;
}>();

const emit = defineEmits<{ (e: "entrypointClick"): void }>();
</script>

<template>
  <button
    class="w-full flex items-center gap-4 p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-left group cursor-pointer"
  >
    <div class="p-2 5 rounded-xl bg-emerald-500/10">
      <Icon :name="props.icon" class="h-5 w-5 text-emerald-500" />
    </div>
    <div class="flex-1">
      <p
        class="font-semibold text-foreground group-hover:text-emerald-500 transition-colors"
      >
        {{ props.header }}
      </p>
      <p class="text-sm text-muted-foreground">
        {{ props.subtitle }}
      </p>
    </div>
    <Icon
      name="lucide:chevron-right"
      class="h-5 w-5 text-muted-foreground group-hover:text-emerald-500 transition-colors"
    />
  </button>
</template>

<style scoped></style>
