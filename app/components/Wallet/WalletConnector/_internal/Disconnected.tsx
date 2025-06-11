"use client";

import React, { type ReactNode } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WalletPicker from "../../WalletPicker/WalletPicker";

interface Props {
  children: ReactNode;
  disabled?: boolean;
}

function Disconnected({ children, disabled }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          id="connect-wallet-button"
          variant="default"
          size="lg"
          disabled={disabled}
          className="gap-2">
          <Wallet className="h-4 w-4" />
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <WalletPicker />
      </DialogContent>
    </Dialog>
  );
}

export default Disconnected;
