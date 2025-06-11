import React from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Lock, Shield, Wallet } from "lucide-react";

function NotAuthenticated() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Welcome to Web3 Auth
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Secure authentication powered by Cardano blockchain
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              Please connect your wallet to access the platform and enjoy
              secure, decentralized authentication.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 border">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Secure Access</h4>
                <p className="text-xs text-muted-foreground">
                  Blockchain-based authentication
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 border">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Wallet Integration</h4>
                <p className="text-xs text-muted-foreground">
                  Connect with Cardano wallets
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button size="lg" className="w-full sm:w-auto px-8">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Authenticated() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="secondary" className="px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You&apos;re successfully authenticated and ready to explore the
            decentralized web
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Account Status</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Authentication</span>
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">Cardano</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Security</CardTitle>
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Encryption</span>
                <Badge variant="secondary" className="text-xs">
                  Enabled
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wallet Type</span>
                <span className="font-medium">Hardware</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <Wallet className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start">
                View Transactions
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start">
                Manage Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card className="border-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Ready to Explore</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your Web3 journey begins here. Explore decentralized applications,
              manage your digital assets, and experience the future of the
              internet with complete control over your data.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button className="px-6">Explore dApps</Button>
              <Button variant="outline" className="px-6">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  const { authenticated } = useAuth();

  return (
    <>
      <Head>
        <title>Web3 Auth on Cardano Demo</title>
        <meta name="description" content="A Cardano dApp powered by VakaJs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {authenticated ? <Authenticated /> : <NotAuthenticated />}
        </div>
      </Layout>
    </>
  );
}
