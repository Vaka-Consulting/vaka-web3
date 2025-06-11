import React from "react";
import { motion } from "framer-motion";
import { AuthLoginEmail } from "@/components/Auth/AuthLogin";
import { Layout } from "@/components/Layout";
import { GetServerSideProps } from "next";
import getServerSidePropsWrapper from "@/lib/wrappers/getServerSideProps";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const backgroundParticleVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    opacity: [0.3, 0.7, 0.3],
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
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />

          {/* Animated background elements */}
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-secondary/30 to-transparent rounded-full blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.2, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              variants={backgroundParticleVariants}
              animate="animate"
              transition={{
                delay: i * 0.5,
                duration: 4 + i,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-lg space-y-10">
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur-3xl scale-110 opacity-60" />

              <AuthLoginEmail />
            </motion.div>

            {/* Additional Links Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Create Account Link */}
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm text-muted-foreground relative">
                    New to our platform?{" "}
                    <motion.a
                      whileHover={{
                        scale: 1.05,
                        color: "var(--primary)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      href="/register"
                      className="font-semibold text-primary hover:text-primary/80 transition-all duration-300 underline-offset-4 hover:underline relative group">
                      <span className="relative z-10">Create account</span>
                    </motion.a>
                  </p>
                </div>
              </motion.div>

              {/* Footer Links */}
              <motion.div
                className="text-center space-y-4"
                variants={itemVariants}>
                <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
                  {[
                    { href: "/help", text: "Help Center" },
                    { href: "/privacy", text: "Privacy Policy" },
                    { href: "/terms", text: "Terms of Service" },
                  ].map((link, index) => (
                    <React.Fragment key={link.href}>
                      <motion.a
                        whileHover={{
                          scale: 1.1,
                          color: "var(--foreground)",
                          y: -2,
                        }}
                        whileTap={{ scale: 0.95 }}
                        href={link.href}
                        className="hover:text-foreground transition-all duration-300 relative group">
                        <span className="relative z-10">{link.text}</span>
                        <motion.div
                          className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                          whileHover={{ scaleX: 1 }}
                        />
                      </motion.a>
                      {index < 2 && (
                        <motion.span
                          className="w-1 h-1 bg-muted-foreground rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Brand tagline */}
                <motion.div
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-xs text-muted-foreground/80">
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-3 h-3 border border-primary/30 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-primary/50 rounded-full" />
                    </motion.div>
                    <span>Secure • Fast • Reliable</span>
                  </div>
                </motion.div>
              </motion.div>
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
