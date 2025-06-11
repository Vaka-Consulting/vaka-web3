"use client";

import React, { type MouseEvent, useCallback, useEffect } from "react";
import type { Wallet } from "@meshsdk/core";
import { useWallet, useWalletList } from "@meshsdk/react";
import { Button } from "@/components/ui/button";
import WalletBalance from "../WalletBalance";
import Image from "next/image";

export type WalletConnectedProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

function WalletConnectedButton({ onClick, ...props }: WalletConnectedProps) {
  const { name, connected, disconnect } = useWallet();
  const walletList = useWalletList();

  const [connectedWallet, setConnectedWallet] = React.useState<
    Wallet | undefined
  >(undefined);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick(event);
  };

  const handleClickOnFailed = useCallback(() => disconnect(), [disconnect]);

  useEffect(() => {
    if (connected && walletList.length) {
      const connectedWallet = walletList.find(
        (wallet) => wallet.name.toLowerCase() === name?.toLowerCase()
      );
      setConnectedWallet(connectedWallet);
    }
  }, [connected, walletList, name]);

  if (connectedWallet) {
    return (
      <Button variant="outline" onClick={handleClick} {...props}>
        <div className="flex items-center gap-2">
          <Image
            src={connectedWallet.icon || "/placeholder.svg"}
            width={24}
            height={24}
            alt="wallet icon"
            className="rounded-sm"
          />
          <WalletBalance />
        </div>
      </Button>
    );
  }

  return (
    <Button onClick={handleClickOnFailed} variant="destructive">
      Failed...
    </Button>
  );
}

export default WalletConnectedButton;
