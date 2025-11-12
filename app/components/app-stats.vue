<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        required: false,
        default: 'Users'
    },
    header: {
        type: String,
        required: true,
    },
    subHeader: {
        type: String,
        required: true,
    },

})
</script>

<template>
    <UICard class="p-6 text-center border-primary/10 bg-linear-to-br from-background to-primary/5">
        <Icon v-if='icon' :name="icon" class="h-10! w-10! accent-highlight  mx-auto mb-4" />
        <div class="text-2xl font-bold text-foreground mx-auto">{{ header }}</div>
        <div class="text-sm text-muted-foreground  mx-auto">{{ subHeader }}</div>
    </UICard>
</template>