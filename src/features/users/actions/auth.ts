"use server";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { z } from "zod"; // recommended for input validation

// Validate the email input
const emailSchema = z.object({
  email: z.string().email(),
});

export async function checkEmailExists(email: string) {
  // Validate the input
  const result = emailSchema.safeParse({ email });

  if (!result.success) {
    return { error: "Invalid email format" };
  }

  const { email: validatedEmail } = result.data;

  try {
    const payload = await getPayloadHMR({ config });
    const users = await payload.count({
      collection: "users",
      where: {
        email: {
          equals: validatedEmail,
        },
      },
    });

    return { exists: users.totalDocs > 0 };
  } catch (error) {
    console.error("Error checking email:", error);
    return { error: "Failed to check email" };
  }
}
