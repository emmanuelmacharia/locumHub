<script setup lang="ts">
definePageMeta({
  layout: "landing-page",
});
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-background via-background to-muted/30"
  >
    <main>
      <section class="container py-12 mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <UIBadge
            class="mb-4 py-1 bg-gradient-primary/10 text-emerald-500 border-emerald-500/20"
          >
            For pharmacy owners
          </UIBadge>
          <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Staff your pharmacies
            <span class="bg-gradient-primary bg-clip-text text-transparent"
              >with confidence</span
            >
          </h1>
          <p class="text-lg text-muted-foreground mb-8">
            Access to a curated network of verified locum pharmacists, techs and
            assistants. Fill shifts in hours, not days - with professionals you
            can trust
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UIButton
              class="bg-gradient-primary hover:opacity-90"
              size="lg"
              as-child
            >
              <NuxtLink to="/register">
                Start finding staff
                <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
              </NuxtLink>
            </UIButton>
            <UIButton size="lg" variant="outline" as-child>
              <NuxtLink to="/how-it-works"> Learn how it works </NuxtLink>
            </UIButton>
          </div>
        </div>
      </section>
      <section class="py-20 md:py-28 bg-muted/30">
        <div class="container max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div class="order-2 lg:order-1">
              <NetworkIllustration />
            </div>
            <div class="order-1 lg:order-2">
              <div class="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A network of verified professionals
              </div>
              <div class="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every locum on our platform undergoes rigorous vetting. Their
                credentials are verified, competencies are checked, and
                performance is continuously monitored through real pharmacy
                reviews.
              </div>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div
                    class="w-6 rounded-full bg-green-600/20 flex items-center justify-center p-1"
                  >
                    <Icon
                      name="lucide:check-circle"
                      class="w-4 h-4 text-green-600"
                    />
                  </div>
                  <span class="text-foreground">PBK registration verified</span>
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="w-6 rounded-full bg-green-600/20 flex items-center justify-center p-1"
                  >
                    <Icon
                      name="lucide:check-circle"
                      class="w-4 h-4 text-green-600"
                    />
                  </div>
                  <span class="text-foreground"
                    >Real reviews from real pharmacies</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="w-6 rounded-full bg-green-600/20 flex items-center justify-center p-1"
                  >
                    <Icon
                      name="lucide:check-circle"
                      class="w-4 h-4 text-green-600"
                    />
                  </div>
                  <span class="text-foreground"
                    >Timesheet requests and approvals for work done</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
