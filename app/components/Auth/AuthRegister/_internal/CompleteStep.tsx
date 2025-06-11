"use client";
import { motion } from "framer-motion";
import { CheckCircle, Mail, AlertCircle } from "lucide-react";
import { useAuthRegister } from "@/hooks";

function CompleteStep() {
  const { data } = useAuthRegister();
  const { email, walletSignature } = data;

  if (email) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-3">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Email verification
          </h2>
          <p className="text-muted-foreground">
            Please check your inbox to complete the registration.
          </p>
        </div>
      </motion.div>
    );
  }

  if (walletSignature) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Completed</h2>
          <p className="text-muted-foreground">
            Thank you for registering! You are now able to log in.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">Please try again.</p>
      </div>
    </motion.div>
  );
}

export default CompleteStep;
