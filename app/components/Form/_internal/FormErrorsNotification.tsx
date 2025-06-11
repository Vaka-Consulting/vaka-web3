import type { FieldErrors } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormErrorNotificationProps {
  errors: FieldErrors;
}

function FormErrorsNotification({ errors }: FormErrorNotificationProps) {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="font-medium mb-2">
          There are errors in the form. Please correct them before continuing.
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {Object.keys(errors).map((key) => (
            <li key={key}>
              {typeof errors?.[key]?.message === "string"
                ? errors[key]?.message
                : "Unknown error"}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

export default FormErrorsNotification;
