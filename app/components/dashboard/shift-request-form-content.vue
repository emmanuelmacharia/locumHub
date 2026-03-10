<script setup lang="ts">
import { z } from "zod";
import { useForm } from "@tanstack/vue-form";
import type { Location } from "./location-switcher.vue";
import {
  CalendarDate,
  type DateValue,
  getLocalTimeZone,
  startOfWeek,
  today,
} from "@internationalized/date";
import { timeOptions } from "~/utils/data/time";
import { useStore } from "@tanstack/vue-store";
import skills from "~/utils/data/skills.json";

const props = defineProps<{
  open: boolean;
  isUrgent: boolean;
  locations: Location[];
}>();

const emit = defineEmits<{
  stepEvent: [currentStep: number];
}>();

const currentStep = ref(0);
const totalSteps = ref(3);

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const formSchema = z.object({
  isUrgent: z.boolean().default(false),
  locationId: z.string(),
  date: z.date(),
  startTime: z
    .string()
    .regex(timeRegex, "Invalid time format. Expected HH:MM (24-hour)"),
  endTime: z
    .string()
    .regex(timeRegex, "Invalid time format. Expected HH:MM (24-hour)"),
  description: z
    .string()
    .min(20, "A brief but detailed description is required")
    .max(500, "Your shift description is too long. You need to summarize it"),
  requirements: z.array(z.string()),
  requiredSpecialization: z.array(z.string()),
  saveAsTemplate: z.boolean().default(false),
});

type FormInput = z.input<typeof formSchema>;

const form = useForm({
  defaultValues: {
    isUrgent: false, // done
    saveAsTemplate: false, // chill
    locationId: "", // done
    date: undefined as unknown as Date, // done
    startTime: "", // done
    endTime: "", // done
    description: "",
    requirements: [],
    requiredSpecialization: [],
  } as FormInput,
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async () => {},
  onSubmitInvalid: () => {},
});

const formValues = useStore(form.store, (state) => state.values);

const stepSchemas = {
  0: z.object({
    locationId: z.string().min(1, "Please select a location"),
  }),
  1: z
    .object({
      date: z.date(),
      startTime: z
        .string()
        .regex(timeRegex, "Invalid time format. Expected HH:MM"),
      endTime: z
        .string()
        .regex(timeRegex, "Invalid time format. Expected HH:MM"),
    })
    .refine((data) => data.startTime < data.endTime, {
      path: ["endTime"],
      message: "End time must be after start time",
    }),
  2: z.object({
    description: z
      .string()
      .min(20, "A brief but detailed description is required")
      .max(500, "Your shift description is too long. You need to summarize it"),
    requirements: z.array(z.string()).min(1, "Select at least one requirement"),
    requiredSpecialization: z
      .array(z.string())
      .min(1, "Select at least one specialization"),
  }),
} as const;

const getDefaultValues = (): FormInput =>
  ({
    isUrgent: props.isUrgent,
    saveAsTemplate: false,
    locationId: "",
    date: undefined as unknown as Date,
    startTime: "",
    endTime: "",
    description: "",
    requirements: [],
    requiredSpecialization: [],
  }) as FormInput;

watch(
  () => props.open,
  (isOpen, wasOpen) => {
    if (wasOpen && !isOpen) {
      form.reset(getDefaultValues());
      currentStep.value = 0;
      emit("stepEvent", 0);
    }
  },
);

watch(
  () => props.isUrgent,
  (urgent) => {
    form.setFieldValue("isUrgent", urgent);
  },
);

const canContinue = computed(() => {
  const values = formValues.value;

  switch (currentStep.value) {
    case 0:
      return stepSchemas[0].safeParse({
        locationId: values.locationId,
      }).success;

    case 1:
      return stepSchemas[1].safeParse({
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
      }).success;

    case 2:
      return stepSchemas[2].safeParse({
        description: values.description,
        requirements: values.requirements,
        requiredSpecialization: values.requiredSpecialization,
      }).success;

    case 3:
      return;

    default:
      return false;
  }
});

const displayFields = computed(() => {
  const values = formValues.value;
  return {
    locationName: props.locations.find(
      (loc) => loc.id.toString() === values.locationId,
    )?.name,
    date: values.date.toLocaleDateString("en-KE", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: `${values.startTime} - ${values.endTime}`,
    description: values.description,
    jobRequirements: values.requirements,
    requiredSpecializaion: values.requiredSpecialization,
    isUrgent: values.isUrgent,
  };
});

// date stuff
const locale = "en-GB";
const timeZone = getLocalTimeZone();
const currentDate = today(timeZone);
const minDate = startOfWeek(currentDate, locale);
const maxDate = currentDate.add({ months: 6 });

const dateToCalendarDate = (date?: Date | null) => {
  if (!date) return undefined;
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
};

const calendarDateToJSDate = (value?: DateValue | null) => {
  if (!value) return undefined;
  return new Date(value.year, value.month - 1, value.day);
};

const handleCalendarUpdate = (
  value: DateValue | undefined,
  onDateSelected: (date: Date) => void,
) => {
  const jsDate = calendarDateToJSDate(value);

  if (!jsDate) return;

  onDateSelected(jsDate);
};
</script>

<template>
  <div class="flex items-center gap-2 mb-6 px-6">
    <div
      v-for="i in totalSteps"
      :key="`step-${i}`"
      :class="`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStep ? 'bg-emerald-500' : 'bg-muted'}`"
    />
  </div>
  <form
    id="quick-shift-request-form"
    class="px-4 py-4"
    @submit.prevent.stop="form.handleSubmit()"
  >
    <div v-if="currentStep === 0" class="mb-4">
      <UIFieldGroup>
        <form.Field name="locationId">
          <template #default="{ field }">
            <button
              v-for="location in locations"
              :key="location.id"
              type="button"
              :class="`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${field.state.value === location.id.toString() ? 'border-emerald-500 bg-emerald-500/5' : 'border-border hover:border-emerald-500/50 hover:bg-muted/50'}`"
              :value="field.state.value"
              :name="field.name"
              @click="
                (e) => {
                  field.handleChange(location.id.toString());
                  currentStep = 1;
                  emit('stepEvent', currentStep);
                }
              "
            >
              <div class="p-2 rounded-lg bg-emerald-500/10">
                <Icon name="lucide:map-pin" class="h-5 w-5 text-emerald-500" />
              </div>
              <div class="flex-1">
                <p class="font-semibold">{{ location.name }}</p>
                <p class="text-sm text-muted-foreground">{{ location.id }}</p>
              </div>
              <Icon
                name="lucide:chevron-right"
                class="h-5 w-5 text-muted-foreground"
              />
            </button>
          </template>
        </form.Field>
      </UIFieldGroup>
    </div>
    <div v-if="currentStep === 1" class="mb-4">
      <UIFieldGroup class="flex flex-col gap-4">
        <form.Field name="date">
          <template #default="{ field }">
            <div class="flex justify-center">
              <UICalendar
                mode="single"
                layout="month-and-year"
                :week-starts-on="1"
                :min-value="minDate"
                :max-value="maxDate"
                :model-value="dateToCalendarDate(field.state.value)"
                @update:model-value="
                  (value) =>
                    handleCalendarUpdate(value, (date) => {
                      field.handleChange(date);
                    })
                "
              />
            </div>
          </template>
        </form.Field>
        <div class="flex gap-4 justify-center align-center space-y-3">
          <form.Field name="startTime">
            <template #default="{ field }">
              <UISelect
                @update:model-value="
                  (value) => {
                    field.handleChange(value as string);
                  }
                "
              >
                <UISelectTrigger class="w-40">
                  <UISelectValue placeholder="select start time" />
                </UISelectTrigger>
                <UISelectContent>
                  <UISelectItem
                    v-for="hour in timeOptions"
                    :key="`start-${hour}`"
                    :value="hour"
                  >
                    {{ hour }}
                  </UISelectItem>
                </UISelectContent>
              </UISelect>
            </template>
          </form.Field>
          <form.Field name="endTime">
            <template #default="{ field }">
              <UISelect
                @update:model-value="
                  (value) => {
                    field.handleChange(value as string);
                  }
                "
              >
                <UISelectTrigger class="w-40">
                  <UISelectValue placeholder="select end time" />
                </UISelectTrigger>
                <UISelectContent>
                  <UISelectItem
                    v-for="hour in timeOptions"
                    :key="`end-${hour}`"
                    :value="hour"
                  >
                    {{ hour }}
                  </UISelectItem>
                </UISelectContent>
              </UISelect>
            </template>
          </form.Field>
        </div>
      </UIFieldGroup>

      <div class="flex gap-4 justify-center align-center my-4">
        <UIButton
          size="lg"
          variant="secondary"
          class="w-40"
          @click="
            () => {
              currentStep -= 1;
              emit('stepEvent', currentStep);
            }
          "
          >Back</UIButton
        >
        <UIButton
          size="lg"
          class="w-40 bg-emerald-500 hover:bg-emerald-500/90 disabled:bg-gray-400/50 transition-all"
          :disabled="!canContinue"
          @click="
            () => {
              currentStep += 1;
              emit('stepEvent', currentStep);
            }
          "
          >Continue</UIButton
        >
      </div>
    </div>
    <div v-if="currentStep === 2" class="mb-4">
      <UIFieldGroup class="flex flex-col gap-4">
        <form.Field name="description">
          <template #default="{ field }">
            <UIField>
              <UIFieldLabel for="description"> Job description </UIFieldLabel>
              <UITextarea
                id="description"
                v-model="field.state.value"
                :name="field.name"
                placeholder="Write a brief job description of the role you"
                @blur="field.handleBlur"
                @input="
                  (e: Event) =>
                    field.handleChange((e.target as HTMLTextAreaElement).value)
                "
              />
              <!-- <UIFieldError v-if="field.state.meta.errors.length">
                <div
                  class="text-red-500"
                  v-for="message in field.state.meta.errors"
                >
                  {{ message.message }}
                </div>
              </UIFieldError> -->
            </UIField>
          </template>
        </form.Field>

        <div class="my-3">
          <!-- ideally we should just show the services offered by the pharmacy; more on this in a little while -->
          <form.Field name="requirements">
            <template #default="{ field }">
              <UIField>
                <UIFieldLabel for="jd"> Job requirements</UIFieldLabel>
                <UITagsInput
                  id="jd"
                  :model-value="field.state.value"
                  class="min-h-24"
                  @update:model-value="
                    (value) => field.handleChange(value.map(String))
                  "
                >
                  <UITagsInputItem
                    v-for="item in field.state.value"
                    :key="item"
                    :value="item"
                    class="bg-emerald-500/20 px-2 py-4"
                  >
                    <UITagsInputItemText />
                    <UITagsInputItemDelete />
                  </UITagsInputItem>
                  <UITagsInputInput
                    class="py-4"
                    placeholder="Enter required skills (press enter after each entry)"
                    @blur="field.handleBlur"
                  />
                </UITagsInput>
              </UIField>
            </template>
          </form.Field>

          <form.Field name="requiredSpecialization">
            <template #default="{ field }">
              <UIField class="py-6 px-2">
                <UIFieldLabel for="skills">
                  Required skills and specializations
                </UIFieldLabel>
                <div class="grid grid-cols-1 gap-4 my-3">
                  <UIScrollArea class="h-[250px]">
                    <div
                      v-for="service of skills.pharmacistServices"
                      :key="service.id"
                      class="flex items-center space-x-2"
                    >
                      <UICheckbox
                        :id="`${service.name}-${service.id}`"
                        :key="`${service.name}-${service.id}`"
                        :value="service.name"
                        :checked="field.state.value.includes(service.name)"
                        @update:model-value="
                          (checked: boolean | 'indeterminate') => {
                            if (checked === 'indeterminate') return;
                            const updatedServices = checked
                              ? [...field.state.value, service.name]
                              : field.state.value.filter(
                                  (s) => s !== service.name,
                                );
                            field.handleChange(updatedServices);
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
                  </UIScrollArea>
                </div>
              </UIField>
            </template>
          </form.Field>
        </div>
      </UIFieldGroup>
      <div
        class="relative bottom-10 flex gap-4 justify-center align-center my-4"
      >
        <UIButton
          size="lg"
          variant="secondary"
          class="w-40"
          @click="
            () => {
              currentStep -= 1;
              emit('stepEvent', currentStep);
            }
          "
          >Back</UIButton
        >
        <UIButton
          size="lg"
          class="w-40 bg-emerald-500 hover:bg-emerald-500/90 disabled:bg-gray-400/50 transition-all"
          :disabled="!canContinue"
          @click="
            () => {
              currentStep += 1;
              emit('stepEvent', currentStep);
            }
          "
          >Continue</UIButton
        >
      </div>
    </div>
    <div v-if="currentStep === 3" class="mb-4">
      <!-- review screen -->
      <div class="space-y-4">
        <div class="p-4 rounded-xl bg-muted space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Location</span>
            <span class="font-medium">
              {{ displayFields.locationName }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Date</span>
            <span class="font-medium">
              {{ displayFields.date }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Time</span>
            <span class="font-medium">
              {{ displayFields.time }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Priority</span>
            <UIBadge
              :variant="displayFields.isUrgent ? 'destructive' : 'secondary'"
            >
              {{ displayFields.isUrgent ? "Urgent" : "Standard" }}
            </UIBadge>
          </div>
          <div class="flex flex-col gap-4">
            <span class="text-sm text-muted-foreground"> Description </span>
            <span class="text-sm">
              {{ form.getFieldInfo("description").instance?.state.value }}
            </span>
          </div>
          <div class="flex flex-col gap-4">
            <span class="text-sm text-muted-foreground">Job Requirements</span>
            <div class="grid grid-cols-2 gap-4">
              <span
                v-for="(r, index) in displayFields.jobRequirements"
                :key="`${index}-r`"
                class="text-sm"
              >
                {{ r }}
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <span class="text-sm text-muted-foreground">Required skills</span>
            <div class="grid grid-cols-2 gap-4">
              <span
                v-for="(r, index) in displayFields.requiredSpecializaion"
                :key="`${index}-r`"
                class="text-sm"
              >
                {{ r }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
