import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Connecting() {
  return (
    <Button variant="default" disabled className="gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      Connecting wallet
    </Button>
  );
}

export default Connecting;
