"use client";
import { ExperienceChain } from "@vakaconsulting/common";
import { Controller, useForm } from "react-hook-form";
import { array, string, object, type ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormButtons from "../_internal/FormButtons";
import FormErrorsNotification from "../_internal/FormErrorsNotification";
import type { FormProps } from "../types";

interface FormSubmitData {
  experienceChains: string[];
  experienceChainsOther?: string;
}

const otherVal = "OTHER";
const experienceChains = [...Object.values(ExperienceChain), otherVal];

export const validationSchema: ObjectSchema<FormSubmitData> = object().shape({
  experienceChains: array()
    .of(string().required())
    .min(
      1,
      "Please select at least one blockchain you previously had experience with."
    )
    .required(
      "Please select at least one blockchain you previously had experience with."
    ),
  experienceChainsOther: string().when("experienceChains", {
    is: (val: FormSubmitData["experienceChains"]) => val?.includes(otherVal),
    then: () =>
      string().required("Please specify your other blockchain experience"),
  }),
});

function ExperienceChainsForm({
  defaultValues,
  onPrevious,
  onSubmit,
}: FormProps<FormSubmitData>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...validationSchema.getDefault(),
      experienceChains: [],
      ...defaultValues,
    },
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = (data: FormSubmitData) => {
    const { experienceChains, experienceChainsOther } = data;

    if (experienceChains.includes(otherVal) && experienceChainsOther) {
      experienceChains.push(experienceChainsOther);

      const otherIndex = experienceChains.indexOf(otherVal);
      experienceChains.splice(otherIndex, 1);
    }

    onSubmit({ experienceChains: experienceChains });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Your Experience with Blockchain
            </h1>
            <p className="text-muted-foreground">
              What blockchains have you previously had experience with (select
              all that apply)
            </p>
          </div>

          <div className="space-y-4">
            <Controller
              name="experienceChains"
              control={control}
              defaultValue={defaultValues?.experienceChains}
              render={({ field }) => (
                <div className="grid gap-4">
                  {experienceChains.map((experience) => (
                    <div
                      key={`experienceChains-${experience}`}
                      className="flex items-center space-x-3">
                      <Checkbox
                        id={`experience-${experience}`}
                        checked={field.value?.includes(experience) || false}
                        onCheckedChange={(checked) => {
                          const value = checked
                            ? [...(field.value || []), experience]
                            : (field.value || []).filter(
                                (value: string) => experience !== value
                              );
                          field.onChange(value);
                        }}
                      />
                      <Label
                        htmlFor={`experience-${experience}`}
                        className="text-sm font-normal cursor-pointer">
                        {experience[0].toUpperCase() +
                          experience.substring(1).toLowerCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          {watch("experienceChains")?.includes(otherVal) && (
            <Controller
              name="experienceChainsOther"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor="other-experience">
                    Other Blockchain Experience
                  </Label>
                  <Input
                    {...field}
                    id="other-experience"
                    type="text"
                    placeholder="Please specify your other blockchain experience"
                    className={
                      errors.experienceChainsOther ? "border-destructive" : ""
                    }
                  />
                  {errors.experienceChainsOther && (
                    <p className="text-sm text-destructive">
                      {typeof errors.experienceChainsOther?.message === "string"
                        ? errors.experienceChainsOther.message
                        : ""}
                    </p>
                  )}
                </div>
              )}
            />
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <FormErrorsNotification errors={errors} />
        )}

        <FormButtons onPrevious={onPrevious} />
      </form>
    </div>
  );
}

export default ExperienceChainsForm;
