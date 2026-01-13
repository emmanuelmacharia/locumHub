<script setup lang="ts">
import { p } from "vue-router/dist/router-CWoNjPRp.mjs";

definePageMeta({
  layout: "landing-page",
});

const nums = [1, 2, 3, 4];
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
        <div class="container max-w-6xl mx-auto px-5">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div class="order-2 lg:order-1 sm:mx-auto">
              <img
                src="~/assets/images/networkIllustration.svg"
                alt="Illustration of the network of talent locumhub has access to"
              />
            </div>
            <div class="order-1 lg:order-2 sm:max-w-4xl md:max-w-full mx-auto">
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

      <section class="py-20 md:py-28">
        <div class="container max-w-6xl mx-auto px-5">
          <div
            class="grid lg:grid-cols-2 sm:grid-rows-2 gap-12 lg:gap-20 items-center"
          >
            <div class="">
              <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Smart matching for your needs
              </h2>
              <p class="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform understands your requirements. Filter by skills,
                competencies, availability and past performance to find the
                perfect match for every shift.
              </p>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div
                    class="w-6 rounded-full bg-green-600/20 flex items-center justify-center p-1"
                  >
                    <Icon
                      name="lucide:file-spreadsheet"
                      class="w-4 h-4 text-green-600"
                    />
                  </div>
                  <span class="text-foreground">Shift activity logging</span>
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="w-6 rounded-full bg-green-600/20 flex items-center justify-center p-1"
                  >
                    <Icon name="lucide:star" class="w-4 h-4 text-green-600" />
                  </div>
                  <span class="text-foreground"
                    >Skill based filtering for specialized needs</span
                  >
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="w-6 rounded-full bg-green-600/20 flex items-center justify-center p-1"
                  >
                    <Icon name="lucide:award" class="w-4 h-4 text-green-600" />
                  </div>
                  <span class="text-foreground"
                    >Favourite list for reliable repeat bookings</span
                  >
                </li>
              </ul>
            </div>
            <div class="sm:mx-auto sm:py-12">
              <img
                src="~assets/images/matchingIllustration.svg"
                alt="Illustration of the criteria for matching owners to locums"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 md:py-16 bg-muted/25">
        <div class="container max-w-6xl mx-auto px-5">
          <div class="grid grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <img
                src="~assets/images/speedIllustration.svg"
                alt="An illustration on the simple process locumhub provides to find good talent"
              />
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Fill shifts in hours, not days
              </h2>
              <p class="text-lg text-muted-foreground mb-8 leading-relaxed">
                Post a shift and start receiving qualified responses within
                minutes. Most positions are confirmed within 2 hours, so you
                never have to worry about coverage gaps.
              </p>
              <div class="grid grid-cols-3 gap-6">
                <div class="text-center">
                  <p class="text-3xl font-bold text-primary">2 hours</p>
                  <p class="text-sm text-muted-foreground">Avg. fill time</p>
                </div>
                <div class="text-center">
                  <p class="p text-3xl font-bold text-primary">500+</p>
                  <p class="text-sm text-muted-foreground">Active locums</p>
                </div>
                <div class="text-center">
                  <p class="text-3xl font-bold text-primary">98%</p>
                  <p class="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-20 md:py-28">
        <div class="container">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Preview our network
            </h2>
            <p class="text-lg text-muted-foreground">
              Sign up to access full profiles, contact information, and direct
              booking.
            </p>
          </div>
          <div class="relative max-w-4xl mx-auto">
            <div
              class="absolute inset-0 bg-linear to-t from-gradient-background via-emerald/50 to-transparent z-10 rounded-2xl"
            >
              <div class="grid md:grid-cols-2 gap-4 blur-[3px]">
                <div
                  v-for="i in nums"
                  :key="i"
                  class="p-5 bg-card border border-border rounded-xl"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center"
                    >
                      <span
                        class="text-lg font-semibold text-primary-foreground"
                      >
                        Here is a name
                      </span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-foreground">Their name</h3>
                      <p class="text-sm text-muted-foreground">Pharma D</p>
                      <div class="flex items-center gap-1 mt-1">
                        <Icon
                          name="star"
                          class="w-3 h-3 fill-yellow text-yellow"
                        />
                        <span class="text-sm">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-0 flex items-center justify-center z-20"
              >
                <UIButton
                  size="lg"
                  class="bg-gradient-primary hover:opacity-90"
                  as-child
                >
                  <NuxtLink to="/register">
                    Sign up to view profile
                    <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
                  </NuxtLink>
                </UIButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-20 md:py-28 bg-emerald-600/15">
        <div class="container">
          <div class="max-w-3xl mx-auto text-center">
            <h3 class="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to fill your next shift?
            </h3>
            <p class="text-lg text-muted-foreground mb-10">
              Join 150+ pharmacies already using PharmLocum to fill shifts
              faster and build reliable teams.
            </p>
            <UIButton
              size="lg"
              class="bg-gradient-primary hover:opacity-90 h-12 px-8 text-base"
              as-child
            >
              <NuxtLink to="/register">
                Create Free Account
                <ArrowRight class="ml-2 h-4 w-4" />
              </NuxtLink>
            </UIButton>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
