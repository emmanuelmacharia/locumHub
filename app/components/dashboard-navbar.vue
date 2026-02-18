<script setup lang="ts">
import { ref } from "vue";
import { UserButton } from "@clerk/vue";
import {
  NavigationMenu as UINavigationMenu,
  NavigationMenuItem as UINavigationMenuItem,
  NavigationMenuLink as UINavigationMenuLink,
  NavigationMenuList as UINavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button as UIButton } from "@/components/ui/button";
import { Badge as UIBadge } from "@/components/ui/badge";
import {
  Sheet as UISheet,
  SheetContent as UISheetContent,
  SheetHeader as UISheetHeader,
  SheetTitle as UISheetTitle,
  SheetTrigger as UISheetTrigger,
  SheetOverlay as UISheetOverlay,
} from "@/components/ui/sheet";
import { Separator as UISeparator } from "@/components/ui/separator";

const mobileOpen = ref(false);

function closeMobile() {
  mobileOpen.value = false;
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-7xl flex items-center justify-between h-16">
      <!-- LEFT - Mobile menu button + Logo -->
      <div class="flex items-center gap-3 md:hidden">
        <!-- Mobile menu button -->
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
                  Dashboard
                </NuxtLink>

                <NuxtLink
                  to="/settings"
                  class="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  @click="closeMobile"
                >
                  Settings & Preferences
                </NuxtLink>
              </div>

              <UISeparator class="my-4" />

              <div class="grid gap-2 px-2">
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

        <!-- Logo -->
        <!-- <UINavigationMenu class="flex items-center gap-3">
          <NuxtLink to="/">
            <div class="w-10 h-10 rounded-lg items-center justify-center flex">
              <img src="~/assets/images/logo.svg" alt="Pharmify Logo" />
            </div>
            <p
              class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            >
              Pharmifyes
            </p>
          </NuxtLink>
        </UINavigationMenu> -->
      </div>

      <!-- CENTER - Logo (desktop only) + Pharmacy info -->
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

      <div class="flex-1 flex justify-center items-center gap-6">
        <!-- Desktop logo -->

        <UINavigationMenu class="flex">
          <UINavigationMenuList>
            <UINavigationMenuItem class="flex items-center gap-1">
              <span class="text-sm font-medium">Pharmacy Name</span>
              <UIBadge variant="outline" class="text-xs mx-2">
                <Icon
                  name="lucide:star"
                  class="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1"
                />
                4.5
              </UIBadge>
              <UIBadge
                class="bg-linear-to-r from-emerald-500 to-emerald-500/70 text-primary-foreground text-[10px]"
              >
                Subscription tier
              </UIBadge>
            </UINavigationMenuItem>
          </UINavigationMenuList>
        </UINavigationMenu>
      </div>

      <!-- RIGHT - Notifications and user menu -->
      <UINavigationMenu class="hidden md:flex items-center gap-1">
        <UINavigationMenuItem>
          <UIButton variant="ghost" size="icon" class="relative h-9 w-9">
            <Icon name="lucide:bell" class="h-4 w-4" />
            <span
              class="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center"
            >
              9+
            </span>
          </UIButton>
        </UINavigationMenuItem>
        <UINavigationMenuItem>
          <UINavigationMenuLink>
            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Settings & Preferences"
                    href="/settings"
                  >
                    <template #labelIcon>
                      <Icon name="lucide:user" />
                    </template>
                  </UserButton.Link>
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </UINavigationMenuLink>
        </UINavigationMenuItem>
      </UINavigationMenu>
    </div>
  </header>
</template>

<style scoped>
*,
ul,
li {
  list-style: none;
}
</style>
