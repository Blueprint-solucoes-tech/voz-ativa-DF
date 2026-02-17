import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

export const OptionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  selected = false,
  className,
}: OptionCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-200",
        "bg-card text-card-foreground shadow-sm",
        "hover:border-primary/50 hover:bg-muted hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected && "border-primary bg-primary/5",
        !selected && "border-border",
        className
      )}
      aria-pressed={selected}
    >
      <div className={cn(
        "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
      )}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.button>
  );
};