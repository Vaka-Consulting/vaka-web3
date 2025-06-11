"use client";
import { ExperienceLevel } from "@vakaconsulting/common";
import { Controller, useForm } from "react-hook-form";
import { object, mixed, type ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FormButtons from "../_internal/FormButtons";
import FormErrorsNotification from "../_internal/FormErrorsNotification";
import type { FormProps } from "../types";

interface FormSubmitData {
  experienceLevel: ExperienceLevel;
}

const validationSchema: ObjectSchema<FormSubmitData> = object().shape({
  experienceLevel: mixed<ExperienceLevel>()
    .oneOf(Object.values(ExperienceLevel))
    .required("Please select your experience level."),
});

const experienceLevels = [
  {
    value: ExperienceLevel.Newbie,
    label: "Newbie",
    description:
      "I don't know anything about blockchain and have never used web3 apps before.",
  },
  {
    value: ExperienceLevel.Beginner,
    label: "Beginner",
    description: "I have used some web3 apps, but have limited understanding.",
  },
  {
    value: ExperienceLevel.Confident,
    label: "Confident",
    description:
      "I have used several web3 apps and am confident using and managing blockchain wallets.",
  },
  {
    value: ExperienceLevel.Expert,
    label: "Expert",
    description: "I have deep technical knowledge of blockchain and web3 apps.",
  },
];

function ExperienceLevelForm({
  defaultValues,
  onSubmit,
}: FormProps<FormSubmitData>) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      ...validationSchema.getDefault(),
      ...defaultValues,
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            What is your level of experience with blockchain and web3 apps?
          </h1>

          <Controller
            name="experienceLevel"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="space-y-4">
                {experienceLevels.map((level) => (
                  <div
                    key={level.value}
                    className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                    <RadioGroupItem
                      value={level.value}
                      id={level.value}
                      className="mt-1"
                    />
                    <div className="space-y-1 flex-1">
                      <Label
                        htmlFor={level.value}
                        className="text-base font-medium cursor-pointer">
                        {level.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {level.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        {Object.keys(formState.errors).length > 0 && (
          <FormErrorsNotification errors={formState.errors} />
        )}

        <FormButtons />
      </form>
    </div>
  );
}

export default ExperienceLevelForm;
