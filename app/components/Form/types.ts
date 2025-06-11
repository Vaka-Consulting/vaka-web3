export interface FormProps<TFormData> {
  defaultValues?: Partial<TFormData>;
  onSubmit: (data: TFormData) => Promise<void>;
  onPrevious?: () => void;
  disabled?: boolean;
}
