"use client";

import { useMemo } from "react";
import { truncateStringInMiddle } from "@vakaconsulting/common";
import { useWallet, useAddress, useWalletList } from "@meshsdk/react";
import { Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyToClipboard } from "../../CopyToClipboard";
import Image from "next/image";

interface Props {
  truncateCharsFrom?: number;
}

const label = "Wallet Address";

function WalletAddress({ truncateCharsFrom }: Props) {
  const { connected, name } = useWallet();
  const wallets = useWalletList();
  const address = useAddress();

  const truncatedAddress = useMemo(
    () =>
      address
        ? truncateStringInMiddle(address, truncateCharsFrom)
        : "Wallet not connected",
    [address, truncateCharsFrom]
  );

  const connectedWalletInfo = useMemo(
    () =>
      wallets.find(
        (wallet) => wallet.name.toUpperCase() === name?.toUpperCase()
      ),
    [wallets, name]
  );

  if (!connected) {
    return (
      <div className="space-y-2">
        <Label htmlFor="wallet-address" className="text-sm font-medium">
          {label}
        </Label>
        <div className="relative">
          <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="wallet-address"
            value="No connected wallet found"
            disabled
            className="pl-10 bg-muted/50"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* <Label className="text-sm font-medium">{label}</Label> */}
      <CopyToClipboard
        label={label}
        startIcon={
          <Image
            src={connectedWalletInfo?.icon || "/placeholder.svg"}
            alt="wallet-icon"
            className="h-6 w-6 rounded-sm"
            width={24}
            height={24}
          />
        }
        copy={address}>
        {truncatedAddress}
      </CopyToClipboard>
    </div>
  );
}

export default WalletAddress;
