import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  cancelPath: string;
  submitLabel: string;
  isSubmitting?: boolean;
}

export function FormActions({ cancelPath, submitLabel, isSubmitting = false }: FormActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4">
      <Button type="button" variant="outline" onClick={() => navigate(cancelPath)} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </div>
  );
}
