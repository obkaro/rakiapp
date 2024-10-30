import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { City } from "@/payload-types";

interface SelectLocationProps {
  locations: City[];
}

export function SelectLocation({ locations }: SelectLocationProps) {
  const [selectedLocation, setSelectedLocation] = React.useState<
    string | undefined
  >();
  const router = useRouter();

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  const handleSearch = () => {
    if (selectedLocation) {
      router.push(`/find-services/${selectedLocation}`);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={handleLocationChange}>
        <SelectTrigger className="w-[320px]">
          <SelectValue placeholder="Select your destination" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.slug ?? ""}>
                {location["display name"]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch} disabled={!selectedLocation}>
        Go
      </Button>
    </div>
  );
}
