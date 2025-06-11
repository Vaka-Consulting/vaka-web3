"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WalletConnectedButton from "../../WalletConnectedButton";
import WalletDisconnectButton from "../../WalletDisconnectButton";

function Connected() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <WalletConnectedButton onClick={handleOpen} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Wallet Information</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <WalletDisconnectButton onDisconnect={handleClose}>
            Disconnect Wallet
          </WalletDisconnectButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Connected;
