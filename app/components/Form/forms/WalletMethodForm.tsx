"use client";

import type React from "react";
import { useEffect } from "react";
import { WalletMethod } from "@vakaconsulting/common";
import { Controller, useForm } from "react-hook-form";
import { string, mixed, object, type ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { resolveRewardAddress } from "@meshsdk/core";
import { useAddress, useWallet } from "@meshsdk/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { WalletConnector } from "@/components/Wallet";
import FormButtons from "../_internal/FormButtons";
import FormErrorsNotification from "../_internal/FormErrorsNotification";
import type { FormProps } from "../types";

interface FormSubmitData {
  walletAddress?: string;
  stakeAddress?: string;
  walletMethod: WalletMethod;
}

interface WalletMethodFormProps extends FormProps<FormSubmitData> {
  canCreateWallet: boolean;
  canConnectWallet: boolean;
}

const validationSchema: ObjectSchema<FormSubmitData> = object().shape({
  stakeAddress: string(),
  walletAddress: string().when("walletMethod", {
    is: (val: WalletMethod) => val === WalletMethod.Supplied,
    then: () => string().required("Please enter your wallet address."),
  }),
  walletMethod: mixed<WalletMethod>()
    .oneOf(Object.values(WalletMethod))
    .required("Please provide a wallet method."),
});

const defaultValues = validationSchema.getDefault();

function WalletMethodForm({
  canCreateWallet,
  canConnectWallet,
  onPrevious,
  onSubmit,
}: WalletMethodFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { connected } = useWallet();
  const walletAddress = useAddress();

  const handleFormSubmit = (data: FormSubmitData) => {
    const { walletAddress, walletMethod } = data;
    let { stakeAddress } = data;

    try {
      if (walletAddress) {
        stakeAddress = resolveRewardAddress(walletAddress);
      }

      onSubmit({
        walletMethod,
        walletAddress,
        stakeAddress,
      });
    } catch {
      setError("walletAddress", {
        type: "manual",
        message: "Invalid wallet address",
      });
    }
  };

  const handleWalletAddressInput = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value;

    if (value && value !== "") {
      setValue("walletMethod", WalletMethod.Supplied);
    } else {
      setValue("walletMethod", undefined);
    }
  };

  useEffect(() => {
    if (connected) {
      setValue("walletMethod", WalletMethod.Connected);
      setValue("walletAddress", walletAddress);
    } else {
      setValue("walletMethod", undefined);
      setValue("walletAddress", "");
    }
  }, [connected, walletAddress, setValue]);

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Choose Wallet Method
            </h1>
            <p className="text-muted-foreground">
              If you already have a Cardano wallet or would like to create your
              own, please either enter your wallet address or connect your
              wallet to begin.
            </p>
          </div>

          {canConnectWallet && (
            <Card>
              <CardContent className="p-6">
                <WalletConnector
                  disabled={[WalletMethod.Supplied, WalletMethod.Created].some(
                    (method) => method.includes(watch("walletMethod"))
                  )}
                />
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Controller
              name="walletAddress"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <Input
                    {...field}
                    id="wallet-address"
                    value={field.value || ""}
                    type="text"
                    placeholder="Please enter your wallet address"
                    disabled={[
                      WalletMethod.Connected,
                      WalletMethod.Created,
                    ].some((method) => method.includes(watch("walletMethod")))}
                    onInput={handleWalletAddressInput}
                    className={errors.walletAddress ? "border-destructive" : ""}
                  />
                  {errors.walletAddress && (
                    <p className="text-sm text-destructive">
                      {String(errors.walletAddress.message)}
                    </p>
                  )}
                </div>
              )}
            />

            {canCreateWallet && (
              <Controller
                name="walletMethod"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-3 p-4 rounded-lg border">
                    <Checkbox
                      id="create-wallet"
                      checked={field.value === WalletMethod.Created}
                      onCheckedChange={(checked) => {
                        const value = checked
                          ? WalletMethod.Created
                          : defaultValues.walletMethod;
                        field.onChange(value);
                      }}
                      disabled={!!watch("walletAddress")}
                    />
                    <Label
                      htmlFor="create-wallet"
                      className="text-sm font-normal cursor-pointer">
                      I want to create a new wallet
                    </Label>
                  </div>
                )}
              />
            )}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <FormErrorsNotification errors={errors} />
        )}

        <FormButtons onPrevious={onPrevious} />
      </form>
    </div>
  );
}

export default WalletMethodForm;
