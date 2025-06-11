import React from "react";
import { AuthVerifyCodeData } from "@vakaconsulting/common";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";
import { useAuthRegister } from "../../../hooks";

function AuthVerification({ code }: AuthVerifyCodeData) {
  const { registered, registering, error, verifyRegisterCode } =
    useAuthRegister();

  React.useEffect(() => {
    void verifyRegisterCode({ code });
  }, [code]);

  if (registering) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-3">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Validating...
          </h1>
          <p className="text-muted-foreground">
            Please wait while we verify your email.
          </p>
        </div>
      </motion.div>
    );
  }

  if (error) {
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
          <h1 className="text-2xl font-semibold tracking-tight">Error</h1>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </motion.div>
    );
  }

  if (registered) {
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
          <h1 className="text-2xl font-semibold tracking-tight">
            Email Verified
          </h1>
          <p className="text-muted-foreground">
            You have completed the registration! You are now able to log in with
            your account.
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
        <div className="rounded-full bg-blue-100 p-3">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Email Verification
        </h1>
        <p className="text-muted-foreground">
          Preparing to verify your email address.
        </p>
      </div>
    </motion.div>
  );
}

export default AuthVerification;
