"use client";
import { cn } from "@/lib/utilities/cn";
import useClickableCard from "@/lib/utilities/useClickableCard";
import Link from "next/link";
import React, { Fragment } from "react";

import type { Service } from "@/payload-types";

import { Media } from "@/components/Media";

export const Card: React.FC<{
  alignItems?: "center";
  className?: string;
  doc: Service;
  relationTo?: "services";
  showCategories?: boolean;
  title?: string;
}> = (props) => {
  const { card, link } = useClickableCard({});
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props;
  const { categories, title } = doc || {};
  const summary = doc.summary;
  const metaImage = doc.gallery?.[0]?.image;
  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedSummary = summary?.replace(/\s/g, " "); // replace non-breaking space with white space
  const href = `/${relationTo}/${doc.slug}`; // Use a stable identifier like 'slug' instead of 'metaImage'

  return (
    <article
      className={cn(
        "border border-border rounded-3xl overflow-hidden bg-card hover:cursor-pointer",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:scale-105",
        className
      )}
      ref={card.ref}
    >
      <div className="relative w-full overflow-hidden">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== "string" && (
          <Media
            resource={metaImage}
            size="360px"
            className="w-full transition-transform duration-300 ease-in-out hover:scale-110"
          />
        )}
      </div>
      <div className="p-6 sm:p-8">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === "object") {
                    const { title: titleFromCategory } = category;

                    const categoryTitle =
                      titleFromCategory || "Untitled category";

                    const isLast = index === categories.length - 1;

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {summary && (
          <div className="mt-2">{summary && <p>{sanitizedSummary}</p>}</div>
        )}
      </div>
    </article>
  );
};
