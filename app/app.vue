<template>
  <div class="min-h-screen bg-background text-foreground">
    <ClientOnly>
      <UIToaster position="top-center" rich-colors />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
