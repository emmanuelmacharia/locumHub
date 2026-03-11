<script setup lang="ts">
defineProps<{
  config: {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    variant: "default" | "minimal";
  };
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center"
    :class="config.variant === 'default' ? 'py-12 px-6' : 'py-8 px-4'"
  >
    <div class="relative mb-6">
      <div
        class="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-emerald-500/5 rounded-full blur-2xl scale-150"
      />
      <div
        class="relative flex items-center justify-center rounded-full bg-linear-to-br from-emerald-500/10 to-muted"
        :class="config.variant === 'default' ? 'w-20 h-20' : 'w-14 h-14'"
      >
        <Icon
          :name="config.icon"
          text-emerald-500
          :class="config.variant === 'default' ? 'w-10 h-10' : 'w-7 h-7'"
        />
      </div>
      <h3
        class="font-semibold text-foreground mb-2"
        :class="config.variant ? 'text-lg' : 'text-base'"
      >
        {{ config.title }}
      </h3>
      <p class="text-muted-foreground max-w-sm">
        {{ config.description }}
      </p>
      <UIButton
        v-if="config.actionLabel && config.onAction"
        :size="config.variant === 'default' ? 'default' : 'sm'"
        class="mt-6 bg-gradient-primary hover:opacity-90"
        @click="config.onAction"
        >{{ config.actionLabel }}</UIButton
      >
    </div>
  </div>
</template>

<style scoped></style>
