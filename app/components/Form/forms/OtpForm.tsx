"use client";

import { useRef } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { FormProps } from "../types";

interface OtpFormData {
  email: string;
  otp: string;
}

interface OtpFormProps extends FormProps<OtpFormData> {
  email: string;
}

const defaultValues = {
  email: "",
  otp: "",
};

const resolver = yupResolver(
  yup.object().shape({
    email: yup.string().email().required("Email Address is required"),
    otp: yup.string().required("OTP is required"),
  })
);

function OtpForm({ email, onSubmit }: OtpFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues,
      email,
    },
    resolver,
  });

  const handleCompleted = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
          className="space-y-6">
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-4">
                <MuiOtpInput
                  length={6}
                  {...field}
                  onComplete={handleCompleted}
                  autoFocus
                  sx={{
                    gap: 2,
                    ".MuiFormControl-root, .MuiInputBase-root": {
                      width: "100%",
                      borderRadius: "var(--radius)",
                    },
                    ".MuiInputBase-root": {
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      "&:hover": {
                        borderColor: "hsl(var(--ring))",
                      },
                      "&.Mui-focused": {
                        borderColor: "hsl(var(--ring))",
                        boxShadow: "0 0 0 2px hsl(var(--ring) / 0.2)",
                      },
                    },
                    ".MuiInputBase-root input": {
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      textAlign: "center",
                      color: "hsl(var(--foreground))",
                    },
                  }}
                />
                {fieldState.invalid && (
                  <p className="text-sm text-destructive text-center">
                    OTP invalid
                  </p>
                )}
              </div>
            )}
          />
        </form>
      </div>
    </div>
  );
}

export default OtpForm;
