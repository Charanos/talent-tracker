import {
  Bot,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react";
import ScoreBadge from "./ScoreBadge";
import ScoreCircle from "./ScoreCircle";

interface ATSProps {
  score: number;
  suggestions: {
    type: "good" | "improve";
    tip: string;
  }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  const getScoreColor = (score: number) => {
    if (score > 69) return "text-emerald-400";
    if (score > 49) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score > 69) return "from-emerald-500/20 to-emerald-600/10";
    if (score > 49) return "from-amber-500/20 to-amber-600/10";
    return "from-red-500/20 to-red-600/10";
  };

  const goodTips = suggestions.filter((tip) => tip.type === "good");
  const improveTips = suggestions.filter((tip) => tip.type === "improve");

  return (
    <div className="w-full bg-black/10 border border-gray-900/90 backdrop-blur-lg rounded-2xl shadow-md p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold monty">ATS Compatibility</h2>
            <p className="text-sm text-gray-400">
              Applicant Tracking System Analysis
            </p>
          </div>
        </div>

        {/* Score Display */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-2xl font-bold monty ${getScoreColor(score)}`}
              >
                {score}%
              </span>
              <ScoreBadge score={score} />
            </div>
            <p className="text-xs text-gray-400 monty uppercase tracking-wide">
              ATS Score
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getScoreGradient(score)} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${Math.max(score, 5)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between mt-2 px-1 text-xs text-gray-500">
          <span>Poor</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {goodTips.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold monty text-emerald-400">
                Strengths
              </h3>
              <div className="flex-1 h-px bg-emerald-400/20" />
              <span className="text-xs bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full">
                {goodTips.length}
              </span>
            </div>

            <div className="space-y-3">
              {goodTips.map((tip, index) => (
                <div
                  key={index}
                  className="group bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 hover:bg-emerald-900/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-emerald-500/20 rounded-full mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed flex-1">
                      {tip.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvements */}
        {improveTips.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold monty text-amber-400">
                Improvements
              </h3>
              <div className="flex-1 h-px bg-amber-400/20" />
              <span className="text-xs bg-amber-900/30 text-amber-400 px-2 py-1 rounded-full">
                {improveTips.length}
              </span>
            </div>

            <div className="space-y-3">
              {improveTips.map((tip, index) => (
                <div
                  key={index}
                  className="group bg-amber-900/20 border border-amber-500/20 rounded-lg p-4 hover:bg-amber-900/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-amber-500/20 rounded-full mt-0.5">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed flex-1">
                      {tip.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {suggestions.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400">No ATS suggestions available</p>
        </div>
      )}
    </div>
  );
};

export default ATS;
