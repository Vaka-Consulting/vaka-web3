import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthWithOtp, AuthRequestWithOtp } from "@vakaconsulting/common";
import { useAuth } from "@/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Mail,
  Shield,
  Sparkles,
  Lock,
} from "lucide-react";
import { EmailForm, OtpForm } from "@/components/Form";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const slideVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    x: 20,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function AuthLoginEmail() {
  const { authenticated, email, loginWithEmail, requestOtp, error } = useAuth();

  const handleSubmitOtp = useCallback(
    async (data: AuthWithOtp) => {
      console.log("login with otp data", data);
      await loginWithEmail(data);
    },
    [loginWithEmail]
  );

  const handleSubmitEmail = useCallback(
    async (data: AuthRequestWithOtp) => {
      await requestOtp(data);
    },
    [requestOtp]
  );

  const handleBackToEmail = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary/10 rounded-full blur-lg"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-8 p-4 relative z-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            variants={iconVariants}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-primary/20">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              {email ? (
                <Lock className="h-7 w-7 text-primary-foreground" />
              ) : (
                <Shield className="h-7 w-7 text-primary-foreground" />
              )}
            </motion.div>
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Welcome back
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg">
              {email
                ? "Enter your confirmation code"
                : "Sign in to your account"}
            </motion.p>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-2xl ring-1 ring-border/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-card/95 pointer-events-none" />

            <CardHeader className="space-y-3 pb-6 relative">
              <AnimatePresence mode="wait">
                {email ? (
                  <motion.div
                    key="otp-header"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        Verify your email
                      </CardTitle>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBackToEmail}
                          className="h-9 w-9 p-0 hover:bg-muted/80 transition-colors">
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <CardDescription className="text-base">
                      We&apos;ve sent a 6-digit code to{" "}
                      <motion.span
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="font-medium text-foreground bg-muted/50 px-2 py-1 rounded">
                        {email}
                      </motion.span>
                    </CardDescription>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email-header"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Sign in with email
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your email address to receive a confirmation code
                    </CardDescription>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardHeader>

            <CardContent className="space-y-6 relative">
              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={email ? "otp-form" : "email-form"}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit">
                  {email ? (
                    <OtpForm email={email} onSubmit={handleSubmitOtp} />
                  ) : (
                    <EmailForm onSubmit={handleSubmitEmail} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Success Alert */}
              <AnimatePresence>
                {authenticated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}>
                    <Alert className="border-green-200 bg-green-50/80 dark:border-green-800 dark:bg-green-950/50 backdrop-blur-sm">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.6 }}>
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <AlertDescription className="text-green-800 dark:text-green-300 font-medium">
                        Authentication successful! Redirecting...
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}>
                    <Alert variant="destructive" className="backdrop-blur-sm">
                      <motion.div
                        animate={{ rotate: [0, -1, 1, 0] }}
                        transition={{ duration: 0.5 }}>
                        <AlertCircle className="h-4 w-4" />
                      </motion.div>
                      <AlertDescription className="font-medium">
                        {error.message}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Help Text */}
              <AnimatePresence>
                {email && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Didn&apos;t receive the code?
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm font-medium hover:text-primary/80 transition-colors"
                        onClick={() => requestOtp({ email })}>
                        Resend code
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.p
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <span className="underline underline-offset-2">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2">Privacy Policy</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AuthLoginEmail;
