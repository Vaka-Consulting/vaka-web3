"use client";

import { Label } from "@/components/ui/label";
import {
  type WalletSignature,
  WalletSignAuthType,
} from "@vakaconsulting/common";
import { useForm } from "react-hook-form";
import { useWallet } from "@meshsdk/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletDisconnectButton } from "@/components/Wallet";
import WalletAddress from "@/components/Wallet/WalletAddress";
import type { FormProps } from "../types";

interface FormData {
  stakeAddress: string;
  walletSignature: WalletSignature;
  authType?: WalletSignAuthType;
}

const walletSignatureMessage = "Hello";

function WalletSignatureForm({ onSubmit }: FormProps<FormData>) {
  const { wallet } = useWallet();
  const { handleSubmit } = useForm();

  const handleSign = async (authType?: WalletSignAuthType) => {
    const stakeAddress = await wallet
      .getRewardAddresses()
      .then((addresses) => addresses[0]);
    const walletSignature = await wallet.signData(
      walletSignatureMessage,
      stakeAddress
    );
    if (authType) {
      onSubmit({ stakeAddress, walletSignature, authType });
    } else {
      onSubmit({ stakeAddress, walletSignature });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign Message
          </h1>
          <p className="text-muted-foreground">
            Sign a message with your connected wallet to verify ownership
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Connected Wallet</Label>
              <WalletAddress truncateCharsFrom={40} />
            </div>

            <div className="flex flex-col gap-4 sm:items-center sm:justify-between w-full">
              <WalletDisconnectButton>Disconnect Wallet</WalletDisconnectButton>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleSubmit(() => handleSign())}
                  className="flex-1 w-full">
                  Sign Message
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleSubmit(() =>
                        handleSign(WalletSignAuthType.POLICY_ID)
                      )}>
                      Sign Message Policy ID
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WalletSignatureForm;
