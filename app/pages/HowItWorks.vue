<script setup lang="ts">
import FlexibleSchedulingIllustration from "~/components/flexible-scheduling-illustration.vue";
import InstantCommunicationIllustration from "~/components/instant-communication-illustration.vue";
import QualityAssuranceIllustration from "~/components/quality-assurance-illustration.vue";
// import SecurePaymentIllustration from "~/components/secure-payment-illustration.vue";
import SmartMatchingIllustration from "~/components/smart-matching-illustration.vue";
import VerifiedProfessionalsIllustration from "~/components/verified-professionals-illustration.vue";

definePageMeta({
  layout: "landing-page",
});

const features = [
  {
    id: "verified-professionals",
    number: "01",
    icon: "shield",
    title: "Verified Professionals",
    headline: "All credentials checked. All licenses verified.",
    description:
      "Every pharmacist on our platform is fully vetted. We handle the license verification and monitor compliance daily so you can hire with total confidence",
    bullets: [
      "Real-time license verification with regulatory bodies",
      "Automatic alerts when credentials need renewal",
    ],
    illustration: VerifiedProfessionalsIllustration,
  },
  {
    id: "smart-matching",
    number: "02",
    icon: "zap",
    title: "Smart matching",
    headline: "The right pharmacist. The right pharmacy. Every time.",
    description:
      "Our matching algorithm considers location, experience, specializations, and past booking history to surface the most relevant connections for both sides.",
    bullets: [
      "Experience and specialization alignment",
      "Learning system that improves with every booking",
    ],
    illustration: SmartMatchingIllustration,
  },
  {
    id: "flexible-scheduling",
    number: "03",
    icon: "calendar",
    title: "Flexible Scheduling",
    headline: "Fill a shift in minutes—not days.",
    description:
      "Real-time availability calendars, instant booking confirmations, and support for both urgent same-day requests and planned coverage weeks in advance.",
    bullets: [
      "Set availability once, get matched automatically",
      "Handle urgent and planned shifts equally well",
      "Multi-location scheduling from one dashboard",
    ],
    illustration: FlexibleSchedulingIllustration,
  },
  {
    id: "instant-communication",
    number: "04",
    icon: "message-circle",
    title: "Instant Communication",
    headline: "No middlemen. No delays. Just direct connection.",
    description:
      "Secure in-platform messaging, real-time push notifications, and automated booking confirmations keep everyone aligned and informed.",
    bullets: [
      "Direct messaging without sharing personal info",
      "Push notifications for new opportunities",
      "Automated reminders before every shift",
    ],
    illustration: InstantCommunicationIllustration,
  },
  // {
  //   id: "secure-payments",
  //   number: "05",
  //   icon: "credit-card",
  //   title: "Secure Payments",
  //   headline: "Automated invoicing. Timely payouts. Zero hassle.",
  //   description:
  //     "Bank-level security protects every transaction. Invoices generate automatically, payments process on schedule, and everyone has full visibility into their earnings and expenses.",
  //   bullets: [
  //     "Automatic invoice generation after each shift",
  //     "Secure, encrypted payment processing",
  //     "Clear payment history and reporting",
  //   ],
  //   illustration: SecurePaymentIllustration,
  // },
  {
    id: "quality-assurance",
    number: "05",
    icon: "star",
    title: "Quality Assurance",
    headline: "Built on trust. Maintained through accountability.",
    description:
      "Two-way ratings after every shift ensure that both pharmacies and staff are accountable. Great performance leads to better opportunities.",
    bullets: [
      "Mutual ratings build transparent reputations",
      "High performers unlock priority matching",
      "Dedicated support for issue resolution",
    ],
    illustration: QualityAssuranceIllustration,
  },
];

const activeLink = ref("verified-professionals");

onMounted(() => {
  const sections = features.map((f) => document.getElementById(f.id));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeLink.value = entry.target.id;
        }
      });
    },
    {
      rootMargin: "-10% 0px -50% 0px",
      threshold: 0.5,
    }
  );

  sections.forEach((section) => {
    if (section) observer.observe(section);
  });

  onUnmounted(() => {
    observer.disconnect();
  });
});

const scrollToSection = (id: string) => {
  activeLink.value = id;
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-background via-background to-muted/30"
  >
    <main>
      <section class="border-b">
        <div class="py-20 lg:py-28">
          <div class="max-w-3xl mx-auto text-center">
            <h1
              class="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              How LocumHub works
            </h1>
            <p class="text-xl text-muted-foreground mb-10 leading-relaxed">
              Connecting pharmacies with verified locum professionals. Simple,
              secure, and built for the way you actually work.
            </p>
            <NuxtLink to="">
              <UIButton
                size="lg"
                class="bg-gradient-primary hover:opacity-90 gap-2"
              >
                Get started
                <Icon name="lucide:arrow-right" />
              </UIButton>
            </NuxtLink>
          </div>
        </div>
      </section>
      <div class="container mx-auto px-4">
        <div class="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside class="hidden lg:block">
            <nav class="sticky top-24 py-12">
              <ul class="space-y-1">
                <li v-for="feature in features" :key="feature.id">
                  <a
                    :href="`#${feature.id}`"
                    :class="`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all hover:cursor-pointer ${activeLink === feature.id ? 'bg-emerald-600/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`"
                    @click.prevent="scrollToSection(feature.id)"
                  >
                    <span class="text-xs font-mono opacity-60">{{
                      feature.number
                    }}</span>
                    {{ feature.title }}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <div class="py-12 lg:py-1">
            <section
              v-for="(feature, index) in features"
              :id="feature.id"
              :key="feature.id"
              :class="[
                'py-16 lg:py-24 scroll-mt-24',
                index !== features.length - 1
                  ? 'border-b border-border/50'
                  : '',
              ]"
            >
              <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <!-- Text Content -->
                <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
                  <div class="flex items-center gap-3 mb-6">
                    <span class="text-sm font-mono text-primary">{{
                      feature.number
                    }}</span>
                    <div class="h-px flex-1 bg-border max-w-12" />
                    <Icon
                      :name="`lucide:${feature.icon}`"
                      class="w-5 h-5 text-primary"
                    />
                  </div>

                  <h2
                    class="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight"
                  >
                    {{ feature.headline }}
                  </h2>

                  <p class="text-muted-foreground mb-8 leading-relaxed">
                    {{ feature.description }}
                  </p>

                  <ul class="space-y-3">
                    <li
                      v-for="(bullet, idx) in feature.bullets"
                      :key="idx"
                      class="flex items-start gap-3"
                    >
                      <Icon
                        name="lucide:check-circle"
                        class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"
                      />
                      <span class="text-foreground">{{ bullet }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Illustration -->
                <div
                  :class="`${index % 2 === 1 ? 'lg:order-1' : ''} sm:mx-auto`"
                >
                  <component :is="feature.illustration" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <section class="border-t bg-muted/30">
        <div class="py-20">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p class="text-muted-foreground mb-8">
              Join pharmacies and professionals who trust PharmLocum for
              reliable, compliant temporary staffing.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/register">
                <UIButton
                  size="lg"
                  class="bg-gradient-primary hover:opacity-90 gap-2"
                >
                  Create Account
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </UIButton>
              </NuxtLink>
              <NuxtLink to="/pricing">
                <UIButton size="lg" variant="outline"> View Pricing </UIButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
