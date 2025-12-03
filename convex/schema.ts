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
 * SCHEMA DEFINITION
 */

export default defineSchema({});
