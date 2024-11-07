"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoGalleryProps {
  photos?: string[];
}

export function PhotoGallery({ photos = [] }: PhotoGalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const navigatePhoto = (index: number) => {
    setIsTransitioning(true);
    setCurrentPhotoIndex(index);
  };

  if (photos.length === 0) {
    return (
      <div className="grid h-[50vh] items-center justify-center">
        <p className="text-gray-500">No photos available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-1 h-[50vh]">
      <div
        className={`${
          photos.length === 1 ? "col-span-4" : "col-span-3"
        } row-span-2 relative`}
      >
        <Image
          src={
            photos[currentPhotoIndex] ??
            "/placeholder.svg?height=600&width=800&text=No+Photo"
          }
          alt={`Travel experience photo ${currentPhotoIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className={`rounded-3xl transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
        {photos.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/50 hover:bg-white/75"
              onClick={() =>
                navigatePhoto(
                  (currentPhotoIndex - 1 + photos.length) % photos.length
                )
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/50 hover:bg-white/75"
              onClick={() =>
                navigatePhoto((currentPhotoIndex + 1) % photos.length)
              }
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
      {photos.length > 1 &&
        photos.slice(1).map((photo, index) => (
          <div
            key={index + 1}
            className="relative cursor-pointer h-full"
            onClick={() => navigatePhoto(index + 1)}
          >
            <Image
              src={photo}
              alt={`Travel experience photo ${index + 2}`}
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
            <div
              className={`absolute inset-0 bg-black/30 transition-opacity duration-300`}
            />
          </div>
        ))}
    </div>
  );
}
