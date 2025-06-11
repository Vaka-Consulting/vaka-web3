"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyToClipboardProps {
  children: string;
  label: string;
  copy?: string;
  startIcon?: React.ReactNode;
  className?: string;
}

export const CopyToClipboard = ({
  children,
  copy,
  label,
  startIcon,
  className,
}: CopyToClipboardProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    const textToCopy = copy ? copy : children;
    await navigator.clipboard.writeText(textToCopy);

    setIsCopied(true);
    toast.info("Copied to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={`copy-${label.replace(/\s+/g, "-").toLowerCase()}`}>
          {label}
        </Label>
      )}
      <div className="flex relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}
        <Input
          id={`copy-${label.replace(/\s+/g, "-").toLowerCase()}`}
          value={children}
          readOnly
          className={cn("pr-10", startIcon && "pl-10")}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={handleCopy}>
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="end">
              {isCopied ? "Copied!" : "Copy to clipboard"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CopyToClipboard;
