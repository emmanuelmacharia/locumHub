import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * SHARED ENUMS AND TYPES
 */
const verificationStatus = v.union(
  v.literal("pending"),
  v.literal("verified"),
  v.literal("rejected"),
  v.literal("needs_review"),
  v.literal("expired")
);

const documentTypes = v.union(
  v.literal("license_certificate"),
  v.literal("id_document"),
  v.literal("proof_of_address"),
  v.literal("qualification"),
  v.literal("pharmacy_license"),
  v.literal("right_to_work")
);

const dayOfWeek = v.union(
  v.literal("monday"),
  v.literal("tuesday"),
  v.literal("wednesday"),
  v.literal("thursday"),
  v.literal("friday"),
  v.literal("saturday"),
  v.literal("sunday")
);

const operatingHours = v.object({
  open: v.string(),
  close: v.string(),
  closed: v.boolean(),
});

const paymentMethodType = v.union(
  v.literal("bank_transfer"), // BACS, Faster Payments
  v.literal("paypal"),
  v.literal("wise"),
  v.literal("revolut_business"),
  v.literal("stripe_connect"), // If used later
  v.literal("cheque"),
  v.literal("mpesa") // default for Kenya
);

const paymentFrequency = v.union(
  v.literal("per_shift"),
  v.literal("weekly"),
  v.literal("biweekly"),
  v.literal("monthly")
);

const notificationType = v.union(
  v.literal("shift_invite"),
  v.literal("shift_cancelled"),
  v.literal("shift_reminder"),
  v.literal("shift_started"),
  v.literal("shift_completed"),
  v.literal("application_received"),
  v.literal("application_accepted"),
  v.literal("application_rejected"),
  v.literal("application_withdrawn"),
  v.literal("payment_pending"),
  v.literal("payment_sent"),
  v.literal("payment_failed"),
  v.literal("review_received"),
  v.literal("review_response"),
  v.literal("document_expiring"),
  v.literal("document_verified"),
  v.literal("document_rejected"),
  v.literal("message_received"),
  v.literal("subscription_expiring"),
  v.literal("subscription_expired")
);

const notificationChannel = v.union(
  v.literal("email"),
  v.literal("sms"),
  v.literal("in_app")
);

const auditAction = v.union(
  // for audit logs- tracks key actions taken in the system
  v.literal("user_created"),
  v.literal("user_updated"),
  v.literal("user_deactivated"),
  v.literal("document_uploaded"),
  v.literal("document_verified"),
  v.literal("document_rejected"),
  v.literal("document_expired"),
  v.literal("shift_created"),
  v.literal("shift_assigned"),
  v.literal("shift_cancelled"),
  v.literal("shift_completed"),
  v.literal("shift_disputed"),
  v.literal("payment_processed"),
  v.literal("payment_failed"),
  v.literal("payment_refunded"),
  v.literal("review_submitted"),
  v.literal("block_created"),
  v.literal("block_removed")
);

/**
 * APPLICATION TABLE
 */

const applicationTables = {
  /**
   * User Tables
   */
  users: defineTable({
    userid: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    // isPlatformAdmin: v.boolean()
  })
    .index("by_email", ["email"])
    .index("by_user_id", ["userid"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    identityVerifiedAt: v.optional(v.number()),
    identityVerifiedBy: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_id", ["userId"]),

  userNotificationPreferences: defineTable({
    userId: v.id("users"),
    channel: notificationChannel,
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_id", ["userId"]),

  /**
   * Documents Table
   */
  documents: defineTable({
    userId: v.id("users"),

    context: v.union(
      v.literal("personal"),
      v.literal("locum_professional"),
      v.literal("pharmacy")
    ),
    pharmacyId: v.optional(v.id("pharmacies")),

    type: documentTypes,

    storageId: v.string(),
    fileName: v.string(),
    mimeType: v.string(),
    fileSize: v.number(),

    documentNumber: v.optional(v.string()),
    issuedDate: v.optional(v.string()),
    expiryDate: v.optional(v.string()),

    status: verificationStatus,
    rejectionReason: v.optional(v.string()),
    verifiedBy: v.optional(v.id("users")),
    verifiedAt: v.optional(v.number()),

    uploadedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_context", ["userId", "context"])
    .index("by_user_type", ["userId", "type"])
    .index("by_pharmacy", ["pharmacyId", "type"])
    .index("by_status", ["status"])
    .index("by_expiry", ["expiryDate", "status"]),

  /**
   * Pharmacy table
   */

  pharmacies: defineTable({
    businessName: v.string(),
    tradingName: v.optional(v.string()),
    licenseNumber: v.string(),
    companyNumber: v.optional(v.string()),
    logoImageId: v.optional(v.string()),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    contactEmail: v.string(),
    contactPhone: v.string(),
    emergencyPhone: v.optional(v.string()),
    primaryLocationId: v.optional(v.id("pharmacyLocations")),
    ratingSum: v.number(),
    ratingCount: v.number(),
    isActive: v.boolean(),
    isChain: v.boolean(),
    deactivatedAt: v.optional(v.number()),
    deactivationReason: v.optional(v.string()),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_active", ["isActive"])
    .index("by_chain", ["isChain", "isActive"])
    .index("by_license", ["licenseNumber"]),

  pharmacyLocations: defineTable({
    pharmacyId: v.id("pharmacies"),

    locationName: v.string(),
    locationCode: v.optional(v.string()),

    addressLine1: v.string(),
    addressLine2: v.optional(v.string()),
    city: v.string(),
    county: v.optional(v.string()),
    postcode: v.string(),
    country: v.string(),

    latitude: v.number(),
    longitude: v.number(),
    timezone: v.string(),

    locationPhone: v.optional(v.string()),
    locationEmail: v.optional(v.string()),

    operatingHours: v.object({
      mon: operatingHours,
      tue: operatingHours,
      wed: operatingHours,
      thu: operatingHours,
      fri: operatingHours,
      sat: operatingHours,
      sun: operatingHours,
    }),

    services: v.array(v.string()),
    parkingAvailable: v.boolean(),
    wheelchairAccessible: v.boolean(),

    isActive: v.boolean(),
    isPrimary: v.boolean(),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_pharmacy", ["pharmacyId", "isActive"])
    .index("by_pharmacy_primary", ["pharmacyId", "isPrimary"])
    .index("by_city", ["city", "isActive"])
    .index("by_county", ["county", "isActive"])
    .index("by_postcode", ["postcode"])
    .index("by_active", ["isActive"]),

  pharmacyGridCells: defineTable({
    pharmacyId: v.id("pharmacies"),
    locationId: v.id("pharmacyLocations"),
    gridCell: v.string(),
    createdAt: v.number(),
  })
    .index("by_cell", ["gridCell"])
    .index("by_pharmacy", ["pharmacyId"])
    .index("by_location", ["locationId"]),

  /**
   * Roles and permissions
   */

  pharmacyMembers: defineTable({
    pharmacyId: v.id("pharmacies"),
    userId: v.id("users"),

    role: v.union(
      v.literal("owner"),
      v.literal("superintendent"),
      v.literal("manager"),
      v.literal("pharmacist"),
      v.literal("technician"),
      v.literal("dispenser"),
      v.literal("admin_staff")
    ),

    permissions: v.object({
      canPostShifts: v.boolean(),
      canAssignShifts: v.boolean(),
      canApproveTimesheets: v.boolean(),
      canManageMembers: v.boolean(),
      canViewFinancials: v.boolean(),
      canEditPharmacyProfile: v.boolean(),
    }),

    employmentType: v.union(
      v.literal("permanent"),
      v.literal("part_time"),
      v.literal("contractor"),
      v.literal("locum_regular")
    ),

    jobTitle: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),

    isActive: v.boolean(),
    isPrimary: v.boolean(),
    invitedBy: v.optional(v.id("users")),
    invitedAt: v.optional(v.number()),
    acceptedAt: v.optional(v.number()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_pharmacy", ["pharmacyId", "isActive"])
    .index("by_user", ["userId", "isActive"])
    .index("by_pharmacy_user", ["pharmacyId", "userId"])
    .index("by_user_primary", ["userId", "isPrimary"])
    .index("by_role", ["pharmacyId", "role", "isActive"]),

  /**
   * Locum tables
   */
  locumProfiles: defineTable({
    userId: v.id("users"),

    registrationNumber: v.string(),
    registrationBody: v.string(),
    yearsOfExperience: v.number(),
    qualifications: v.array(v.string()),
    specializations: v.array(v.string()),

    profileImageId: v.optional(v.string()),
    bio: v.optional(v.string()),
    headline: v.optional(v.string()),

    contactEmail: v.string(),
    contactPhone: v.string(),

    addressLine1: v.string(),
    addressLine2: v.optional(v.string()),
    city: v.string(),
    county: v.optional(v.string()),
    postcode: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    travelRadiusKm: v.number(),

    baseHourlyRate: v.number(),
    minimumShiftHours: v.number(),
    emergencyRateMultiplier: v.number(),

    isOnline: v.boolean(),
    lastOnlineAt: v.optional(v.number()),

    ratingSum: v.number(),
    ratingCount: v.number(),

    totalShiftsCompleted: v.number(),
    totalHoursWorked: v.number(),

    isVerified: v.boolean(),
    verifiedAt: v.optional(v.number()),
    verifiedBy: v.optional(v.id("users")),

    isActive: v.boolean(),
    deactivatedAt: v.optional(v.number()),
    deactivationReason: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user_id", ["userId"])
    .index("by_online_city", ["isOnline", "city"])
    .index("by_city_active", ["city", "isActive"])
    .index("by_county_active", ["county", "isActive"])
    .index("by_postcode", ["postcode"])
    .index("by_contact_email", ["contactEmail"])
    .index("by_contact_phone", ["contactPhone"])
    .index("by_verified_active", ["isVerified", "isActive"]),

  availabilityPatterns: defineTable({
    locumId: v.id("locumProfiles"),
    dayOfWeek: dayOfWeek,
    startTime: v.string(),
    endTime: v.string(),
    isAvailable: v.boolean(),
  })
    .index("by_locum", ["locumId"])
    .index("by_locum_day", ["locumId", "dayOfWeek"]),

  calendarExceptions: defineTable({
    locumId: v.id("locumProfiles"),
    date: v.string(),
    type: v.union(v.literal("available"), v.literal("unavailable")),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    reason: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_locum", ["locumId"])
    .index("by_locum_date", ["locumId", "date"]),

  locumGridCells: defineTable({
    locumId: v.id("locumProfiles"),
    gridCell: v.string(),
    createdAt: v.number(),
  })
    .index("by_cell", ["gridCell"])
    .index("by_locum", ["locumId"]),

  /**
   * HR and relationships
   */
  pharmacyFavorites: defineTable({
    pharmacyId: v.id("pharmacies"),
    locumId: v.id("locumProfiles"),
    notes: v.optional(v.string()),
    tags: v.array(v.string()),
    addedBy: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_pharmacy", ["pharmacyId"])
    .index("by_locum", ["locumId"])
    .index("by_pair", ["pharmacyId", "locumId"]),

  // Block list (both directions) - blocks users and pharmacies from interacting
  userBlocks: defineTable({
    blockerId: v.id("users"),
    blockedId: v.id("users"),
    blockerType: v.union(v.literal("pharmacy"), v.literal("locum")), // if pharmacy, the blocker is the pharmacy associated with the user, blocking the locum; and vice versa
    reason: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_blocker", ["blockerId"])
    .index("by_blocked", ["blockedId"])
    .index("by_pair", ["blockerId", "blockedId"]),

  /**
   * Shift management
   */
  shiftRequests: defineTable({
    pharmacyId: v.id("pharmacies"),
    pharmacyLocationId: v.id("pharmacyLocations"),

    // Denormalized for read performance
    pharmacyName: v.string(),
    locationName: v.string(),
    locationCity: v.string(),
    locationPostcode: v.string(),
    locationLat: v.number(),
    locationLng: v.number(),

    // Timing
    date: v.string(), // YYYY-MM-DD
    startTime: v.string(),
    endTime: v.string(),
    breakDurationMinutes: v.number(),
    totalScheduledMinutes: v.number(),

    // Requirements
    requirements: v.optional(v.string()),
    requiredSpecializations: v.array(v.string()),
    urgency: v.union(
      v.literal("standard"),
      v.literal("urgent"),
      v.literal("emergency")
    ),

    // Financials
    hourlyRate: v.number(),
    totalEstimatedPay: v.number(),
    currency: v.string(),

    // Booking Type
    postingType: v.union(
      v.literal("broadcast"),
      v.literal("direct_offer"),
      v.literal("recurring")
    ),
    targetLocumId: v.optional(v.id("locumProfiles")),
    recurringTemplateId: v.optional(v.id("recurringShiftTemplates")),

    // Assignment
    assignedLocumId: v.optional(v.id("locumProfiles")),
    assignedLocumName: v.optional(v.string()),
    assignedAt: v.optional(v.number()),
    confirmedAt: v.optional(v.number()),

    // Status
    status: v.union(
      v.literal("draft"),
      v.literal("open"),
      v.literal("offered"),
      v.literal("filled"),
      v.literal("confirmed"),
      v.literal("in_progress"),
      v.literal("pending_completion"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("disputed"),
      v.literal("no_show")
    ),

    // Actual Times (clock in/out)
    clockInTime: v.optional(v.number()),
    clockInLat: v.optional(v.number()),
    clockInLng: v.optional(v.number()),
    clockOutTime: v.optional(v.number()),
    clockOutLat: v.optional(v.number()),
    clockOutLng: v.optional(v.number()),
    actualMinutesWorked: v.optional(v.number()),

    // Cancellation
    cancelledAt: v.optional(v.number()),
    cancelledBy: v.optional(v.id("users")),
    cancellationReason: v.optional(v.string()),
    cancellationType: v.optional(
      v.union(
        v.literal("pharmacy_cancelled"),
        v.literal("locum_cancelled"),
        v.literal("system_cancelled")
      )
    ),

    // Application Stats (denormalized)
    applicationCount: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_pharmacy", ["pharmacyId", "status"])
    .index("by_pharmacy_location", ["pharmacyLocationId", "date"])
    .index("by_status_date", ["status", "date"])
    .index("by_date", ["date"])
    .index("by_assigned_locum", ["assignedLocumId", "status"])
    .index("by_target_locum", ["targetLocumId", "status"])
    .index("by_city_status_date", ["locationCity", "status", "date"])
    .index("by_urgency_date", ["urgency", "status", "date"]),

  shiftApplications: defineTable({
    shiftRequestId: v.id("shiftRequests"),
    locumId: v.id("locumProfiles"),
    // Denormalized
    locumName: v.string(),
    locumRating: v.number(),

    // Application Details
    proposedRate: v.optional(v.number()),
    message: v.optional(v.string()),

    // Status
    status: v.union(
      v.literal("pending"),
      v.literal("viewed"),
      v.literal("shortlisted"),
      v.literal("accepted"),
      v.literal("rejected"),
      v.literal("withdrawn"),
      v.literal("expired")
    ),

    // Tracking
    viewedAt: v.optional(v.number()),
    respondedAt: v.optional(v.number()),
    responseMessage: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_shift", ["shiftRequestId", "status"])
    .index("by_locum", ["locumId", "status"])
    .index("by_locum_shift", ["locumId", "shiftRequestId"]),

  recurringShiftTemplates: defineTable({
    pharmacyId: v.id("pharmacies"),
    pharmacyLocationId: v.id("pharmacyLocations"),

    templateName: v.string(),

    // Pattern
    dayOfWeek: dayOfWeek,
    startTime: v.string(),
    endTime: v.string(),
    breakDurationMinutes: v.number(),

    // Details
    hourlyRate: v.number(),
    requirements: v.optional(v.string()),
    requiredSpecializations: v.array(v.string()),

    // Auto-posting
    autoPost: v.boolean(),
    autoPostDaysAhead: v.number(),
    preferredLocumId: v.optional(v.id("locumProfiles")),
    postingType: v.union(v.literal("broadcast"), v.literal("direct_offer")),

    isActive: v.boolean(),
    lastGeneratedDate: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_pharmacy", ["pharmacyId"])
    .index("by_active", ["isActive", "autoPost"]),

  /**
   * Shift tracing and reporting
   */
  shiftActivities: defineTable({
    shiftRequestId: v.id("shiftRequests"),
    locumId: v.id("locumProfiles"),
    pharmacyId: v.id("pharmacies"),

    category: v.union(
      v.literal("clinical_service"),
      v.literal("dispensing"),
      v.literal("consultation"),
      v.literal("operational"),
      v.literal("incident"),
      v.literal("break"),
      v.literal("other")
    ),

    actionCode: v.string(),
    actionName: v.string(),

    // Metrics
    quantity: v.optional(v.number()),
    value: v.optional(v.string()),
    durationMinutes: v.optional(v.number()),

    notes: v.optional(v.string()),

    // Evidence
    attachmentIds: v.array(v.string()),

    // For incidents
    severity: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
    incidentReported: v.optional(v.boolean()),

    loggedAt: v.number(),
  })
    .index("by_shift", ["shiftRequestId", "loggedAt"])
    .index("by_pharmacy_category", ["pharmacyId", "category"])
    .index("by_locum", ["locumId", "loggedAt"])
    .index("by_incident", ["category", "severity"]),
  shiftReports: defineTable({
    shiftRequestId: v.id("shiftRequests"),
    locumId: v.id("locumProfiles"),
    pharmacyId: v.id("pharmacies"),

    // Summary Stats
    totalScriptsDispensed: v.number(),
    totalServicesProvided: v.number(),
    totalIncidents: v.number(),

    // Checklist
    checklistCompleted: v.object({
      safeCustodyChecked: v.boolean(),
      controlledDrugsBalanced: v.boolean(),
      fridgeTempsRecorded: v.boolean(),
      expiryDatesChecked: v.boolean(),
      cleaningCompleted: v.boolean(),
      securityActivated: v.boolean(),
    }),

    // Handover
    handoverNotes: v.string(),
    issuesForFollowUp: v.optional(v.string()),
    lowStockItems: v.optional(v.string()),

    // Status & Acknowledgment
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("acknowledged"),
      v.literal("disputed"),
      v.literal("resolved")
    ),

    submittedAt: v.optional(v.number()),
    acknowledgedAt: v.optional(v.number()),
    acknowledgedBy: v.optional(v.id("users")),

    // Dispute
    disputeReason: v.optional(v.string()),
    disputedAt: v.optional(v.number()),
    disputeResolvedAt: v.optional(v.number()),
    disputeResolution: v.optional(v.string()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_shift", ["shiftRequestId"])
    .index("by_locum", ["locumId"])
    .index("by_pharmacy", ["pharmacyId", "status"])
    .index("by_status", ["status"]),

  /**
   * Payments and Billing
   */
  locumPaymentPreferences: defineTable({
    locumId: v.id("locumStaff"),

    // Preferred method
    preferredMethod: paymentMethodType,
    preferredFrequency: paymentFrequency,

    // Bank details reference (actual data in secure vault) - not right now
    // bankDetailsRef: v.optional(v.string()),
    alternativeMethods: v.array(paymentMethodType),
    isVerified: v.boolean(),
    verifiedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_locum", ["locumId"]),

  invoices: defineTable({
    invoiceNumber: v.string(),
    shiftRequestId: v.id("shiftRequests"),
    pharmacyId: v.id("pharmacies"),
    locumId: v.id("locumProfiles"),

    hoursWorked: v.number(),
    hourlyRate: v.number(),
    currency: v.string(),

    grossAmount: v.number(),
    platformFeePercent: v.number(),
    platformFeeAmount: v.number(),
    locumEarnings: v.number(),
    taxAmount: v.number(),
    totalCharged: v.number(),

    paymentMethod: v.optional(paymentMethodType),

    externalPaymentRef: v.optional(v.string()),
    externalPayoutRef: v.optional(v.string()),

    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("processing"),
      v.literal("paid"),
      v.literal("transferred"),
      v.literal("failed"),
      v.literal("refunded"),
      v.literal("partially_refunded"),
      v.literal("disputed")
    ),

    issuedAt: v.number(),
    dueDate: v.number(),
    paidAt: v.optional(v.number()),
    transferredAt: v.optional(v.number()),

    refundAmount: v.optional(v.number()),
    refundReason: v.optional(v.string()),
    refundedAt: v.optional(v.number()),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_invoice_number", ["invoiceNumber"])
    .index("by_pharmacy", ["pharmacyId", "status"])
    .index("by_locum", ["locumId", "status"])
    .index("by_shift", ["shiftRequestId"])
    .index("by_status", ["status", "dueDate"]),

  /**
   * Reviews and ratings
   */
  reviews: defineTable({
    shiftRequestId: v.id("shiftRequests"),

    authorId: v.id("users"),
    subjectId: v.id("users"),

    // What's being reviewed
    subjectType: v.union(v.literal("pharmacy"), v.literal("locum")),

    overallRating: v.number(),

    detailedRatings: v.optional(
      v.object({
        punctuality: v.optional(v.number()),
        professionalism: v.optional(v.number()),
        communication: v.optional(v.number()),
        clinicalSkills: v.optional(v.number()),
        workEnvironment: v.optional(v.number()),
      })
    ),

    comment: v.optional(v.string()),
    isPublic: v.boolean(),

    response: v.optional(v.string()),
    respondedAt: v.optional(v.number()),

    isHidden: v.boolean(),
    hiddenReason: v.optional(v.string()),

    helpfulCount: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_subject", ["subjectId", "isPublic"])
    .index("by_subject_type", ["subjectType", "isPublic"])
    .index("by_author", ["authorId"])
    .index("by_shift", ["shiftRequestId"])
    .index("by_shift_author", ["shiftRequestId", "authorId"]),

  reviewVotes: defineTable({
    // vote as to whether a review was helpful
    reviewId: v.id("reviews"),
    voterId: v.id("users"),
    isHelpful: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_review", ["reviewId"])
    .index("by_voter_review", ["voterId", "reviewId"]),

  /**
   * Messaging
   */

  conversations: defineTable({
    participantIds: v.array(v.id("users")),
    shiftRequestId: v.optional(v.id("shiftRequests")),

    lastMessageAt: v.number(),
    lastMessagePreview: v.string(),

    createdAt: v.number(),
  })
    .index("by_participants", ["participantIds"])
    .index("by_shift", ["shiftRequestId"]),

  conversationParticipants: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    joinedAt: v.number(),
    lastReadAt: v.optional(v.number()),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    shiftRequestId: v.optional(v.id("shiftRequests")),

    senderId: v.id("users"),
    receiverId: v.id("users"),

    messageType: v.union(
      v.literal("text"),
      v.literal("system"),
      v.literal("file"),
      v.literal("shift_invite"),
      v.literal("shift_update")
    ),

    content: v.string(),
    attachmentId: v.optional(v.string()),
    attachmentName: v.optional(v.string()),

    metadata: v.optional(v.string()),

    isRead: v.boolean(),
    readAt: v.optional(v.number()),

    isDeleted: v.boolean(),
    deletedAt: v.optional(v.number()),

    createdAt: v.number(),
  })
    .index("by_conversation", ["conversationId", "createdAt"])
    .index("by_receiver_unread", ["receiverId", "isRead"])
    .index("by_shift", ["shiftRequestId", "createdAt"]),

  notifications: defineTable({
    userId: v.id("users"),

    type: notificationType,
    title: v.string(),
    body: v.string(),

    resourceType: v.optional(v.string()),
    resourceId: v.optional(v.string()),

    channels: v.object({
      inApp: v.boolean(),
      email: v.boolean(),
      sms: v.boolean(),
      push: v.boolean(),
    }),

    emailSentAt: v.optional(v.number()),
    smsSentAt: v.optional(v.number()),
    pushSentAt: v.optional(v.number()),

    isRead: v.boolean(),
    readAt: v.optional(v.number()),

    createdAt: v.number(),
  })
    .index("by_user", ["userId", "createdAt"])
    .index("by_user_unread", ["userId", "isRead"])
    .index("by_type", ["type", "createdAt"]),

  /**
   * Audit and compliance
   */
  auditLogs: defineTable({
    userId: v.optional(v.id("users")),
    userType: v.optional(
      v.union(
        v.literal("pharmacy_member"),
        v.literal("locum"),
        v.literal("platform_admin"),
        v.literal("system")
      )
    ),

    action: auditAction,
    targetType: v.string(),
    targetId: v.string(),

    description: v.string(),
    previousValue: v.optional(v.string()),
    newValue: v.optional(v.string()),
    metadata: v.optional(v.string()),

    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),

    createdAt: v.number(),
  })
    .index("by_user", ["userId", "createdAt"])
    .index("by_target", ["targetType", "targetId"])
    .index("by_action", ["action", "createdAt"])
    .index("by_date", ["createdAt"]),

  /**
   * System and configs
   */
  systemConfig: defineTable({
    key: v.string(),
    value: v.string(),
    description: v.string(),
    updatedBy: v.optional(v.id("users")),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  serviceAreas: defineTable({
    name: v.string(),
    cities: v.array(v.string()),
    postcodePatterns: v.array(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_active", ["isActive"]),
};

export default defineSchema({ ...applicationTables });
