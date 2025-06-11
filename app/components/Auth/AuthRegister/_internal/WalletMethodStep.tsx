"use client";
import {
  type AuthRegisterCollectedData,
  WalletMethod,
} from "@vakaconsulting/common";
import { useWizard } from "react-use-wizard";
import { useAuthRegister } from "../../../../hooks";
import WalletMethodForm from "../../../Form/forms/WalletMethodForm";
import { AuthRegisterStep } from "../types";

const _getNextStep = (walletMethod: WalletMethod): number => {
  switch (walletMethod) {
    case WalletMethod.Created:
      return AuthRegisterStep.CreateWallet;
    case WalletMethod.Connected:
      return AuthRegisterStep.WalletSignature;
    case WalletMethod.Supplied:
      return AuthRegisterStep.EnterEmail;
  }
};

function WalletMethodStep() {
  const { config, data, storeData } = useAuthRegister();
  const { createWallet, connectWallet } = config;
  const { experienceLevel, experienceChains } = data;
  const { goToStep } = useWizard();

  const hasExperience =
    experienceLevel && experienceChains && experienceChains?.length > 0;

  const handleSubmit = (data: Partial<AuthRegisterCollectedData>) => {
    const { walletMethod } = data;

    storeData(data);

    if (walletMethod) {
      goToStep(_getNextStep(walletMethod));
    }
  };

  const handlePreviousStep = () => {
    goToStep(AuthRegisterStep.ExperienceChains);
  };

  return (
    <div className="space-y-6">
      <WalletMethodForm
        canCreateWallet={createWallet}
        canConnectWallet={connectWallet}
        onPrevious={hasExperience ? handlePreviousStep : undefined}
        onSubmit={async (data) => {
          await handleSubmit(data);
        }}
      />
    </div>
  );
}

export default WalletMethodStep;
