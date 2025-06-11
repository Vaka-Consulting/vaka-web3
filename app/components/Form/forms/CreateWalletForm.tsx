"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import FormButtons from "../_internal/FormButtons";
import type { FormProps } from "../types";
import CopyToClipboard from "@/components/CopyToClipboard";

interface FormSubmitData {
  stakeAddress: string;
}

function CreateWalletForm({ onPrevious, onSubmit }: FormProps<FormSubmitData>) {
  // Mock mnemonic for the example
  const mnemonic = [
    "abandon",
    "ability",
    "able",
    "about",
    "above",
    "absent",
    "absorb",
    "abstract",
    "absurd",
    "abuse",
    "access",
    "accident",
  ];
  const mnemonicString = mnemonic.join(" ");

  const { handleSubmit } = useForm({
    defaultValues: {
      stakeAddress: "0x1234567890",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {mnemonic.map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="bg-muted p-3 rounded-md flex items-center">
            <span className="text-muted-foreground mr-2">{index + 1}.</span>
            <span className="font-medium">{word}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <CopyToClipboard label="Seed Phrases" copy={mnemonicString}>
          {mnemonicString}
        </CopyToClipboard>
      </div>

      <FormButtons onPrevious={onPrevious} />
    </form>
  );
}

export default CreateWalletForm;
