"use client";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormErrorsNotification from "../_internal/FormErrorsNotification";
import type { FormProps } from "../types";

interface EmailFormData {
  email: string;
}

const defaultValues = {
  email: "",
};

const resolver = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
  })
);

function EmailForm({ onSubmit, disabled }: FormProps<EmailFormData>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="flex-1 space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="Enter your email address"
                disabled={disabled}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />

        <Button type="submit" disabled={disabled} className="sm:w-auto w-full">
          <Mail className="w-4 h-4 mr-2" />
          Submit
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <FormErrorsNotification errors={errors} />
      )}
    </form>
  );
}

export default EmailForm;
