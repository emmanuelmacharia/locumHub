<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { z } from "zod";
import { cities, countries } from "~/utils/data/locations";
import skills from "~/utils/data/skills.json";

definePageMeta({
  layout: "landing-page",
});

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters long"),
  city: z.string().min(2, "City must be selected from the provided list"),
  country: z.string().min(2, "Country must be selected from the provided list"),
  qualifications: z
    .string()
    .min(5, "Qualifications must be at least 5 characters long"),
  licenseNumber: z
    .string()
    .min(8, "License number must be at least 8 characters long"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience must be a positive number"),
  hourlyRate: z.number().min(100, "Hourly rate must be greater than 100 KES"),
  professionalBio: z
    .string()
    .min(20, "You must have a brief but detailed professional bio")
    .max(500, "Your professional bio is too long. You need to summarize it"),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
});

type FormInput = z.input<typeof formSchema>;

const form = useForm({
  defaultValues: {
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    qualifications: "",
    licenseNumber: "",
    yearsOfExperience: 0,
    hourlyRate: 100,
    professionalBio: "",
    services: [] as string[],
  } as FormInput,
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async (values) => {
    // eslint-disable-next-line no-console
    console.log("Form submitted with values:", values);
    // Handle form submission logic here
  },
  onSubmitInvalid: (errors) => {
    // eslint-disable-next-line no-console
    console.log("Form submission failed with errors:", errors);
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const displayErrorMessage = (fieldError: any[]) => {
  const messages: string[] = [...fieldError.map((err) => err.message)];
  return messages;
};
</script>

<template>
  <ClientOnly>
    <div class="py-12">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8">
          <NuxtLink
            to="/register"
            class="inline-flex items-center text-sm text-muted-foreground hover:text-primary text-decoration-none"
          >
            <Icon name="lucide:arrow-left" class="h-4 w-4 mr-2" />
            Back to user selection
          </NuxtLink>
        </div>
        <UICard>
          <UICardHeader class="text-center">
            <div
              class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary"
            >
              <Icon name="lucide:user-check" class="text-white" />
            </div>
            <UICardTitle class="text-2xl">
              Register as a Pharmacist
            </UICardTitle>
            <p class="text-muted-foreground">
              Join thousands of professionals already on our platform
            </p>
          </UICardHeader>

          <UICardContent>
            <form
              id="staff-registration-form"
              @submit.prevent.stop="form.handleSubmit()"
            >
              <div class="my-4">
                <div class="flex items-center space-x-2">
                  <Icon name="lucide:file-user" />
                  <UILabel class="text-lg font-medium">User details</UILabel>
                </div>
              </div>
              <UIFieldGroup class="grid grid-cols-1 md:grid-cols-2">
                <form.Field name="fullName">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="fullName">Full Name</UIFieldLabel>
                      <UIInput
                        id="fullName"
                        v-model="field.state.value"
                        type="text"
                        :name="field.name"
                        placeholder="Enter your full name"
                        @blur="field.handleBlur"
                        @input="
                          (e: Event) =>
                            field.handleChange(
                              (e.target as HTMLInputElement).value
                            )
                        "
                      />
                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>

                <form.Field name="phoneNumber">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="phoneNumber"
                        >Phone Number</UIFieldLabel
                      >
                      <UIInput
                        id="phoneNumber"
                        v-model="field.state.value"
                        type="tel"
                        :name="field.name"
                        placeholder="Enter your phone number"
                        @blur="field.handleBlur"
                        @input="
                          (e: Event) =>
                            field.handleChange(
                              (e.target as HTMLInputElement).value
                            )
                        "
                      />
                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
              </UIFieldGroup>
              <div class="mt-8 mb-4">
                <div class="flex items-center space-x-2">
                  <Icon
                    name="lucide:map-pin"
                    class="h-12 w-12 text-muted-foreground"
                  />
                  <UILabel class="text-lg font-medium"
                    >Location Details</UILabel
                  >
                </div>
              </div>
              <UIFieldGroup class="grid grid-cols-1 md:grid-cols-2">
                <form.Field name="address">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="address">Address</UIFieldLabel>
                      <UIInput
                        v-model="field.state.value"
                        :name="field.name"
                        type="text"
                        placeholder="Enter address"
                        autocomplete="off"
                        @blur="field.handleBlur"
                        @input="
                          (e: Event) =>
                            field.handleChange(
                              (e.target as HTMLInputElement).value
                            )
                        "
                      />

                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>

                <form.Field name="country">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="country">Country</UIFieldLabel>
                      <UISelect
                        id="country"
                        v-model="field.state.value"
                        :name="field.name"
                        @update:model-value="
                          (value: any) => value && field.handleChange(value)
                        "
                      >
                        <UISelectTrigger>
                          <UISelectValue placeholder="Select country" />
                        </UISelectTrigger>
                        <UISelectContent>
                          <UISelectItem
                            v-for="country in countries"
                            :key="country.code"
                            :value="country.code"
                          >
                            {{ country.name }}</UISelectItem
                          >
                        </UISelectContent>
                      </UISelect>

                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>

                <form.Field name="city">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="city">City</UIFieldLabel>
                      <UISelect
                        id="city"
                        v-model="field.state.value"
                        :name="field.name"
                        @update:model-value="
                          (value: any) => value && field.handleChange(value)
                        "
                      >
                        <UISelectTrigger>
                          <UISelectValue placeholder="Select city" />
                        </UISelectTrigger>
                        <UISelectContent>
                          <UISelectItem
                            v-for="city in cities"
                            :key="city.name"
                            :value="city.name"
                            >{{ city.name }}</UISelectItem
                          >
                        </UISelectContent>
                      </UISelect>

                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
              </UIFieldGroup>
              <div class="mt-8 mb-4">
                <div class="flex items-center space-x-2">
                  <Icon
                    name="lucide:file-text"
                    class="h-12 w-12 text-muted-foreground"
                  />
                  <UILabel class="text-lg font-medium"
                    >Professional Details</UILabel
                  >
                </div>
              </div>
              <UIFieldGroup class="grid grid-cols-1 md:grid-cols-2">
                <form.Field name="licenseNumber">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="licenseNumber"
                        >Pharmacist Registration Number
                      </UIFieldLabel>
                      <UIInput
                        id="licenseNumber"
                        v-model="field.state.value"
                        :name="field.name"
                        type="text"
                        placeholder="Enter pharmacist registration number"
                        @blur="field.handleBlur"
                        @input="
                          (e: Event) =>
                            field.handleChange(
                              (e.target as HTMLInputElement).value
                            )
                        "
                      />

                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
                <form.Field name="qualifications">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="qualifications"
                        >Qualifications
                      </UIFieldLabel>
                      <UIInput
                        id="qualifications"
                        v-model="field.state.value"
                        :name="field.name"
                        type="text"
                        placeholder="Eg PharmD, BPharma etc"
                        @blur="field.handleBlur"
                        @input="
                          (e: Event) =>
                            field.handleChange(
                              (e.target as HTMLInputElement).value
                            )
                        "
                      />

                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
                <form.Field name="yearsOfExperience">
                  <template #default="{ field }">
                    <UIField>
                      <UINumberField
                        id="yearsOfExperience"
                        :model-value="field.state.value"
                        :min="0"
                        :name="field.name"
                        @blur="field.handleBlur"
                        @update:model-value="
                          (value: number) => field.handleChange(value)
                        "
                      >
                        <UILabel for="yearsOfExperience"
                          >Years of Experience</UILabel
                        >
                        <UINumberFieldContent>
                          <UINumberFieldDecrement />
                          <UINumberFieldInput />
                          <UINumberFieldIncrement />
                        </UINumberFieldContent>
                      </UINumberField>
                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
                <form.Field name="hourlyRate">
                  <template #default="{ field }">
                    <UIField>
                      <UINumberField
                        id="hourlyRate"
                        :model-value="field.state.value"
                        :min="100"
                        :name="field.name"
                        :format-options="{
                          style: 'currency',
                          currency: 'KES',
                          currencyDisplay: 'code',
                          currencySign: 'accounting',
                        }"
                        @blur="field.handleBlur"
                        @update:model-value="
                          (value: number) => field.handleChange(value)
                        "
                      >
                        <UILabel for="hourlyRate">Hourly Rate (KES)</UILabel>
                        <UINumberFieldContent>
                          <UINumberFieldDecrement />
                          <UINumberFieldInput />
                          <UINumberFieldIncrement />
                        </UINumberFieldContent>
                      </UINumberField>
                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
              </UIFieldGroup>
              <UIFieldGroup class="grid grid-cols-1 w-full my-4">
                <form.Field name="professionalBio">
                  <template #default="{ field }">
                    <UIField>
                      <UIFieldLabel for="professionalBio"
                        >Professional Bio</UIFieldLabel
                      >
                      <UITextarea
                        id="professionalBio"
                        v-model="field.state.value"
                        :name="field.name"
                        placeholder="Tell us about your experience and expertise..."
                        @blur="field.handleBlur"
                        @input="
                          (e: Event) =>
                            field.handleChange(
                              (e.target as HTMLTextAreaElement).value
                            )
                        "
                      />

                      <div v-if="field.state.meta.errors.length">
                        <UIFieldError
                          v-for="message in displayErrorMessage(
                            field.state.meta.errors
                          )"
                          :key="message"
                        >
                          {{ message }}
                        </UIFieldError>
                      </div>
                    </UIField>
                  </template>
                </form.Field>
              </UIFieldGroup>
              <div class="mt-8 mb-4">
                <div class="flex items-center space-x-2">
                  <Icon
                    name="lucide:stethoscope"
                    class="h-12 w-12 text-muted-foreground"
                  />
                  <UILabel class="text-lg font-medium"
                    >Skills and Specialization</UILabel
                  >
                </div>
              </div>
              <UIFieldGroup class="grid grid-cols-1 w-full">
                <form.Field name="services">
                  <template #default="{ field }">
                    <UIField>
                      <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3"
                      >
                        <div
                          v-for="service of skills.pharmacistServices"
                          :key="service.id"
                          class="flex items-center space-x-2"
                        >
                          <UICheckbox
                            :id="`${service.name}-${service.id}`"
                            :value="service.name"
                            :checked="field.state.value.includes(service.name)"
                            @update:model-value="
                              (checked: boolean | 'indeterminate') => {
                                if (checked === 'indeterminate') return;
                                const updateServices = checked
                                  ? [...field.state.value, service.name]
                                  : field.state.value.filter(
                                      (s) => s !== service.name
                                    );
                                field.handleChange(updateServices);
                              }
                            "
                          />
                          <UILabel
                            class="text-sm text-muted-foreground"
                            :for="`${service.name}-${service.id}`"
                          >
                            {{ service.name }}
                          </UILabel>
                        </div>
                      </div>
                    </UIField>
                    <div v-if="field.state.meta.errors.length">
                      <UIFieldError
                        v-for="message in displayErrorMessage(
                          field.state.meta.errors
                        )"
                        :key="message"
                      >
                        {{ message }}
                      </UIFieldError>
                    </div>
                  </template>
                </form.Field>
              </UIFieldGroup>
              <div class="flex justify-center">
                <UIButton type="submit" class="w-[90%] mt-8 bg-gradient-primary"
                  >Register as a Pharmacist
                </UIButton>
              </div>
            </form>
          </UICardContent>
        </UICard>
      </div>
    </div>
  </ClientOnly>
</template>
