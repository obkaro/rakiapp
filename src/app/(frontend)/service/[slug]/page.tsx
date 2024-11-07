import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Card } from "@/components/ui/card";
import Vendor from "@/components/Vendor";
import { User } from "@/payload-types";
// import { BookingForm } from "@/components/BookingForm";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const payload = await getPayloadHMR({ config: configPromise });
  const service = await payload.find({
    collection: "services",
    where: { slug: { equals: resolvedParams.slug } },
  });

  if (!service) return { title: "Service Not Found" };

  return {
    title: service.docs[0].title,
    description: service.docs[0].summary,
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const payload = await getPayloadHMR({ config: configPromise });
  const services = await payload.find({
    collection: "services",
    where: { slug: { equals: resolvedParams.slug } },
    limit: 1,
  });

  if (!services) notFound();

  const service = services.docs[0];

  const { title, summary, description_html, city, gallery } = service;

  return (
    <div className="mx-auto container space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Service Info Column */}
        <div className="md:col-span-1 space-y-6">
          <h1 className="text-5xl font-bold leading-tight">{title}</h1>
          {/* {city && <p className="text-xl text-muted-foreground">{city}</p>} */}
          <h3 className="text-xl text-muted-foreground">{summary}</h3>
          {service.vendor && <Vendor vendor={service.vendor as User} />}
        </div>

        {/* Gallery Column */}
        <div className="md:col-span-2">
          <PhotoGallery
            photos={gallery
              ?.map(({ image }) =>
                typeof image === "string" ? image : image?.url
              )
              .filter((url): url is string => !!url)}
          />
        </div>
      </div>

      {/* New content section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 md:col-span-2">
          {/* <h2 className="text-2xl font-semibold mb-4">About this service</h2> */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description_html ?? "" }}
          />
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Book this service</h2>
          {/* <BookingForm serviceId={service.id} serviceName={title} /> */}
        </Card>
      </div>
    </div>
  );
}
