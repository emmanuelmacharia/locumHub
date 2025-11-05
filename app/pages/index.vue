<script setup lang="ts">
definePageMeta({
    layout: "landing-page",
})
</script>
<template>
    <div class="flex flex-col items-center justify-center min-h-screen py-2">
        <p class="font-bold text-green-600 text-3xl"> Hello Vue
        </p>
        <div>
            <UiButton variant="default">Click me</UiButton>
        </div>
    </div>
</template>