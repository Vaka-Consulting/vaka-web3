"use client";
import { Button } from "@/components/ui/button";

interface Props {
  onPrevious?: () => void;
}

function FormButtons({ onPrevious }: Props) {
  return (
    <div className="flex justify-end gap-4 pt-6">
      {onPrevious && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="min-w-24">
          Back
        </Button>
      )}
      <Button type="submit" className="min-w-24">
        Submit
      </Button>
    </div>
  );
}

export default FormButtons;
