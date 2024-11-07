import { User } from "@/payload-types";
import { Service } from "@/payload-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VendorProps {
  vendor: User;
}

const Vendor = ({ vendor }: VendorProps) => {
  return (
    <div className="flex flex-col gap-1 py-2">
      <span className="text-xs text-muted-foreground">Provided by</span>
      <div className="flex items-center gap-3 py-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              typeof vendor.image === "string"
                ? vendor.image
                : vendor.image?.url ?? undefined
            }
            alt={`${vendor.name}'s profile picture`}
          />
          <AvatarFallback>
            {vendor.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{vendor.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
