import ScoreGauge from "./ScoreGuage";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const getScoreColor = (score: number) => {
    if (score > 69) return "text-emerald-400";
    if (score > 49) return "text-amber-400";
    return "text-red-400";
  };

  const getProgressWidth = (score: number) => `${Math.max(score, 5)}%`;

  const getProgressColor = (score: number) => {
    if (score > 69) return "bg-gradient-to-r from-emerald-500 to-emerald-400";
    if (score > 49) return "bg-gradient-to-r from-amber-500 to-amber-400";
    return "bg-gradient-to-r from-red-500 to-red-400";
  };

  return (
    <div className="group relative bg-black/20 border border-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-black/30 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      <div className="relative z-10">
        {/* Header with title and badge */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold monty text-gray-200 group-hover:text-white transition-colors">
            {title}
          </h3>
          <ScoreBadge score={score} />
        </div>

        {/* Score display */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold monty ${getScoreColor(score)} transition-colors`}>
              {score}
            </span>
            <span className="text-sm text-gray-400 monty">/ 100</span>
          </div>
          
          {/* Score percentage indicator */}
          <div className="text-xs text-gray-400 monty">
            {score > 69 ? "Excellent" : score > 49 ? "Good" : "Improve"}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(score)} transition-all duration-700 ease-out rounded-full relative`}
              style={{ width: getProgressWidth(score) }}
            >
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Progress markers */}
          <div className="flex justify-between mt-1 px-1">
            <span className="text-xs text-gray-500">0</span>
            <span className="text-xs text-gray-500">50</span>
            <span className="text-xs text-gray-500">100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="w-full bg-black/10 border border-gray-900/90 backdrop-blur-lg rounded-2xl shadow-md p-6">
      {/* Header Section */}
      <div className="flex flex-row max-sm:flex-col items-center gap-8 mb-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Your Resume Score</h2>
          <p className="text-sm text-gray-400">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};

export default Summary;
