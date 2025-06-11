"use client";
import { useWizard } from "react-use-wizard";
import { useAuthRegister } from "../../../../hooks";
import ExperienceChainsForm from "../../../Form/forms/ExperienceChainsForm";
import { AuthRegisterStep } from "../types";

function ExperienceChainsStep() {
  const { data, storeData } = useAuthRegister();
  const { experienceChains } = data;
  const { nextStep, goToStep } = useWizard();

  const defaultValues = {
    experienceChains,
  };

  const handlePreviousStep = () => {
    goToStep(AuthRegisterStep.ExperienceLevel);
  };

  const handleSubmit = ({
    experienceChains,
  }: {
    experienceChains: string[];
  }) => {
    storeData({ experienceChains });
    void nextStep();
  };

  return (
    <div className="space-y-6">
      <ExperienceChainsForm
        defaultValues={defaultValues}
        onPrevious={handlePreviousStep}
        onSubmit={async (data) => {
          await handleSubmit(data);
        }}
      />
    </div>
  );
}

export default ExperienceChainsStep;
