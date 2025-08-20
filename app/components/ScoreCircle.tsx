import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import ScoreBadge from "./ScoreBadge";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 6;
  const progress = score / 100;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - progress);

  const getGradientColors = () => {
    if (score > 69) {
      return {
        start: "#10b981", // emerald-500
        end: "#059669", // emerald-600
        glow: "#10b981",
      };
    } else if (score > 49) {
      return {
        start: "#f59e0b", // amber-500
        end: "#d97706", // amber-600
        glow: "#f59e0b",
      };
    } else {
      return {
        start: "#ef4444", // red-500
        end: "#dc2626", // red-600
        glow: "#ef4444",
      };
    }
  };

  const { start, end, glow } = getGradientColors();

  return (
    <div className="relative w-24 h-24 group">
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        style={{ backgroundColor: glow }}
      />

      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90 relative z-10"
      >
        <defs>
          <linearGradient
            id={`circleGrad-${score}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>

          {/* Animated shimmer */}
          <linearGradient
            id={`circleShimmer-${score}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#374151"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={`url(#circleGrad-${score})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Shimmer overlay */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={`url(#circleShimmer-${score})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-0.5">
          <ScoreBadge score={score} />
        </div>
        <span className="text-xs font-bold monty" style={{ color: start }}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
