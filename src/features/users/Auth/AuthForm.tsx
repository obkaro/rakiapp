"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import UserTypeSelector from "./user-type-selector";

import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
  PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { useAuth } from "@/lib/providers/Auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { checkEmailExists } from "../actions/auth";

type FormData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

// Add validation schema
const loginSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export default function AuthFormComponent({
  onClose,
}: {
  onClose: () => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = useRef(searchParams.get("redirect"));

  const { login, create } = useAuth();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(true);
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [createdFirstName, setCreatedFirstName] = useState("");

  // const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [userType, setUserType] = useState<"traveler" | "vendor">("traveler");
  const [isUserTypeLoading, setIsUserTypeLoading] = useState(false);
  // Update form initialization
  const form = useForm<z.infer<typeof loginSchema | typeof registerSchema>>({
    resolver: zodResolver(isExistingUser ? loginSchema : registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const handleEmailSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsEmailLoading(true);
  //   try {
  //     const exists = await checkEmailExists(email);
  //     setIsExistingUser(exists.exists ?? false);
  //     setStep(2);
  //   } catch (error) {
  //     setError("Error checking email");
  //   } finally {
  //     setIsEmailLoading(false);
  //   }
  // };

  const handleUserTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        if (isExistingUser) {
          // Existing user: Sign in
          await login({ email: email, password: data.password });
          toast.success("Signed in successfully!");
          onClose();
        } else {
          // New user: Create account
          await create({
            email: email,
            password: data.password,
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            isVendor: false,
            isTraveler: true,
          }).then(() => {
            login({ email: email, password: data.password });
          });
          setCreatedFirstName(data.firstName || "");
          setStep(3);
        }
      } catch (_) {
        toast.error("An error occured. Please try again.");
      }
    },
    [login, create, onClose, isExistingUser, email]
  );

  const handleVerifyEmail = () => {
    alert("Verification email sent!");
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, onClose]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-none shadow-none w-full px-2 sm:px-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center ">
              Welcome
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1
                ? "How will you use Raki today?"
                : step === 2
                ? isExistingUser
                  ? "Welcome back!"
                  : "Create your account"
                : "Congratulations!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
            {step === 1 && (
              <form onSubmit={handleUserTypeSubmit}>
                <div className="space-y-16 max-w-2xl mx-auto my-8">
                  <UserTypeSelector
                    userType={userType}
                    onUserTypeChange={setUserType}
                  />
                  <div className="mt-6">
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isUserTypeLoading}
                    >
                      {isUserTypeLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="mr-2 h-4 w-4" />
                      )}
                      Continue
                    </Button>
                  </div>
                </div>
              </form>
            )}
            {step === 2 && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {!isExistingUser && (
                    <>
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Create a password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm your password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                    </>
                  )}
                  {isExistingUser && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button
                    className="w-full mt-6"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isExistingUser ? "Sign In" : "Create Account"}
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full mt-2"
                    onClick={() => setStep(1)}
                    type="button"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </form>
              </Form>
            )}
            {step === 3 && (
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <PartyPopper className="w-16 h-16 mx-auto text-primary" />
                </motion.div>
                <p className="text-lg font-semibold">
                  Welcome aboard, {createdFirstName}!
                </p>
                <p>Your account has been created successfully.</p>
                <Button onClick={handleVerifyEmail} className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Verify Your Email
                </Button>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="updates"
                    checked={receiveUpdates}
                    onCheckedChange={(checked) => setReceiveUpdates(!!checked)}
                  />
                  <label
                    htmlFor="updates"
                    className="text-sm text-muted-foreground"
                  >
                    Receive updates on offers and travel tips
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  This window will close automatically in 5 seconds
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center text-sm text-muted-foreground">
            {step < 3 && (
              <>
                <p>By continuing, you agree to Raki&apos;s</p>
                <p>
                  <a href="#" className="underline hover:text-primary">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-primary">
                    Privacy Policy
                  </a>
                </p>
              </>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
