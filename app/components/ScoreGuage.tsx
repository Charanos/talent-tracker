import { useEffect, useRef, useState } from "react";
import { TrendingUp, Award, Target } from "lucide-react";
import ScoreBadge from "./ScoreBadge";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

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

  const getScoreIcon = () => {
    if (score > 69) return Award;
    if (score > 49) return TrendingUp;
    return Target;
  };

  const ScoreIcon = getScoreIcon();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-48 h-24 group">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: glow }}
        />

        <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
          <defs>
            <linearGradient
              id={`gaugeGradient-${score}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={start} />
              <stop offset="100%" stopColor={end} />
            </linearGradient>

            {/* Animated shimmer gradient */}
            <linearGradient
              id={`shimmerGradient-${score}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="transparent" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-100 0;100 0;-100 0"
                dur="2s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M15,45 A35,35 0 0,1 85,45"
            fill="none"
            stroke="#374151"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Foreground arc */}
          <path
            ref={pathRef}
            d="M15,45 A35,35 0 0,1 85,45"
            fill="none"
            stroke={`url(#gaugeGradient-${score})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
            className="transition-all duration-1000 ease-out"
          />

          {/* Shimmer overlay */}
          <path
            d="M15,45 A35,35 0 0,1 85,45"
            fill="none"
            stroke={`url(#shimmerGradient-${score})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Score and badge in a clean row */}
            <div className="flex flex-col-reverse justify-center items-center gap-1 pt-8">
              <div className="flex items-baseline">
                <span
                  className="text-lg font-medium monty"
                  style={{ color: start }}
                >
                  {score}
                </span>
                <span
                  className="text-sm font-medium monty opacity-70"
                  style={{ color: start }}
                >
                  %
                </span>
              </div>
              <ScoreBadge score={score} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
