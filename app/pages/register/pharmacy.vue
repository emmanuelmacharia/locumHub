<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { z } from "zod";
import { hoursSchema } from "~/utils/types/hourSchema";
import { cities, countries } from "~/utils/data/locations";
import { days, timeOptions } from "~/utils/data/time";
import pharmacyServices from "~/utils/data/services.json";

definePageMeta({
    layout: "landing-page",
});

const formSchema = z.object({
    // id data
    pharmacyName: z
        .string()
        .min(2, "Pharmacy name must be at least 2 characters long"),
    licenseNumber: z
        .string()
        .min(8, "Pharmacy license number must be at least 8 characters long"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 characters long"),
    email: z.email("Invalid email address"),
    // location data
    isChain: z.boolean(),
    locationName: z
        .string()
        .min(2, "Location name must be at least 2 characters long")
        .default(""),
    address: z.string().min(10, "Address must be at least 10 characters long"),
    postcode: z.string().min(4, "Postcode must be at least 4 characters long"),
    isPrimaryLocation: z.boolean(),
    city: z.string().min(2, "City must be at least 2 characters long"),
    country: z.string().min(2, "Country must be at least 2 characters long"),
    // operation data
    operatingHours: hoursSchema,
    services: z.array(z.string()).min(1, "At least one service must be selected"),
});

type FormInput = z.input<typeof formSchema>;

const form = useForm({
    defaultValues: {
        pharmacyName: "",
        licenseNumber: "",
        phoneNumber: "",
        email: "",
        isChain: false,
        locationName: "",
        address: "",
        postcode: "",
        isPrimaryLocation: true,
        city: "",
        country: "",
        operatingHours: {
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            saturday: null,
            sunday: null,
            holidays: null,
        },
        services: [] as string[],
    } as FormInput,
    validators: {
        onSubmit: formSchema,
    },
    onSubmit: async (values) => {
        console.log("Form Submitted:", values);
        // Handle form submission logic here
    },
});
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
                            <Icon name="lucide:building-2" class="text-white" />
                        </div>
                        <UICardTitle class="text-2xl"> Register as a Pharmacy </UICardTitle>
                        <p class="text-muted-foreground">
                            Join thousands of professionals already on our platform
                        </p>
                    </UICardHeader>

                    <UICardContent>
                        <form id="pharmacy-registration-form" @submit.prevent="form.handleSubmit">
                            <div class="my-8">
                                <div class="flex items-center space-x-2">
                                    <Icon name="lucide:file-text" class="h-12 w-12 text-muted-foreground" />
                                    <UILabel class="text-lg font-medium">Pharmacy Details</UILabel>
                                </div>
                            </div>
                            <UIFieldGroup class="grid grid-cols-1 md:grid-cols-2">
                                <form.Field name="pharmacyName">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Pharmacy Name</UIFieldLabel>
                                            <UIInput v-model="field.state.value" :name="field.name" type="text"
                                                placeholder="Enter pharmacy name" autocomplete="off"
                                                @blur="field.handleBlur"
                                                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)" />

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                                <form.Field name="licenseNumber">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Pharmacy License Number</UIFieldLabel>
                                            <UIInput v-model="field.state.value" :name="field.name" type="text"
                                                placeholder="Enter pharmacy license number" autocomplete="off"
                                                @blur="field.handleBlur"
                                                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)" />

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                                <form.Field name="phoneNumber">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Phone Number</UIFieldLabel>
                                            <UIInput v-model="field.state.value" :name="field.name" type="tel"
                                                placeholder="Enter phone number" autocomplete="off"
                                                @blur="field.handleBlur"
                                                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)" />

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                                <form.Field name="email">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Email Address</UIFieldLabel>
                                            <UIInput v-model="field.state.value" :name="field.name" type="email"
                                                placeholder="Enter Email Address" autocomplete="off"
                                                @blur="field.handleBlur"
                                                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)" />

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                            </UIFieldGroup>

                            <div class="my-8">
                                <div class="flex items-center space-x-2">
                                    <Icon name="lucide:map-pin" class="h-12 w-12 text-muted-foreground" />
                                    <UILabel class="text-lg font-medium">Location Details</UILabel>
                                </div>
                            </div>
                            <UIFieldGroup class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <form.Field name="address">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Address</UIFieldLabel>
                                            <UIInput v-model="field.state.value" :name="field.name" type="text"
                                                placeholder="Enter address" autocomplete="off" @blur="field.handleBlur"
                                                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)" />

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                                <form.Field name="city">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>City</UIFieldLabel>
                                            <UISelect v-model="field.state.value" :name="field.name"
                                                @update:model-value="(value: any) => value && field.handleChange(value)">
                                                <UISelectTrigger>
                                                    <UISelectValue placeholder="Select city" />
                                                </UISelectTrigger>
                                                <UISelectContent>
                                                    <UISelectItem v-for="city in cities" :key="city.name"
                                                        :value="city.name">{{ city.name }}</UISelectItem>
                                                </UISelectContent>
                                            </UISelect>

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                                <form.Field name="postcode">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Postcode</UIFieldLabel>
                                            <UIInput v-model="field.state.value" :name="field.name" type="text"
                                                placeholder="Enter postcode" autocomplete="off" @blur="field.handleBlur"
                                                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)" />

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                                <form.Field name="country">
                                    <template #default="{ field }">
                                        <UIField>
                                            <UIFieldLabel>Country</UIFieldLabel>
                                            <UISelect v-model="field.state.value" :name="field.name"
                                                @update:model-value="(value: any) => value && field.handleChange(value)">
                                                <UISelectTrigger>
                                                    <UISelectValue placeholder="Select country" />
                                                </UISelectTrigger>
                                                <UISelectContent>
                                                    <UISelectItem v-for="country in countries" :key="country.code"
                                                        :value="country.code">
                                                        {{ country.name }}</UISelectItem>
                                                </UISelectContent>
                                            </UISelect>

                                            <UIFieldError v-if="field.state.meta.errors.length">
                                                {{ field.state.meta.errors.join(', ') }}
                                            </UIFieldError>
                                        </UIField>
                                    </template>
                                </form.Field>
                            </UIFieldGroup>
                            <div class="my-8">
                                <div class="flex items-center space-x-2">
                                    <Icon name="lucide:cog" class="h-12 w-12 text-muted-foreground" />
                                    <UILabel class="text-lg font-medium">Operations</UILabel>
                                </div>
                            </div>
                            <UILabel class="mt-4">Services Offered</UILabel>
                            <form.Field name="services" class="my-4">
                                <template #default="{ field }">
                                    <UIField>

                                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3">
                                            <div v-for="service of pharmacyServices.pharmacyServices" :key="service.id"
                                                class="flex items-center space-x-2">
                                                <UICheckbox :value="service.id"
                                                    :checked="field.state.value.includes(service.name)" @update:checked="(checked: boolean) => {
                                                        const updatedServices = checked
                                                            ? [...field.state.value, service.name]
                                                            : field.state.value.filter(s => s !== service.name);
                                                        field.handleChange(updatedServices);
                                                    }" />
                                                <UILabel class="text-sm text-muted-foreground">
                                                    {{ service.name }}
                                                </UILabel>
                                            </div>
                                        </div>

                                        <UIFieldError v-if="field.state.meta.errors.length">
                                            {{ field.state.meta.errors.join(', ') }}
                                        </UIFieldError>
                                    </UIField>
                                </template>
                            </form.Field>
                            <UILabel class="mt-8 mb-4">Operating Hours</UILabel>
                            <div class="space-y-3">
                                <div class="space-y-2 rounded-lg border border-border p-4 bg-muted/30">
                                    <form.Field name="operatingHours">
                                        <template #default="{ field }">
                                            <UIField>
                                                <div v-for="day in days" :key="day"
                                                    class="flex flex-row items-center gap-4 py-2 border-b border-border/50 last:border-0">
                                                    <div class="flex items-center gap-2 lg:w-[25%] w-[35%]">
                                                        <UISwitch
                                                            :model-value="!!(field.state.value[day.toLowerCase() as keyof typeof field.state.value])"
                                                            @update:model-value="(enabled: boolean) => {
                                                                const dayKey = day.toLowerCase() as keyof typeof field.state.value;
                                                                const updatedHours = { ...field.state.value };
                                                                console.log('Enabled:', enabled, updatedHours);
                                                                updatedHours[dayKey] = enabled
                                                                    ? { open: '09:00', close: '17:00', enabled, is24Hours: false }
                                                                    : null;
                                                                field.handleChange(updatedHours);
                                                            }" />
                                                        <span className="text-sm font-medium">{{ day }}</span>
                                                    </div>

                                                    <div v-if="field.state.value[day.toLowerCase() as keyof typeof field.state.value]"
                                                        class="flex flex-col items-center md:flex-row gap-4 md:w-[400px] w-full">
                                                        <div class="flex items-center gap-2 md:w-[200px]">
                                                            <UISwitch :model-value="field.state.value[day.toLowerCase() as keyof typeof
                                                                field.state.value]?.is24Hours || false"
                                                                @update:model-value="
                                                                    (value: boolean) => {
                                                                        const dayKey = day.toLowerCase() as keyof typeof
                                                                            field.state.value;
                                                                        const updatedHours = { ...field.state.value };
                                                                        const currentDay = updatedHours[dayKey];
                                                                        if (currentDay) {
                                                                            updatedHours[dayKey] = {
                                                                                ...currentDay,
                                                                                is24Hours: value,
                                                                                open: value ? '00:00' : currentDay.open || '09:00',
                                                                                close: value ? '23:59' : currentDay.close || '17:00',
                                                                            };
                                                                        }
                                                                        field.handleChange(updatedHours);
                                                                    }" />
                                                            <span className="text-sm text-muted-foreground">24
                                                                hrs</span>
                                                        </div>
                                                        <div v-if="!field.state.value[day.toLowerCase() as keyof typeof field.state.value]?.is24Hours"
                                                            class="flex md:items-center justify-center flex-col md:flex-row gap-1 md:gap-3">
                                                            <UISelect>
                                                                <UISelectTrigger class="w-30">
                                                                    <UISelectValue
                                                                        :placeholder="field.state.value[day.toLowerCase() as keyof typeof field.state.value]?.open" />
                                                                </UISelectTrigger>
                                                                <UISelectContent>
                                                                    <UISelectItem v-for="hour in timeOptions"
                                                                        :key="`open-${hour}`" :value="hour"
                                                                        @update:model-value="(value: string) => {
                                                                            const dayKey = day.toLowerCase() as keyof typeof
                                                                                field.state.value;
                                                                            const currentState = field.state.value[dayKey];
                                                                            const updatedHours = { ...field.state.value };
                                                                            if (!updatedHours[dayKey]) {
                                                                                updatedHours[dayKey] = { open: '', close: currentState!.close, is24Hours: false, enabled: true };
                                                                            }
                                                                            updatedHours[dayKey].open = value
                                                                            field.handleChange(updatedHours);
                                                                        }">
                                                                        {{ hour }}</UISelectItem>
                                                                </UISelectContent>
                                                            </UISelect>
                                                            <p class="text-sm text-muted-foreground">to</p>
                                                            <UISelect>
                                                                <UISelectTrigger class="w-30">
                                                                    <UISelectValue
                                                                        :placeholder="field.state.value[day.toLowerCase() as keyof typeof field.state.value]?.close"
                                                                        @update:model-value="(value: string) => {
                                                                            const dayKey = day.toLowerCase() as keyof typeof
                                                                                field.state.value;
                                                                            const currentState = field.state.value[dayKey];
                                                                            const updatedHours = { ...field.state.value };
                                                                            if (!updatedHours[dayKey]) {
                                                                                updatedHours[dayKey] = { open: currentState!.open, close: field.state.value[dayKey]?.close || '', is24Hours: false, enabled: true };
                                                                            }
                                                                            updatedHours[dayKey].close = value
                                                                            field.handleChange(updatedHours);
                                                                        }" />
                                                                </UISelectTrigger>
                                                                <UISelectContent>
                                                                    <UISelectItem v-for="hour in timeOptions"
                                                                        :key="`close-${hour}`" :value="hour">
                                                                        {{ hour }}</UISelectItem>
                                                                </UISelectContent>
                                                            </UISelect>
                                                        </div>
                                                        <div v-else class="text-sm text-muted-foreground align-center">
                                                            Open 24 Hours
                                                        </div>
                                                    </div>
                                                    <div v-else class="text-sm text-muted-foreground">
                                                        Closed
                                                    </div>
                                                </div>

                                                <UIFieldError v-if="field.state.meta.errors.length">
                                                    {{ field.state.meta.errors.join(', ') }}
                                                </UIFieldError>
                                            </UIField>
                                        </template>
                                    </form.Field>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <UIButton type="submit" class="w-[90%] mt-8 bg-gradient-primary">Register Pharmacy
                                </UIButton>
                            </div>
                        </form>
                    </UICardContent>
                </UICard>
            </div>
            <p class="text-center text-muted-foreground text-sm mt-8">
                Already have an account?
                <NuxtLink to="/login" class="text-emerald-500 hover:underline">Log in here.</NuxtLink>
            </p>
        </div>
    </ClientOnly>
</template>