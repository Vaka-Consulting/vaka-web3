"use client";

import React, { type MouseEvent } from "react";
import { useWallet, useWalletList } from "@meshsdk/react";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

function WalletPicker() {
  const { connect, connecting, name: walletName } = useWallet();
  const walletList = useWalletList();

  const [clickedWalletName, setClickedWalletName] = React.useState<
    string | null
  >(null);

  const handleConnect = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const name = event.currentTarget.value;

    void connect(name);
    setClickedWalletName(name);
  };

  return (
    <div className="space-y-2">
      {walletList.map(({ name, icon }) => {
        const isConnecting = connecting && clickedWalletName === name;
        const isConnected = name === walletName && !connecting;

        return (
          <Button
            key={`wallet-list-name-${name}`}
            variant="outline"
            value={name}
            onClick={handleConnect}
            disabled={connecting}
            className={cn(
              "w-full justify-start gap-3 h-auto p-4",
              isConnected && "border-primary bg-primary/5"
            )}>
            <Image
              src={icon || "/placeholder.svg"}
              width={24}
              height={24}
              alt="wallet icon"
              className="rounded-sm flex-shrink-0"
            />
            <span className="font-medium flex-1 text-left">{name}</span>

            {isConnecting && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="font-semibold">Connecting</span>
              </div>
            )}

            {isConnected && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Check className="h-4 w-4" />
                <span className="font-semibold">Connected</span>
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
}

export default WalletPicker;
