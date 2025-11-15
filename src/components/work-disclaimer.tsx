import { SmallText } from "@/components/typography/typography";
import { Shield, Lock } from "lucide-react";

interface WorkDisclaimerProps {
  className?: string;
}

export function WorkDisclaimer({ className = "" }: WorkDisclaimerProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 px-3 md:px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-lg ${className}`}
    >
      <div className="shrink-0 p-2 rounded-md bg-amber-500/20">
        <Shield className="h-4 w-4 text-amber-600" />
      </div>
      <div className="flex-1">
        <SmallText className="text-amber-700 font-medium text-sm md:text-base">
          Arbeidsrelatert innhold
        </SmallText>
        <SmallText className="text-amber-600/80 text-xs md:text-sm mt-0.5">
          Noe informasjon kan være begrenset av hensyn til konfidensialitet og
          forretningshemmeligheter.
        </SmallText>
      </div>
      <Lock className="h-4 w-4 text-amber-600/60 shrink-0 hidden sm:block" />
    </div>
  );
}
