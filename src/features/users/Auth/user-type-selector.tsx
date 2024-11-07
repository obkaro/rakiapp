"use client";

import { Luggage, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserTypeSelectorProps {
  userType: "traveler" | "vendor";
  onUserTypeChange: (type: "traveler" | "vendor") => void;
}

export default function UserTypeSelector({
  userType,
  onUserTypeChange,
}: UserTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Button
          variant={userType === "traveler" ? "default" : "ghost"}
          className={`group h-auto py-4 px-3 flex flex-col items-center gap-2 whitespace-normal w-full transition-all duration-200 hover:scale-[1.02] ${
            userType === "traveler"
              ? "ring-2 ring-primary scale-[1.02]"
              : "hover:bg-accent/50"
          }`}
          type="button"
          onClick={() => onUserTypeChange("traveler")}
        >
          <Luggage className="h-10 w-10 mb-1" />
          <div className="space-y-1 text-center">
            <h3 className="text-lg font-semibold">Traveler</h3>
            <p className="text-sm text-muted-foreground">
              Explore and book unique services in Africa.
            </p>
          </div>
        </Button>

        <Button
          variant={userType === "vendor" ? "default" : "ghost"}
          className={`group h-auto py-4 px-3 flex flex-col items-center gap-2 whitespace-normal w-full transition-all duration-200 hover:scale-[1.02] ${
            userType === "vendor"
              ? "ring-2 ring-primary scale-[1.02]"
              : "hover:bg-accent/50"
          }`}
          type="button"
          onClick={() => onUserTypeChange("vendor")}
        >
          <Store className="h-10 w-10 mb-1" />
          <div className="space-y-1 text-center">
            <h3 className="text-lg font-semibold">Get Listed</h3>
            <p className="text-sm text-muted-foreground">
              Own a kiosk and showcase your services to travelers.
            </p>
          </div>
        </Button>
      </div>

      {/* {userType && (
        <p className="text-sm text-muted-foreground text-center mt-2">
          You&apos;ve selected:{" "}
          <span className="font-semibold capitalize">{userType}</span>
        </p>
      )} */}
    </div>
  );
}
