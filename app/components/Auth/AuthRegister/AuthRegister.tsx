import { Wizard } from "react-use-wizard";
import CompleteStep from "./_internal/CompleteStep";
import CreateWalletStep from "./_internal/CreateWalletStep";
import EnterEmailStep from "./_internal/EnterEmailStep";
import ExperienceChainsStep from "./_internal/ExperienceChainsStep";
import ExperienceLevelStep from "./_internal/ExperienceLevelStep";
import WalletMethodStep from "./_internal/WalletMethodStep";
import WalletSignatureStep from "./_internal/WalletSignatureStep";
import { getFirstStep } from "./utils";
import { useAuthRegister } from "@/hooks";

function AuthRegister() {
  const { config } = useAuthRegister();
  const { survey } = config;

  console.log("config", config);
  console.log("survey", survey);

  const firstStep = getFirstStep(survey);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Wizard startIndex={firstStep}>
        <ExperienceLevelStep />
        <ExperienceChainsStep />
        <WalletMethodStep />
        <WalletSignatureStep />
        <EnterEmailStep />
        <CreateWalletStep />
        <CompleteStep />
      </Wizard>
    </div>
  );
}

export default AuthRegister;
