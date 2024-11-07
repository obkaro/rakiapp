"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import AuthFormComponent from "./AuthForm";
import { X } from "lucide-react";

import { Button } from "@/components/Button";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Open authentication dialog">Sign In</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] p-0"
        aria-describedby="auth-dialog-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle aria-label="Authentication options">
            Sign In / Sign Up
          </DialogTitle>
          <DialogDescription id="auth-dialog-description">
            Sign in to your account or create a new one to access all features
          </DialogDescription>
        </DialogHeader>
        <AuthFormComponent onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
