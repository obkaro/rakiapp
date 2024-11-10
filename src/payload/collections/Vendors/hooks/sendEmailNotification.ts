import type { CollectionAfterChangeHook } from "payload";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

export const sendEmailNotification: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === "create") {
    const payload = await getPayloadHMR({ config });
    const email = await payload.find({
      collection: "emails",
      where: {
        slug: {
          equals: "new-vendor-application",
        },
      },
    });
    if (email) {
      await payload.sendEmail({
        to: "obkaro@gmail.com",
        subject: email.docs[0].title,
        html: email.docs[0].body_html,
      });
    }
  }
  return doc;
};
