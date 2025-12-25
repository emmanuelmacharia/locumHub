<script setup lang="ts">


definePageMeta({
    layout: "landing-page",
})


</script>

<template>
    <ClientOnly>
        <div class="py-12">
            <div class="max-w-3xl mx-auto">
                <div class="mb-8">
                    <NuxtLink to="/register"
                        class="inline-flex items-center text-sm text-muted-foreground hover:text-primary text-decoration-none">
                        <Icon name="lucide:arrow-left" class="h-4 w-4 mr-2" />
                        Back to user selection
                    </NuxtLink>
                </div>
                <UICard>
                    <UICardHeader class="text-center">
                        <div
                            class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                            <Icon name="lucide:user-check" class="text-white" />
                        </div>
                        <UICardTitle class="text-2xl">
                            Register as a Pharmacist
                        </UICardTitle>
                        <p class="text-muted-foreground">
                            Join thousands of professionals already on our platform
                        </p>
                    </UICardHeader>

                    <UICardContent>
                        <form>
                            <!-- Form fields will be added here -->
                        </form>
                    </UICardContent>
                </UICard>
            </div>
        </div>
    </ClientOnly>
</template>