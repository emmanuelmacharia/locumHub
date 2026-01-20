<script setup lang="ts">
definePageMeta({
  layout: "landing-page",
});
const pharmacyPlans = [
  {
    name: "Basic",
    description: "Perfect for small pharmacies getting started",
    monthlyPrice: 299,
    annualPrice: 2390,
    features: [
      { text: "Up to 5 staff searches per month", icon: "search" },
      { text: "Basic profile listing", icon: "building-2" },
      { text: "Email notifications", icon: "message-circle" },
      { text: "Basic analytics", icon: "bar-chart-3" },
      { text: "Standard support", icon: "headphones" },
      { text: "Mobile app access", icon: "zap" },
    ],
    popular: false,
    cta: "Start Basic Plan",
  },
  {
    name: "Premium",
    description: "Most popular for growing pharmacy chains",
    monthlyPrice: 599,
    annualPrice: 4792,
    features: [
      { text: "Unlimited staff searches", icon: "search" },
      { text: "Priority profile listing", icon: "building-2" },
      { text: "SMS + Email notifications", icon: "message-circle" },
      { text: "Advanced analytics & reporting", icon: "bar-chart-3" },
      { text: "24/7 Premium support", icon: "headphones" },
      { text: "Featured job postings", icon: "trending-up" },
      { text: "Bulk messaging", icon: "zap" },
      { text: "Performance insights", icon: "clock" },
    ],
    popular: true,
    cta: "Start Premium Plan",
  },
  {
    name: "Enterprise",
    description: "For large chains and hospital groups",
    monthlyPrice: 1299,
    annualPrice: 10392,
    features: [
      { text: "Everything in Premium", icon: "check-circle" },
      { text: "Dedicated account manager", icon: "headphones" },
      { text: "Custom integrations", icon: "zap" },
      { text: "White-label options", icon: "building-2" },
      { text: "Advanced API access", icon: "bar-chart-3" },
      { text: "Multi-location management", icon: "search" },
      { text: "Custom onboarding", icon: "trending-up" },
      { text: "SLA guarantees", icon: "shield-check" },
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const staffBenefits = [
  {
    icon: "search",
    title: "Browse All Opportunities",
    description:
      "Access every available shift and position across our network of verified pharmacies.",
  },
  {
    icon: "calendar",
    title: "Flexible Scheduling",
    description:
      "Choose when and where you work. Set your own availability and accept shifts that fit your life.",
  },
  {
    icon: "credit-card",
    title: "Secure Payments",
    description:
      "Get paid on time, every time. Our platform ensures secure transactions with full payment protection.",
  },
  {
    icon: "message-circle",
    title: "Direct Communication",
    description:
      "Chat directly with pharmacy managers. No middlemen, no delays.",
  },
  {
    icon: "trending-up",
    title: "Build Your Reputation",
    description:
      "Earn reviews and ratings that help you stand out and command higher rates.",
  },
  {
    icon: "shield-check",
    title: "Verified Workplaces",
    description:
      "Every pharmacy on our platform is verified, so you always know you're in good hands.",
  },
];

const faqs = [
  {
    question: "How do payments work?",
    answer:
      "Pharmacies pay monthly/annual subscription fees. Locum staff are paid directly by pharmacies, with our platform facilitating secure transactions and providing payment protection.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle, and we'll prorate any differences.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fees for Basic and Premium plans. Enterprise customers may have custom setup requirements that will be discussed during the sales process.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for new customers. If you're not satisfied, contact our support team for a full refund.",
  },
];

const activeTab = ref("pharmacy");
const isAnnualBilling = ref(false);

const handleSetActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const { handleSignUp } = useCtaSignupAndRouting();
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-background via-background to-muted/30"
  >
    <main>
      <section class="container py-16 lg:py-24 mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h1 class="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p class="text-xl text-muted-foreground">
            Choose your path. Pharmacies subscribe to find qualified staff.
            Pharmacists join for free and find flexible opportunities
          </p>
        </div>
        <div class="flex justify-center mb-12">
          <div class="inline-flex p-2 bg-muted rounded-full">
            <UIButton
              size="lg"
              :class="[
                'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer hover:bg-white',
                activeTab === 'pharmacy'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground bg-transparent',
              ]"
              @click="handleSetActiveTab('pharmacy')"
            >
              <Icon name="lucide:building-2" class="w-4 h-4" />
              I'm a pharmacy</UIButton
            >
            <UIButton
              size="lg"
              :class="[
                'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:bg-white hover:cursor-pointer  border-none',
                activeTab === 'staff'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground bg-transparent',
              ]"
              @click="handleSetActiveTab('staff')"
            >
              <Icon name="lucide:user" class="w-4 h-4" />
              I'm a staff member</UIButton
            >
          </div>
        </div>
      </section>
      <section
        v-if="activeTab === 'pharmacy'"
        class="bg-muted/30 py-16 lg:py-24"
      >
        <div class="container mx-auto">
          <div class="flex items-center justify-center gap-4 mb-12">
            <span
              :class="`text-sm ${!isAnnualBilling ? 'text-foreground font-medium' : 'text-muted-foreground'}`"
            >
              Monthly
            </span>
            <UISwitch v-model="isAnnualBilling" />
            <span
              :class="`text-sm ${isAnnualBilling ? 'text-foreground font-medium' : 'text-muted-foreground'}`"
            >
              Annual
            </span>
            <UIBadge
              class="ml-2 px-2 py-1 text-xs font-medium bg-gradient-primary/10 text-emerald-500 border-emerald-500/20"
            >
              Save 20%
            </UIBadge>
          </div>
          <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(plan, index) in pharmacyPlans"
              :key="index"
              :class="`relative bg-background rounded-2xl p-8 ${plan.popular ? 'ring-2 ring-emerald-600 shadow-xl lg:mt-4 lg:mb-4' : 'border border-border/50'}`"
            >
              <div
                v-if="plan.popular"
                class="absolute -top-4 left-1/2 -translate-x-1/2"
              >
                <UIBadge
                  class="px-3 py-1 text-sm font-medium bg-emerald-600 border-foreground/20"
                >
                  Most Popular
                </UIBadge>
              </div>
              <div class="mb-6">
                <h3 class="text-2xl font-bold text-foreground mb-2">
                  {{ plan.name }}
                </h3>
                <p class="text-muted-foreground text-sm">
                  {{ plan.description }}
                </p>
              </div>
              <div class="mb-8">
                <div class="flex items-baseline gap-1">
                  <span class="text-4xl font-bold text-foreground">
                    {{
                      isAnnualBilling
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KES",
                          }).format(Math.round(plan.annualPrice / 12))
                        : new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "KES",
                          }).format(plan.monthlyPrice)
                    }}</span
                  >
                  <span class="text-muted-foreground">/month</span>
                </div>
                <p
                  v-if="isAnnualBilling"
                  class="text-sm text-emerald-600/50 mt-1"
                >
                  Save
                  {{
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "KES",
                    }).format(
                      Math.round(plan.monthlyPrice * 12 - plan.annualPrice),
                    )
                  }}
                  with annual billing
                </p>
                <ul class="space-y-4 mb-8 mt-6">
                  <li
                    v-for="(feature, featureIndex) in plan.features"
                    :key="featureIndex"
                    class="flex items-start gap-3"
                  >
                    <Icon
                      :name="`lucide:${feature.icon}`"
                      class="w-5 h-5 text-emerald-600 mt-1 shrink-0"
                    />
                    <p class="text-sm text-muted-foreground">
                      {{ feature.text }}
                    </p>
                  </li>
                </ul>
                <div>
                  <UIButton
                    v-if="plan.name === 'Enterprise'"
                    variant="outline"
                    :class="`w-full py-3 text-sm font-medium rounded-lg ${
                      plan.popular
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                    }`"
                  >
                    {{ plan.cta }}
                  </UIButton>
                  <UIButton
                    v-else
                    :class="`w-full py-3 text-sm font-medium rounded-lg ${
                      plan.popular
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                    }`"
                    @click="handleSignUp()"
                  >
                    {{ plan.cta }}
                  </UIButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-else class="bg-muted/30 py-16 lg:py-24">
        <div class="container mx-auto">
          <div class="max-w-3xl mx-auto text-center mb-16">
            <div
              class="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-600 rounded-full px-4 py-2 text-sm font-medium mb-6"
            >
              <Icon name="lucide:zap" class="w-4 h-4" />
              Free for locum staff
            </div>
            <h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Complete access. Zero cost.
            </h2>
            <p class="text-xl text-muted-foreground mb-8">
              We believe talented professionals should have free access to
              career opportunities. Join our platform and start finding flexible
              work today.
            </p>
            <UIButton
              size="lg"
              class="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 rounded-lg text-lg font-medium"
              @click="handleSignUp()"
            >
              Join as Locum Staff
            </UIButton>
          </div>
          <div class="max-w-4xl mx-auto">
            <h3 class="text-2xl font-bold text-foreground text-center mb-10">
              What you get
            </h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="(benefit, index) in staffBenefits"
                :key="index"
                class="flex gap-4 bg-gradient-primary rounded-xl p-4 border border-border/50"
              >
                <div
                  class="w-12 h-12 bg-emerald-600/10 rounded-xl flex items-center justify-center shrink-0"
                >
                  <Icon
                    :name="`lucide:${benefit.icon}`"
                    class="w-6 h-6 text-emerald-600"
                  />
                </div>
                <div>
                  <h4 class="font-semibold text-foreground mb-1">
                    {{ benefit.title }}
                  </h4>
                  <p class="text-sm text-muted-foreground">
                    {{ benefit.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="container mx-auto py-16 lg:py-24">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div class="space-y-6">
            <div
              v-for="faq in faqs"
              :key="faq.question"
              class="border-b border-border pb-6"
            >
              <h3 class="text-lg font-semibold text-foreground mb-2">
                {{ faq.question }}
              </h3>
              <p class="text-muted-foreground">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div class="bg-muted/30 py-16 lg:py-24">
        <div class="container mx-auto">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {{
                activeTab === "pharmacy"
                  ? "Ready to find qualified staff?"
                  : "Ready to find flexible work?"
              }}
            </h2>
            <p class="text-xl text-muted-foreground mb-8">
              {{
                activeTab === "pharmacy"
                  ? "Join our platform today and start connecting with top locum professionals."
                  : "Join our community of locum staff and start finding flexible opportunities today."
              }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <UIButton
                size="lg"
                class="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 rounded-lg text-lg font-medium"
                @click="handleSignUp()"
              >
                {{
                  activeTab === "pharmacy"
                    ? "Get Started as a Pharmacy"
                    : "Join as Locum Staff"
                }}
              </UIButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
