import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getBadgeStyles = () => {
    if (score > 69) {
      return {
        bgClass: "bg-emerald-900/40 border-emerald-500/30",
        textClass: "text-emerald-400",
        icon: CheckCircle,
      };
    } else if (score > 49) {
      return {
        bgClass: "bg-amber-900/40 border-amber-500/30",
        textClass: "text-amber-400",
        icon: AlertCircle,
      };
    } else {
      return {
        bgClass: "bg-red-900/40 border-red-500/30",
        textClass: "text-red-400",
        icon: XCircle,
      };
    }
  };

  const { bgClass, textClass, icon: Icon } = getBadgeStyles();

  return (
    <div
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border backdrop-blur-sm ${bgClass} ${textClass} transition-all duration-200 hover:scale-110`}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
};

export default ScoreBadge;
