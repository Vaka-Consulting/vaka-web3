"use client";

import type React from "react";
import { useWallet } from "@meshsdk/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type WalletDisconnectButtonProps = {
  children?: React.ReactNode;
  onDisconnect?: () => void;
};

function WalletDisconnectButton({
  children = "Disconnect Wallet",
  onDisconnect,
  ...props
}: WalletDisconnectButtonProps) {
  const { disconnect } = useWallet();

  const handleDisconnect = () => {
    disconnect();
    onDisconnect?.();
  };

  return (
    <Button
      onClick={handleDisconnect}
      variant="destructive"
      className="w-full gap-2"
      {...props}>
      <LogOut className="h-4 w-4" />
      {children}
    </Button>
  );
}

export default WalletDisconnectButton;
