<script setup lang="ts">
definePageMeta({
  layout: "landing-page",
});

const selectedType = ref<string | null>(null);
const router = useRouter();

const handleSelect = (type: string) => {
  selectedType.value = type;
  router.push(`/register/${type}`);
};
</script>

<template>
  <ClientOnly>
    <div class="py-12">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8">
          <NuxtLink
            to="/"
            class="inline-flex items-center text-sm text-muted-foreground hover:text-primary no-underline"
          >
            <Icon name="lucide:arrow-left" class="h-4 w-4 mr-2" />
            Back to Home
          </NuxtLink>
        </div>

        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold text-foreground mb-3">
            Tell us a bit more about yourself
          </h1>
          <p class="text-muted-foreground text-lg">
            How would you like to access our platform?
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UICard
            :class="`cursor-pointer transition-all hover:border-accent-highlight/50 hover:shadow-lg ${selectedType === 'pharmacy' ? 'border-accent-highlight ring-2 ring-primary/20' : 'border-border/50'}`"
            role="button"
            tabindex="0"
            @click="handleSelect('pharmacy')"
            @keydown.enter="handleSelect('pharmacy')"
            @keydown.space.prevent="handleSelect('pharmacy')"
          >
            <UICardHeader class="text-center pb-4">
              <div
                class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary"
              >
                <Icon
                  name="lucide:building-2"
                  class="h-full w-full text-white"
                />
              </div>
              <UICardTitle class="text-xl">As a Pharmacy</UICardTitle>
              <UICardDescription class="py-3">
                Find qualified locum pharmacists to fill your temporary staffing
                needs quickly and efficiently.
              </UICardDescription>
            </UICardHeader>
            <UICardContent class="pt-0">
              <ul class="space-y-2 text-sm text-muted-foreground mb-6">
                <li class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Post job listings
                </li>
                <li class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Browse verified professionals
                </li>
                <li class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Manage staffing needs
                </li>
              </ul>
              <UIButton
                variant="default"
                class="w-full mt-4 bg-gradient-primary cursor-pointer"
                @click.stop="handleSelect('pharmacy')"
              >
                Continue as Pharmacy
                <Icon name="lucide:arrow-right" class="h-4 w-4 ml-2" />
              </UIButton>
            </UICardContent>
          </UICard>
          <UICard
            :class="`cursor-pointer transition-all hover:border-accent-highlight/50 hover:shadow-lg ${selectedType === 'staff' ? 'border-accent-highlight ring-2 ring-primary/20' : 'border-border/50'}`"
            role="button"
            tabindex="0"
            @click="handleSelect('staff')"
            @keydown.enter="handleSelect('staff')"
            @keydown.space.prevent="handleSelect('staff')"
          >
            <UICardHeader class="text-center pb-4">
              <div
                class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600"
              >
                <Icon
                  name="lucide:user-check"
                  class="text-white h-full w-full"
                />
              </div>
              <UICardTitle class="text-xl">As a Pharmacist</UICardTitle>
              <UICardDescription class="py-3">
                Find flexible locum work opportunities at pharmacies that match
                your skills.
              </UICardDescription>
            </UICardHeader>
            <UICardContent class="pt-0">
              <ul class="space-y-2 text-sm text-muted-foreground mb-6">
                <li class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Browse available positions
                </li>
                <li class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Set your own schedule
                </li>
                <li class="flex items-center gap-2">
                  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Build your professional profile
                </li>
              </ul>
              <UIButton
                variant="default"
                class="w-full mt-4 bg-linear-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white cursor-pointer"
                @click.stop="handleSelect('staff')"
              >
                Continue as Pharmacist
                <Icon name="lucide:arrow-right" class="h-4 w-4 ml-2" />
              </UIButton>
            </UICardContent>
          </UICard>
        </div>
        <p class="text-center text-muted-foreground text-sm mt-8">
          Already have an account?
          <NuxtLink to="/login" class="text-emerald-500 hover:underline"
            >Log in here.</NuxtLink
          >
        </p>
      </div>
    </div>
  </ClientOnly>
</template>
