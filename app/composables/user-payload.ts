import { toast } from "vue-sonner";
import type { IUserPayloadSchema } from "~/utils/types/onboardingPayloads";
import type { StaffUserFormInput } from "~/pages/register/staff.vue";

export const useUserPayload = () => {
  const createUserPayload = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any, // using any -> cannot find type definitions for clerk's UserResource
    formValues: StaffUserFormInput
  ): { payload: IUserPayloadSchema; toastId: string | number } | undefined => {
    if (!user) {
      toast.error("Unauthorised!", {
        description: "Please log in to continue with your registration",
      });
      return;
    }

    const {
      createdAt,
      emailAddresses,
      id,
      primaryEmailAddress,
      primaryPhoneNumber,
      updatedAt,
    } = user;

    const userEmail =
      primaryEmailAddress?.emailAddress ?? emailAddresses[0]?.emailAddress;

    const toastId = toast.loading("Processing data...");

    if (!userEmail) {
      toast.error("Registration failed", {
        id: toastId,
        description:
          "Unable to retrieve email from your account. Please log in and try again",
      });
      return;
    }

    const createUserPayload: IUserPayloadSchema = {
      email: userEmail!,
      userId: id,
      firstName: formValues.fullName.split(" ")[0]!,
      lastName:
        formValues.fullName.split(" ").length > 1
          ? formValues.fullName.split(" ").slice(1).join(" ")
          : formValues.fullName.split(" ")[0]!,
      phoneNumber: primaryPhoneNumber?.phoneNumber ?? undefined,
      clerkCreatedAt: new Date(createdAt!),
      clerkUpdatedAt: new Date(updatedAt!),
    };

    return {
      payload: createUserPayload,
      toastId,
    };
  };

  return { createUserPayload };
};
