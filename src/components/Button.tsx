import { Button as ShadcnButton } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utilities";

export function Button({ className, ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={cn("rounded-full py-6 px-8", className)}
      {...props}
    />
  );
}
