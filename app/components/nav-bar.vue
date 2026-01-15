<script setup lang="ts">
import { ref } from "vue";

// Alias shadcn components to the UI* names you want to use in the template.
import {
  NavigationMenu as UINavigationMenu,
  NavigationMenuContent as UINavigationMenuContent,
  NavigationMenuItem as UINavigationMenuItem,
  NavigationMenuLink as UINavigationMenuLink,
  NavigationMenuList as UINavigationMenuList,
  NavigationMenuTrigger as UINavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Button as UIButton } from "@/components/ui/button";

import {
  Sheet as UISheet,
  SheetContent as UISheetContent,
  SheetHeader as UISheetHeader,
  SheetTitle as UISheetTitle,
  SheetTrigger as UISheetTrigger,
  SheetOverlay as UISheetOverlay,
} from "@/components/ui/sheet";

import {
  Accordion as UIAccordion,
  AccordionContent as UIAccordionContent,
  AccordionItem as UIAccordionItem,
  AccordionTrigger as UIAccordionTrigger,
} from "@/components/ui/accordion";

import { Separator as UISeparator } from "@/components/ui/separator";

const mobileOpen = ref(false);

const features: { title: string; href: string; description: string }[] = [
  {
    title: "Verified Professionals",
    href: "/howitworks#verified-professionals",
    description:
      "All locum pharmacists are thoroughly vetted with verified credentials and licenses to ensure quality service.",
  },
  {
    title: "Smart Matching",
    href: "/howitworks#smart-matching",
    description:
      "Our intelligent matching system pairs pharmacies with the most suitable locum professionals based on experience, location, and availability.",
  },
  {
    title: "Flexible Scheduling",
    href: "/howitworks#flexible-scheduling",
    description:
      "Easy-to-use calendar system for managing shifts, availability, and booking confirmations in real-time.",
  },
  {
    title: "Instant Communication",
    href: "/howitworks#instant-communication",
    description:
      "Direct messaging and notification system to facilitate quick and efficient communication between pharmacies and locums.",
  },
  // { ---- I dont think we want to lay the infra for this one; at least until we have users -----
  //   title: "Secure Payments",
  //   href: "/howitworks#secure-payments",
  //   description:
  //     "Streamlined payment processing with automated invoicing and secure transaction handling for both parties.",
  // },
  {
    title: "Quality Assurance",
    href: "/howitworks#quality-assurance",
    description:
      "Comprehensive review and rating system to maintain high service standards and professional accountability.",
  },
];

function closeMobile() {
  mobileOpen.value = false;
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 h-16 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-7xl flex items-center justify-between h-16">
      <!-- LEFT -->
      <div class="flex items-center gap-3">
        <!-- Mobile only -->
        <div class="flex items-center gap-3 md:hidden">
          <UISheet v-model:open="mobileOpen">
            <UISheetTrigger as-child>
              <UIButton variant="ghost" size="icon" aria-label="Open menu">
                <Icon name="lucide:menu" class="h-5 w-5" />
              </UIButton>
            </UISheetTrigger>

            <!-- Non-transparent overlay -->
            <UISheetOverlay class="bg-background/80 backdrop-blur-sm" />

            <UISheetContent side="left" class="w-[320px] p-0">
              <UISheetHeader class="px-5 py-4">
                <UISheetTitle class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg items-center justify-center flex"
                  >
                    <img src="~/assets/images/logo.svg" alt="Pharmify Logo" />
                  </div>
                  <span
                    class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                  >
                    Pharmify
                  </span>
                </UISheetTitle>
              </UISheetHeader>

              <UISeparator />

              <div class="px-3 py-3">
                <div class="grid gap-2">
                  <NuxtLink
                    to="/"
                    class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    @click="closeMobile"
                  >
                    Home
                  </NuxtLink>

                  <UIAccordion type="single" collapsible class="w-full">
                    <UIAccordionItem value="getting-started">
                      <UIAccordionTrigger class="px-3">
                        Getting started
                      </UIAccordionTrigger>
                      <UIAccordionContent class="px-3 pb-2">
                        <div class="grid gap-2">
                          <NuxtLink
                            to="/findWork"
                            prefetch-on="interaction"
                            class="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                            @click="closeMobile"
                          >
                            <div class="text-sm font-medium leading-none">
                              Find work
                            </div>
                            <p
                              class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground"
                            >
                              Connecting you with pharmacies that need your
                              expertise.
                            </p>
                          </NuxtLink>

                          <NuxtLink
                            to="/findStaff"
                            prefetch-on="interaction"
                            class="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                            @click="closeMobile"
                          >
                            <div class="text-sm font-medium leading-none">
                              Find talent
                            </div>
                            <p
                              class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground"
                            >
                              Finding the right locum for your pharmacy needs.
                            </p>
                          </NuxtLink>
                        </div>
                      </UIAccordionContent>
                    </UIAccordionItem>

                    <UIAccordionItem value="how-it-works">
                      <UIAccordionTrigger class="px-3">
                        How it works
                      </UIAccordionTrigger>
                      <UIAccordionContent class="px-3 pb-2">
                        <div class="grid gap-2">
                          <NuxtLink
                            v-for="feature in features"
                            :key="feature.title"
                            :to="feature.href"
                            prefetch-on="interaction"
                            class="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                            @click="closeMobile"
                          >
                            <div class="text-sm font-medium leading-none">
                              {{ feature.title }}
                            </div>
                            <p
                              class="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground"
                            >
                              {{ feature.description }}
                            </p>
                          </NuxtLink>
                        </div>
                      </UIAccordionContent>
                    </UIAccordionItem>
                  </UIAccordion>

                  <NuxtLink
                    to="/docs/introduction"
                    prefetch-on="interaction"
                    class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    @click="closeMobile"
                  >
                    Pricing
                  </NuxtLink>
                </div>

                <UISeparator class="my-4" />

                <div class="grid gap-2 px-2">
                  <SignedOut>
                    <SignUpButton
                      class="w-full text-left rounded-md px-3 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
                      @click="closeMobile"
                    />
                  </SignedOut>

                  <SignedOut>
                    <SignInButton
                      class="w-full text-left rounded-md px-3 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
                      @click="closeMobile"
                    />
                  </SignedOut>

                  <SignedIn>
                    <div
                      class="flex items-center justify-between rounded-md px-3 py-2"
                    >
                      <span class="text-sm text-muted-foreground">Account</span>
                      <UserButton class="hover:cursor-pointer" />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </UISheetContent>
          </UISheet>

          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg items-center justify-center flex">
              <img src="~/assets/images/logo.svg" alt="Pharmify Logo" />
            </div>
            <p
              class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              Pharmify
            </p>
          </NuxtLink>
        </div>

        <!-- Desktop brand -->
        <UINavigationMenu class="hidden md:flex">
          <UINavigationMenuList>
            <UINavigationMenuItem class="flex items-center gap-4">
              <NuxtLink to="/" prefetch-on="interaction">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg items-center justify-center flex"
                  >
                    <img src="~/assets/images/logo.svg" alt="Pharmify Logo" />
                  </div>
                  <p
                    class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                  >
                    Pharmify
                  </p>
                </div>
              </NuxtLink>
            </UINavigationMenuItem>
          </UINavigationMenuList>
        </UINavigationMenu>
      </div>

      <!-- Desktop nav -->
      <UINavigationMenu class="hidden md:flex">
        <UINavigationMenuList>
          <UINavigationMenuItem>
            <UINavigationMenuTrigger>Getting started</UINavigationMenuTrigger>
            <UINavigationMenuContent>
              <ul
                class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
              >
                <li>
                  <UINavigationMenuLink as-child>
                    <NuxtLink
                      to="/findWork"
                      prefetch-on="interaction"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        Find work
                      </div>
                      <p
                        class="line-clamp-3 text-sm leading-snug text-muted-foreground"
                      >
                        Connecting you with pharmacies that need your expertise.
                      </p>
                    </NuxtLink>
                  </UINavigationMenuLink>
                </li>
                <li>
                  <UINavigationMenuLink as-child>
                    <NuxtLink
                      to="/findStaff"
                      prefetch-on="interaction"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        Find talent
                      </div>
                      <p
                        class="line-clamp-3 text-sm leading-snug text-muted-foreground"
                      >
                        Finding the right locum for your pharmacy needs.
                      </p>
                    </NuxtLink>
                  </UINavigationMenuLink>
                </li>
              </ul>
            </UINavigationMenuContent>
          </UINavigationMenuItem>

          <UINavigationMenuItem>
            <UINavigationMenuTrigger>How it works</UINavigationMenuTrigger>
            <UINavigationMenuContent>
              <ul
                class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
              >
                <li v-for="feature in features" :key="feature.title">
                  <UINavigationMenuLink as-child>
                    <NuxtLink
                      :to="feature.href"
                      prefetch-on="interaction"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        {{ feature.title }}
                      </div>
                      <p
                        class="line-clamp-3 text-sm leading-snug text-muted-foreground"
                      >
                        {{ feature.description }}
                      </p>
                    </NuxtLink>
                  </UINavigationMenuLink>
                </li>
              </ul>
            </UINavigationMenuContent>
          </UINavigationMenuItem>

          <UINavigationMenuItem>
            <UINavigationMenuLink
              href="/docs/introduction"
              :class="navigationMenuTriggerStyle()"
            >
              Pricing
            </UINavigationMenuLink>
          </UINavigationMenuItem>
        </UINavigationMenuList>
      </UINavigationMenu>

      <!-- Desktop auth -->
      <UINavigationMenu class="hidden md:flex flex-row gap-4">
        <UINavigationMenuList>
          <UINavigationMenuItem>
            <UINavigationMenuLink>
              <SignedOut>
                <SignUpButton class="hover:cursor-pointer font-semibold" />
              </SignedOut>
            </UINavigationMenuLink>
          </UINavigationMenuItem>
        </UINavigationMenuList>

        <UINavigationMenuList>
          <UINavigationMenuItem>
            <UINavigationMenuLink>
              <SignedOut>
                <SignInButton class="hover:cursor-pointer font-semibold" />
              </SignedOut>
              <SignedIn>
                <UserButton class="hover:cursor-pointer" />
              </SignedIn>
            </UINavigationMenuLink>
          </UINavigationMenuItem>
        </UINavigationMenuList>
      </UINavigationMenu>
    </div>
  </header>
</template>
