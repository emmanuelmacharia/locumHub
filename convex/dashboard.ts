import { v } from "convex/values";
import { api } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { AppErrorData, appError } from "./lib/errors";

type User = Doc<"users">;
type UserProfile = Doc<"userProfiles">;
type Pharmacy = Doc<"pharmacies">;
type PharmacyLocation = Doc<"pharmacyLocations">;
type LocumProfile = Doc<"locumProfiles">;

type PharmaResponse = {
  accountType: "pharmacy";
  pharmacy: Pharmacy;
  locations: PharmacyLocation[] | [];
};

type LocumResponse = {
  accountType: "locum";
  locumProfile: LocumProfile;
};

export type DashboardNavbarInfo = PharmaResponse | LocumResponse | AppErrorData;

export const consolidatedDashboardNavbarInfo = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, { userId }): Promise<DashboardNavbarInfo> => {
    /**
     *
     * we have the userid already; so we need to get:
     *  - fetch userProfile by userId  x get the accounttype
     *  - if it's a pharmacy, fetch pharmacy and pharmacy locations
     *  - if it's a locum, fetch locum profile
     *  - if it's neither, return null
     *
     * we want to avoid multiple round trips from the client to fetch this information separately, and since this is a critical path for rendering the dashboard navbar, we want to optimize for that
     *
     */
    if (!userId) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "User ID is required",
      });
    }

    const profile = await ctx.runQuery(
      api.users.userProfile.getUserProfileByUserId,
      { userId },
    );

    if (!profile?._id) {
      return appError({
        code: "NOT_FOUND",
        statusCode: 404,
        statusMessage: "User profile not found",
      });
    }

    if (profile.accountType === "pharmacy") {
      const pharmacyData = await ctx.runQuery(
        api.pharmacies.pharmacy.getPharmacyAndPharmacyLocations,
        { pharmacyId: profile.pharmacyMemberId! },
      );

      if (!pharmacyData?.pharmacy) {
        return appError({
          code: "NOT_FOUND",
          statusCode: 404,
          statusMessage: "Pharmacy not found for user",
        });
      }
      return {
        accountType: "pharmacy" as const,
        pharmacy: pharmacyData?.pharmacy,
        locations: pharmacyData?.locations || [],
      };
    }

    if (profile.accountType === "locum") {
      const locumData = await ctx.runQuery(
        api.locum.staff.fetchLocumStaffByUserId,
        { userId },
      );
      return {
        accountType: "locum",
        locumProfile: locumData as LocumProfile,
      };
    }
    return appError({
      code: "INVALID_ACCOUNT_TYPE",
      statusCode: 400,
      statusMessage: "Invalid account type",
    });
  },
});
