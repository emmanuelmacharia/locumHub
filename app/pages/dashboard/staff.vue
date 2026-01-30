<script setup lang="ts">
definePageMeta({
  layout: "logged-in",
  middleware: ["01-user-type"],
});
</script>

<template>
  <div>Page: dashboard/staff</div>
</template>

<style scoped></style>
