import type { AuthValues } from "@vakaconsulting/common";

export interface LoginFormProps {
  onSubmit: (data: Partial<AuthValues>) => void;
}
