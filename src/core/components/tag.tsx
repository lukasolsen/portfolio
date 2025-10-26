import { Badge } from "@/components/ui/badge";
import { BotIcon } from "lucide-react";
import type { FC } from "react";

type TagProps = {
  label: string;
  key: string | number;
};

export const Tag: FC<TagProps> = ({ label, key }) => {
  const icons = {
    AI: <BotIcon />,
  };

  return (
    <Badge
      key={key}
      className="bg-secondary/20! text-secondary-foreground! px-3! py-1! text-sm! font-medium!"
    >
      {icons[label as keyof typeof icons] || null}
      {label}
    </Badge>
  );
};
