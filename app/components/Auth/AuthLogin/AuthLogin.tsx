import React from "react";
import { useWallet } from "@meshsdk/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import AuthLoginEmail from "./AuthLoginEmail";
import AuthLoginWallet from "./AuthLoginWallet";
import { useAuth } from "@/hooks";

function AuthLogin() {
  const { connected } = useWallet();
  const { email } = useAuth();

  // If wallet is connected but no email, show only wallet login
  if (connected && !email) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="w-full ">
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Wallet Connected
                </Badge>
              </div>
              <CardTitle className="text-2xl font-semibold text-center">
                Complete Your Login
              </CardTitle>
              <CardDescription className="text-center text-base">
                Your wallet is connected. Please complete the authentication
                process.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <AuthLoginWallet />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If email exists but wallet not connected, show only email login
  if (!connected && email) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
              <div className="flex items-center justify-center mb-2">
                <Badge variant="secondary" className="px-3 py-1">
                  Email Registered
                </Badge>
              </div>
              <CardTitle className="text-2xl font-semibold text-center">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-base">
                Continue with your registered email account.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <AuthLoginEmail />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default state: show both options
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-8">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome
            </CardTitle>
            <CardDescription className="text-center text-base">
              Choose your preferred authentication method to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Wallet Authentication Section */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide text-center">
                Connect with Wallet
              </div>
              <AuthLoginWallet />
            </div>

            {/* Divider with "Or" text */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 py-1 text-muted-foreground font-medium rounded-full">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email Authentication Section */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide text-center">
                Email Authentication
              </div>
              <AuthLoginEmail />
            </div>
          </CardContent>

          {/* Footer */}
          <div className="px-6 pb-6">
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AuthLogin;
