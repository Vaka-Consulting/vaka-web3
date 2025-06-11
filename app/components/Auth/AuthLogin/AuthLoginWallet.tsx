import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthWithWallet, AuthWithWalletPolicyId } from "@vakaconsulting/common";
import { useWallet } from "@meshsdk/react";
import { useAuth } from "@/hooks";
import WalletSignatureForm from "@/components/Form/forms/WalletSignatureForm";
import { WalletConnector } from "../../Wallet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Loader2,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

function AuthLoginWithWallet() {
  const { connected } = useWallet();
  const { authenticated, loginWithWallet, loginWithWalletPolicyId, error } =
    useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: AuthWithWallet | AuthWithWalletPolicyId) => {
      setIsLoading(true);
      try {
        if ("authType" in data) {
          await loginWithWalletPolicyId(data as AuthWithWalletPolicyId);
        } else {
          await loginWithWallet(data as AuthWithWallet);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [loginWithWallet, loginWithWalletPolicyId]
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8">
      {/* Security Features */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">Secure</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">Fast</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">Private</p>
        </div>
      </motion.div>

      {/* Step 1: Wallet Connection */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <motion.div
            variants={pulseVariants}
            animate={!connected ? "pulse" : ""}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              connected
                ? "bg-green-500 text-white"
                : "bg-primary/10 text-primary border-2 border-primary/20"
            }`}>
            {connected ? (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <span className="text-xs sm:text-sm font-bold">1</span>
            )}
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:items-center gap-2">
              <span>Connect Your Wallet</span>
              {connected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}>
                  <Badge
                    variant="secondary"
                    className="bg-green-50 text-green-700 border-green-200 text-xs">
                    Connected
                  </Badge>
                </motion.div>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Choose your preferred Cardano wallet to continue
            </p>
          </div>
        </div>

        <motion.div
          className="pl-11 sm:pl-14"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}>
          <div className="bg-muted/30 rounded-xl p-4 sm:p-5 border border-border/50">
            <WalletConnector />

            {!connected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50">
                <p className="text-xs text-blue-700 dark:text-blue-300 text-center leading-relaxed">
                  💡 Don&apos;t have a wallet? Install{" "}
                  <span className="font-semibold">Nami</span>,{" "}
                  <span className="font-semibold">Eternl</span>, or{" "}
                  <span className="font-semibold">Flint</span> to get started
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Step 2: Authentication */}
      <AnimatePresence>
        {connected && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4">
            <Separator className="my-6" />

            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <motion.div
                variants={pulseVariants}
                animate={!authenticated ? "pulse" : ""}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  authenticated
                    ? "bg-green-500 text-white"
                    : "bg-primary/10 text-primary border-2 border-primary/20"
                }`}>
                {authenticated ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <span className="text-xs sm:text-sm font-bold">2</span>
                )}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:items-center gap-2">
                  <span>Sign Authentication Message</span>
                  {authenticated && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}>
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700 border-green-200 text-xs">
                        Verified
                      </Badge>
                    </motion.div>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Sign a secure message to verify your wallet ownership
                </p>
              </div>
            </div>

            <motion.div
              className="pl-11 sm:pl-14"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 sm:p-5 border border-border/50 backdrop-blur-sm">
                <WalletSignatureForm onSubmit={handleSubmit} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {authenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.6 }}>
            <Alert className="border-green-500/20 bg-gradient-to-r from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                Authentication successful! You are now signed in.
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 1 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.6 }}>
            <Alert className="border-destructive/20 bg-gradient-to-r from-red-50/50 to-orange-50/30 dark:from-red-950/20 dark:to-orange-950/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <AlertDescription className="text-destructive font-medium">
                {error.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div variants={itemVariants} className="mt-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{authenticated ? "Complete" : connected ? "50%" : "0%"}</span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: authenticated ? "100%" : connected ? "50%" : "0%",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AuthLoginWithWallet;
