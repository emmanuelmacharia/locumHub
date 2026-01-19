/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as lib_errors from "../lib/errors.js";
import type * as locum_staff from "../locum/staff.js";
import type * as pharmacies_pharmacy from "../pharmacies/pharmacy.js";
import type * as pharmacies_pharmacyLocations from "../pharmacies/pharmacyLocations.js";
import type * as users_user from "../users/user.js";
import type * as users_userProfile from "../users/userProfile.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "lib/errors": typeof lib_errors;
  "locum/staff": typeof locum_staff;
  "pharmacies/pharmacy": typeof pharmacies_pharmacy;
  "pharmacies/pharmacyLocations": typeof pharmacies_pharmacyLocations;
  "users/user": typeof users_user;
  "users/userProfile": typeof users_userProfile;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
