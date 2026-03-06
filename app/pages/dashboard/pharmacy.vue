<script setup lang="ts">
import type {
  CoverageAlert,
  DashboardStats,
  InsightsPanelProps,
} from "~/components/dashboard/insights-panel.vue";
import type { Shift } from "~/components/dashboard/live-shift-tracker.vue";
import type { FavouriteLocum } from "~/components/dashboard/locum-book-card.vue";
import type {
  Message,
  MessagingPanelProps,
} from "~/components/dashboard/message-panel.vue";

definePageMeta({
  layout: "logged-in",
  middleware: ["01-user-type"],
});

const mockLocations = [
  {
    id: 1,
    name: "Central Clinic",
    favouriteCount: 5,
    complianceStatus: 0,
    shifts: 2,
    selected: false,
  },
  {
    id: 2,
    name: "Westside Medical",
    favouriteCount: 2,
    complianceStatus: 1,
    shifts: 2,
    selected: false,
  },
  {
    id: 3,
    name: "Downtown Health",
    favouriteCount: 0,
    complianceStatus: 0,
    shifts: 2,
    selected: false,
  },
  {
    id: 4,
    name: "Lakeside Practice",
    favouriteCount: 3,
    complianceStatus: 1,
    shifts: 2,
    selected: false,
  },
];

const mockShifts = [
  {
    shiftDetails: {
      id: "shift-001",
      pharmacyName: "Central Clinic",
      pharmacyLocation: "Downtown",
      startTime: "2026-03-03T08:00:00Z",
      endTime: "2026-03-03T16:00:00Z",
      staff: {
        name: "Dr. Jane Mwangi",
        rating: 4.7,
        img: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      shiftStatus: "started", // must be "en-route" | "started" | "completed" | "no-show"
      clockedInTime: "2026-03-03T08:05:00Z",
      clockedOutTime: undefined,
      eta: "5 min",
    },
    timesheet: [
      {
        actionName: "Dispensed Medication",
        actionCode: "DISP001",
        timestamp: "2026-03-03T09:15:00Z",
        description: "Dispensed antibiotics to patient",
        category: "dispensing",
        quantity: 1,
        value: "Amoxicillin",
        notes: "No adverse reaction",
      },
    ],
  },
  {
    shiftDetails: {
      id: "shift-002",
      pharmacyName: "Westside Medical",
      pharmacyLocation: "West End",
      startTime: "2026-03-03T09:00:00Z",
      endTime: "2026-03-03T17:00:00Z",
      staff: {
        name: "Mr. John Otieno",
        rating: 4.3,
        img: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      shiftStatus: "completed",
      clockedInTime: "2026-03-03T09:02:00Z",
      clockedOutTime: "2026-03-03T17:01:00Z",
      eta: undefined,
    },
    timesheet: [
      {
        actionName: "Clinical Service",
        timestamp: "2026-03-03T11:00:00Z",
        description: "Blood pressure check",
        category: "clinical_service",
        quantity: 3,
        notes: "All readings normal",
      },
    ],
  },
  {
    shiftDetails: {
      id: "shift-003",
      pharmacyName: "Lakeside Practice",
      pharmacyLocation: "Lakeview",
      startTime: "2026-03-03T10:00:00Z",
      endTime: "2026-03-03T18:00:00Z",
      staff: {
        name: "Ms. Faith Wanjiru",
        rating: 4.9,
        img: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      shiftStatus: "en-route",
      clockedInTime: undefined,
      clockedOutTime: undefined,
      eta: "15 min",
    },
    timesheet: [
      {
        actionName: "Other",
        timestamp: "2026-03-03T13:00:00Z",
        description: "General admin work",
        category: "other",
        notes: "Filed prescriptions",
      },
    ],
  },
  {
    shiftDetails: {
      id: "shift-004",
      pharmacyName: "Greenfield Pharmacy",
      pharmacyLocation: "Greenfield",
      startTime: "2026-03-03T11:00:00Z",
      endTime: "2026-03-03T19:00:00Z",
      staff: {
        name: "Mr. Peter Kimani",
        rating: 4.2,
        img: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      shiftStatus: "no-show",
      clockedInTime: undefined,
      clockedOutTime: undefined,
      eta: undefined,
    },
    timesheet: [],
  },
] satisfies Shift[];

const mockFavourites: FavouriteLocum[] = [
  {
    name: "Jane Mwangi",
    rating: 4.8,
    availability: "available",
    locumId: "locum-001",
    lastWorked: "2026-03-02T09:00:00Z",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "John Otieno",
    rating: 4.5,
    availability: "busy",
    locumId: "locum-002",
    lastWorked: "2026-02-28T14:00:00Z",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Faith Wanjiru",
    rating: 4.9,
    availability: "available",
    locumId: "locum-003",
    lastWorked: "2026-03-01T11:30:00Z",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Peter Kimani",
    rating: 4.2,
    availability: "unknown",
    locumId: "locum-004",
    lastWorked: "",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Mercy Aloo",
    rating: 4.0,
    availability: "available",
    locumId: "locum-005",
    lastWorked: "",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const mockMessages: Message[] = [
  {
    id: "msg1",
    senderId: "user1",
    recepientId: "user2",
    senderName: "Pharmacy One",
    senderImage: "https://example.com/pharmacy1.png",
    senderType: "pharmacy",
    preview: "Your shift request has been approved.",
    timestamp: "2026-03-05T09:15:00Z",
    unread: true,
    shiftContext: "Shift #1234",
  },
  {
    id: "msg2",
    senderId: "user2",
    recepientId: "user1",
    senderName: "Dr. Locum",
    senderImage: "https://example.com/locum1.png",
    senderType: "locum",
    preview: "Thank you! Looking forward to working.",
    timestamp: "2026-03-05T09:17:00Z",
    unread: false,
  },
  {
    id: "msg3",
    senderId: "user3",
    recepientId: "user1",
    senderName: "Pharmacy Two",
    senderType: "pharmacy",
    preview: "Can you confirm your availability for next week?",
    timestamp: "2026-03-04T16:30:00Z",
    unread: true,
  },
];

const mockMessagingPanelProps: MessagingPanelProps = {
  messages: mockMessages,
  unreadCount: mockMessages.filter((m) => m.unread).length,
  className: "message-panel-mock",
  onViewAll: () => console.log("view all"),
};

const mockDashboardStats: DashboardStats = {
  weeklySpend: 120000,
  lastWeekSpend: 95000,
  averageHourlyRate: 1500,
  avgRatingThisMonth: 4.7,
  repeatBookingRate: 65,
  totalPlacements: 42,
  activeRequests: 7,
  unreadMessages: 3,
  fillRate: 88,
  avgTimeToFill: 2.5,
  shiftsThisWeek: 25,
  shiftsFilled: 22,
};

const mockCoverageAlerts: CoverageAlert[] = [
  {
    id: "1",
    type: "coverage_risk",
    message: "High risk of coverage gap at Pharmacy A",
    severity: "critical",
    locationId: "pharmacyA",
    date: "2026-03-05",
    probability: 80,
  },
  {
    id: "2",
    type: "compliance",
    message: "Compliance document expiring soon for Pharmacy B",
    severity: "warning",
    locationId: "pharmacyB",
    date: "2026-03-10",
  },
  {
    id: "3",
    type: "rate_change",
    message: "Hourly rate increased for Pharmacy C",
    severity: "info",
    locationId: "pharmacyC",
    date: "2026-03-01",
  },
];

const mockInsightsPanelProps: InsightsPanelProps = {
  stats: mockDashboardStats,
  alerts: mockCoverageAlerts,
};
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 md:pb-8">
    <section class="mb-10">
      <div class="flex items-center justify-between mb-6">
        <ClientOnly>
          <DashboardLocationSwitcher :locations="mockLocations" :all="true" />
        </ClientOnly>
      </div>
      <div class="grid grid-cols-4 gap-6">
        <div>
          <p class="text-3xl font-bold text-foreground">3</p>
          <p class="text-sm text-muted-foreground">Open Shifts</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-emerald-500">
            KES {{ 3000 / 1000 }}k
          </p>
          <p class="text-sm text-muted-foreground">Weekly spend</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-foreground">40%</p>
          <p class="text-sm text-muted-foreground">Repeat bookings</p>
        </div>
        <div>
          <div class="flex items-center gap-1">
            <Icon
              name="lucide:star"
              fill="currentColor"
              class="w-5 h-5 text-yellow-500"
            />
            <p class="text-3xl font-bold text-foreground">4.8</p>
          </div>
          <p class="text-sm text-muted-foreground">Avg Rating given</p>
        </div>
      </div>
    </section>
    <UISeparator class="mb-8" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 my-6">
      <div class="lg:col-span-2 space-y-10">
        <section>
          <DashboardApplicationReviewSummary
            :review="{
              type: 'Job',
              count: 20,
              urgency: 'info',
              stats: { averageRating: 4.1, returning: 2 },
            }"
          />
        </section>
        <UISeparator class="mb-8" />
        <section>
          <DashboardApplicationReviewSummary
            :review="{
              type: 'Timesheet',
              count: 2,
              urgency: 'info',
              stats: { totalHours: '41', locations: 4 },
            }"
          />
        </section>
        <UISeparator class="mb-8" />
        <section>
          <ClientOnly>
            <DashboardEntryCard
              id="joblisting-entry"
              header="My posted Jobs"
              subtitle="3 open positions. manage and close listings"
              icon="lucide:briefcase"
            />
          </ClientOnly>
        </section>
        <UISeparator class="mb-8" />
        <section>
          <LazyDashboardLiveShiftTracker :shifts="mockShifts" hydrate-on-idle />
        </section>
        <UISeparator />
        <section>
          <LazyDashboardLocumBookCard
            :favourites="mockFavourites"
            hydrate-on-idle
          />
        </section>
      </div>
      <div class="space-y-10">
        <section>
          <DashboardMessagePanel :data="mockMessagingPanelProps" />
        </section>
        <UISeparator />
        <section>
          <DashboardInsightsPanel :config="mockInsightsPanelProps" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
