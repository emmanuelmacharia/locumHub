<script setup lang="ts">
definePageMeta({
    layout: "landing-page",
})
</script>
<template>
    <main>
        <section class="relative overflow-hidden">
            <!-- decorative background -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute inset-0 bg-gradient-hero opacity-5" />
            </div>

            <div class="relative py-20 lg:py-32">
                <div class="container mx-auto">
                    <div class="mx-auto max-w-4xl text-center">
                        <h1
                            class="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-tight">
                            Connect
                            <span class="mx-2 inline-block bg-gradient-primary bg-clip-text text-transparent">
                                Qualified </span>
                            Locum Staff with Pharmacies
                        </h1>

                        <p class="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                            The leading platform for matching licensed pharmacists with pharmacies that need
                            temporary staffing
                            solutions. Streamlined, secure and compliant with regulatory requirements.
                        </p>

                        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <NuxtLink to="/for-pharmacies" class="w-full sm:w-auto">
                                <UIButton variant="default"
                                    class="rounded-md bg-gradient-primary w-full sm:w-auto px-6 py-3  text-white shadow-glow hover:shadow-glow/80 hover:opacity-90 transition-opacity">
                                    I'm a Pharmacy
                                </UIButton>
                            </NuxtLink>

                            <!-- <NuxtLink to="/for-pharmacies" class="w-full sm:w-auto">
                  <UIButton variant="default" class="w-full sm:w-auto">
                    I'm a Pharmacy
                  </UIButton>
                </NuxtLink> -->

                            <NuxtLink to="/for-pharmacists" class="w-full sm:w-auto">
                                <UIButton variant="outlinedGhost"
                                    class="w-full sm:w-auto px-6 py-3 rounded-md bg-white/90 border border-primary/20">
                                    I'm a Pharmacist
                                </UIButton>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 my-5 mx-auto max-w-6xl px-6">
                <AppStats header="2,500+" sub-header="Verified Pharmacists" icon="lucide:users" />
                <AppStats header="1,200+" sub-header="Pharmacies" icon="lucide:shield-check" />
                <AppStats header="24/7" sub-header="Shifts Filled" icon="lucide:clock" />
                <AppStats header="4.2" sub-header="Compliance Rate" icon="lucide:star" />
            </div>
        </section>
        <!-- Featured sections -->
        <section class="py-20 bg-muted/30">
            <div class="container flex mx-auto flex-col">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold sm:text-4xl mb-4">
                        Why choose Pharmify?
                    </h2>
                    <p class="text-xl text-muted-forground max-w-2xl mx-auto">
                        Built specifically for the pharmaceutical industry with compliance and quality at the forefront.
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <UICard class="p-8 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <Icon name="lucide:shield-check" class="h-10! w-10! accent-highlight mb-2" />
                            <h3 class="text-xl font-semibold mb-3">Regulatory Compliance</h3>
                            <div class="text-muted-foreground">
                                All pharmacists are verified with proper licensing and certifications. Pharmacies are
                                validated for regulatory compliance.
                            </div>
                        </div>
                    </UICard>
                    <UICard class="p-8 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <Icon name="lucide:map-pin" class="h-10! w-10! accent-highlight mb-2" />
                            <h3 class="text-xl font-semibold mb-3">Smart Location Based Matching</h3>
                            <div class="text-muted-foreground">
                                Advanced algorithms match pharmacists to shifts based on skills, location, and
                                availability, ensuring the right fit every time.
                            </div>
                        </div>
                    </UICard>
                    <UICard class="p-8 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <Icon name="lucide:star" class="h-10! w-10! accent-highlight mb-2" />
                            <h3 class="text-xl font-semibold mb-3">Mutual Rating System</h3>
                            <div class="text-muted-foreground">
                                Build trust through our comprehensive two-way rating system.
                                Both pharmacies and staff can rate their experiences.
                            </div>
                        </div>
                    </UICard>
                    <UICard class="p-8 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <Icon name="lucide:zap" class="h-10! w-10! accent-highlight mb-2" />
                            <h3 class="text-xl font-semibold mb-3">Instant Booking</h3>
                            <div class="text-muted-foreground">
                                Real-time availability and instant booking system.
                                Fill urgent staffing needs within hours, not days.
                            </div>
                        </div>
                    </UICard>
                    <UICard class="p-8 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <Icon name="lucide:users" class="h-10! w-10! accent-highlight mb-2" />
                            <h3 class="text-xl font-semibold mb-3">Quality Professionals</h3>
                            <div class="text-muted-foreground">
                                Access to a curated network of experienced, qualified pharmacists
                                with specialized skills and certifications.
                            </div>
                        </div>
                    </UICard>
                    <UICard class="p-8 hover:shadow-lg transition-shadow">
                        <div class="mb-4">
                            <Icon name="lucide:clock" class="h-10! w-10! accent-highlight mb-2" />
                            <h3 class="text-xl font-semibold mb-3">Flexible Scheduling</h3>
                            <div class="text-muted-foreground">
                                From single-day coverage to long-term assignments.
                                Flexible scheduling that works for everyone.
                            </div>
                        </div>
                    </UICard>
                </div>
            </div>

        </section>
    </main>
</template>