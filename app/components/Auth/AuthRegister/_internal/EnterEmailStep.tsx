"use client";

import { useCallback, useEffect } from "react";
import type { AuthRegisterCollectedData } from "@vakaconsulting/common";
import { useWizard } from "react-use-wizard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, AlertCircle, Mail } from "lucide-react";
import { useAuthRegister } from "../../../../hooks";
import { EmailForm } from "../../../Form";
import { AuthRegisterStep } from "../types";

function EnterEmailStep() {
  const {
    registering,
    registered,
    register,
    error,
    data,
    storeData,
    resendVerificationLink,
  } = useAuthRegister();
  const { stakeAddress, ...userData } = data;
  const { goToStep } = useWizard();

  const handleSubmit = useCallback(
    (data: Partial<AuthRegisterCollectedData>) => {
      const { email } = data;

      void storeData(data);
      void register({ email, stakeAddress, userData });
    },
    [register, stakeAddress, storeData, userData]
  );

  const handleResendVerification = useCallback(async () => {
    if (data.email) {
      try {
        await resendVerificationLink({ email: data.email });
      } catch (err) {
        // Error handling is managed by the hook
        console.error("Failed to resend verification link:", err);
      }
    }
  }, [data.email, resendVerificationLink]);

  const handlePrevStep = () => {
    goToStep(AuthRegisterStep.WalletMethod);
  };

  const handleNextStep = useCallback(() => {
    goToStep(AuthRegisterStep.Complete);
  }, [goToStep]);

  useEffect(() => {
    if (registered) {
      handleNextStep();
    }
  }, [registered, handleNextStep]);

  useEffect(() => {
    console.log("registering", registering);
  }, [registering]);

  return (
    <div className="space-y-6">
      <EmailForm
        onPrevious={handlePrevStep}
        onSubmit={async (data) => {
          await handleSubmit(data);
        }}
        disabled={registering}
      />

      {registering && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>Submitting data...</AlertDescription>
        </Alert>
      )}

      {error && (
        <div className="space-y-3">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>

          {data.email && (
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-muted-foreground">
                Having trouble? You can resend the verification link to your
                email.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResendVerification}
                disabled={registering}
                className="w-fit">
                <Mail className="h-4 w-4 mr-2" />
                Resend Verification Link
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EnterEmailStep;
