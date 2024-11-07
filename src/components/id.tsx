"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Utensils,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Id({ params }: { params: { id: string } }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const photos = [
    "/placeholder.svg?height=600&width=800&text=Photo+1",
    "/placeholder.svg?height=300&width=400&text=Photo+2",
    "/placeholder.svg?height=400&width=300&text=Photo+3",
    "/placeholder.svg?height=300&width=400&text=Photo+4",
    "/placeholder.svg?height=400&width=300&text=Photo+5",
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Gallery */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden h-[70vh]">
          <Image
            src={photos[currentPhotoIndex]}
            alt={`Travel experience photo ${currentPhotoIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className={`transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={() =>
              navigatePhoto(
                (currentPhotoIndex - 1 + photos.length) % photos.length
              )
            }
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75"
            onClick={() =>
              navigatePhoto((currentPhotoIndex + 1) % photos.length)
            }
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        {photos.slice(1).map((photo, index) => (
          <div
            key={index + 1}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
              index % 2 === 0 ? "h-[35vh]" : "h-[34vh]"
            }`}
            onClick={() => navigatePhoto(index + 1)}
          >
            <Image
              src={photo}
              alt={`Travel experience photo ${index + 2}`}
              layout="fill"
              objectFit="cover"
            />
            <div
              className={`absolute inset-0 bg-black ${
                currentPhotoIndex === index + 1
                  ? "bg-opacity-50"
                  : "bg-opacity-30"
              } transition-opacity duration-300`}
            />
            {currentPhotoIndex === index + 1 && (
              <div className="absolute inset-0 border-4 border-white rounded-xl" />
            )}
          </div>
        ))}
      </div>

      {/* Experience Title and Basic Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Serene Mountain Retreat</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            4.9 (128 reviews)
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Aspen, Colorado
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About this experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nestled in the heart of the Rocky Mountains, this serene retreat
                offers breathtaking views and a perfect escape from the hustle
                and bustle of city life. Enjoy hiking trails, wildlife watching,
                and cozy evenings by the fireplace. Our modern cabin provides
                all the comforts of home while immersing you in natures beauty.
              </p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 mr-2" /> Free Wi-Fi
                </li>
                <li className="flex items-center">
                  <Coffee className="w-5 h-5 mr-2" /> Coffee maker
                </li>
                <li className="flex items-center">
                  <Utensils className="w-5 h-5 mr-2" /> Fully equipped kitchen
                </li>
                <li className="flex items-center">
                  <Car className="w-5 h-5 mr-2" /> Free parking
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Map"
                  alt="Location map"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((review) => (
                  <div key={review} className="flex space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://i.pravatar.cc/40?img=${review}`}
                        alt={`Reviewer ${review}`}
                      />
                      <AvatarFallback>U{review}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Amazing experience! The views were breathtaking and the
                        cabin was so cozy. Cant wait to come back!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book this experience</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="check-in"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="check-in"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="check-out"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="check-out"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Guests
                  </label>
                  <select
                    id="guests"
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>$599</span>
                </div>
                <Button className="w-full">Book Now</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
