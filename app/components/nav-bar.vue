<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const features: { title: string, href: string, description: string }[] = [
    {
        title: "Verified Professionals",
        href: "/features/verified-professionals",
        description:
            "All locum pharmacists are thoroughly vetted with verified credentials and licenses to ensure quality service.",
    },
    {
        title: "Smart Matching",
        href: "/features/smart-matching",
        description:
            "Our intelligent matching system pairs pharmacies with the most suitable locum professionals based on experience, location, and availability.",
    },
    {
        title: "Flexible Scheduling",
        href: "/features/scheduling",
        description:
            "Easy-to-use calendar system for managing shifts, availability, and booking confirmations in real-time.",
    },
    {
        title: "Instant Communication",
        href: "/features/communication",
        description: "Direct messaging and notification system to facilitate quick and efficient communication between pharmacies and locums.",
    },
    {
        title: "Secure Payments",
        href: "/features/payments",
        description:
            "Streamlined payment processing with automated invoicing and secure transaction handling for both parties.",
    },
    {
        title: "Quality Assurance",
        href: "/features/quality-assurance",
        description:
            "Comprehensive review and rating system to maintain high service standards and professional accountability.",
    },
]
</script>
<template>
    <header
        className="sticky top-0 z-50 w-full border-b bg-background/95 h-16 backdrop-blur supports-backdrop-filter:bg-background/60 flex justify-between space-x-2.5 px-4 sm:px-6 lg:px-8">
        <NavigationMenu>
            <NavigationMenuList>
                <div class="flex items-center gap-3">
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()"
                            class="flex flex-row items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
                                    <Icon name="lucide:stethoscope" class="h-5 w-5 text-white" />
                                </div>
                                <p class=" text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">LocumHub
                                </p>
                            </div>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </div>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul
                            class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
                            <li>
                                <NavigationMenuLink as-child>
                                    <a href="/docs/introduction"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                        <div class="text-sm font-medium leading-none">Find work</div>
                                        <p class="line-clamp-3 text-sm leading-snug text-muted-foreground">
                                            Connecting you with pharmacies that need your expertise.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink as-child>
                                    <a href="/docs/installation"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                        <div class="text-sm font-medium leading-none">Find talent</div>
                                        <p class="line-clamp-3 text-sm leading-snug text-muted-foreground">
                                            Finding the right locum for your pharmacy needs.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>How it works</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <li v-for="feature in features" :key="feature.title">
                                <NavigationMenuLink as-child>
                                    <a :href="feature.href"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                        <div class="text-sm font-medium leading-none">{{ feature.title }}</div>
                                        <p class="line-clamp-3 text-sm leading-snug text-muted-foreground">
                                            {{ feature.description }}
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                        Pricing
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                        <div class="flex items-center gap-3">
                            <Icon name="lucide:user" />
                            Sign in
                        </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                        <div class="flex items-center gap-3">
                            <Icon name="lucide:user-plus" />
                            Sign up
                        </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </header>
</template>