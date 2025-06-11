"use client";

import { useCallback, useEffect } from "react";
import type { WalletSignature } from "@vakaconsulting/common";
import { useWizard } from "react-use-wizard";
import { useWallet } from "@meshsdk/react";
import { useAuthRegister } from "../../../../hooks";
import WalletSignatureForm from "../../../Form/forms/WalletSignatureForm";
import { AuthRegisterStep } from "../types";

const initialData = {
  stakeAddress: undefined,
  walletSignature: undefined,
};

function WalletSignatureStep() {
  const { connected } = useWallet();
  const { data: userData, storeData, registered, register } = useAuthRegister();
  const { goToStep } = useWizard();

  const resetCurrentStepData = useCallback(() => {
    storeData(initialData);
  }, [storeData]);

  const handlePrevStep = useCallback(() => {
    resetCurrentStepData();
    goToStep(AuthRegisterStep.WalletMethod);
  }, [goToStep, resetCurrentStepData]);

  const handleNextStep = useCallback(() => {
    goToStep(AuthRegisterStep.Complete);
  }, [goToStep]);

  /**
   * Disconnected
   * When: User disconnects wallet and has to reconnect again on prev page.
   */
  useEffect(() => {
    if (!connected) {
      handlePrevStep();
    }
  }, [connected, handlePrevStep]);

  /**
   * Register user
   * When: stakeAddress & walletSignature are submitted through the form and state has been updated
   */
  const handleSubmit = (data: {
    stakeAddress: string;
    walletSignature: WalletSignature;
  }) => {
    const { stakeAddress, walletSignature } = data;

    if (stakeAddress && walletSignature) {
      void storeData(data);
      void register({
        email: userData.email,
        stakeAddress,
        walletSignature,
        userData: {
          experienceLevel: userData.experienceLevel,
          experienceChains: userData.experienceChains,
          walletMethod: userData.walletMethod,
        },
      });
    }
  };

  /**
   * Registered
   * When: register through provider has been successful
   */
  useEffect(() => {
    if (registered) {
      handleNextStep();
    }
  }, [registered, handleNextStep]);

  return (
    <div className="space-y-6">
      <WalletSignatureForm
        onPrevious={handlePrevStep}
        onSubmit={async (data) => {
          await handleSubmit(data);
        }}
      />
    </div>
  );
}

export default WalletSignatureStep;
