import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthLoginWallet } from "@/components/Auth/AuthLogin";
import { Layout } from "@/components/Layout";
import { Shield, Sparkles } from "lucide-react";
import { GetServerSideProps } from "next";
import getServerSidePropsWrapper from "@/lib/wrappers/getServerSideProps";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 2, 0, -2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Login() {
  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,0,0.05),transparent)]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-lg"
        />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-lg space-y-8">
            {/* Logo/Brand Section */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <div className="space-y-2">
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  SecureAuth
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Powered by Blockchain Technology
                </motion.p>
              </div>
            </motion.div>

            {/* Main Login Card */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-card/95 backdrop-blur-xl shadow-2xl ring-1 ring-border/50">
                <CardHeader className="space-y-4 pb-6 px-6 sm:px-8 pt-8">
                  <div className="text-center space-y-3">
                    <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                      Welcome back
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm sm:text-base">
                      Connect your wallet to securely access your account
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pb-8 px-6 sm:px-8">
                  <AuthLoginWallet />
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  New to our platform?{" "}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/register"
                    className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
                    Create account
                  </motion.a>
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                  <motion.a
                    whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                    href="/help"
                    className="hover:text-foreground transition-colors">
                    Help Center
                  </motion.a>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <motion.a
                    whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                    href="/privacy"
                    className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </motion.a>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <motion.a
                    whileHover={{ scale: 1.1, color: "var(--foreground)" }}
                    href="/terms"
                    className="hover:text-foreground transition-colors">
                    Terms of Service
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = getServerSidePropsWrapper(
  async () => {
    return {
      props: {},
    };
  }
);
