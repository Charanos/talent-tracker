import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import {
  Building2,
  Briefcase,
  Calendar,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  Star,
  Eye,
  ChevronRight,
  Award,
  Target,
  Zap,
  User,
} from "lucide-react";

const ResumeCard = ({ resume }: { resume: CandidateProfile }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [resume.imagePath]);

  const getScoreBadgeClass = (score: number) => {
    if (score >= 80)
      return "bg-green-500/20 text-green-300 border-green-500/30";
    if (score >= 60)
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  // Top evaluation categories with defensive checks
  const categories = {
    "Role Fit": { score: resume.feedback.ATS?.score || 0, icon: Target },
    Skills: { score: resume.feedback.skills?.score || 0, icon: Star },
    Structure: {
      score: resume.feedback.structure?.score || 0,
      icon: Building2,
    },
    Content: { score: resume.feedback.content?.score || 0, icon: FileText },
  };

  const topCategories = Object.entries(categories)
    .sort(([, a], [, b]) => (b.score || 0) - (a.score || 0))
    .slice(0, 3);

  const improvementTips = [
    ...(resume.feedback.ATS?.tips || [])
      .filter((tip) => tip.type === "improve")
      .slice(0, 1),
    ...(resume.feedback.content?.tips || [])
      .filter((tip) => tip.type === "improve")
      .slice(0, 1),
  ].slice(0, 2);

  const strengths = [
    ...(resume.feedback.ATS?.tips || [])
      .filter((tip) => tip.type === "good")
      .slice(0, 1),
    ...(resume.feedback.skills?.tips || [])
      .filter((tip) => tip.type === "good")
      .slice(0, 1),
  ].slice(0, 2);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card-horizontal group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[280px]">
        {/* Left Section - Resume Preview (Full Height) */}
        <div className="flex-shrink-0 lg:w-80 h-full">
          <div className="relative h-full min-h-[200px] lg:min-h-[280px] overflow-hidden rounded-xl border border-white/10 bg-black/20">
            <img
              alt="candidate-profile"
              title="candidate-profile"
              src={resumeUrl}
              className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-white text-xs font-medium flex items-center gap-2">
                  <Eye className="w-3 h-3" />
                  <span>View Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="flex-1 flex flex-col justify-between min-h-0">
          {/* Header Information */}
          <div className="space-y-3">
            {/* Title and Company with Score */}
            <div className="space-y-2">
              {resume.companyName && (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 truncate">
                      {resume.companyName}
                    </h2>
                  </div>
                  {/* Score Circle beside title */}
                  <div className="relative flex-shrink-0">
                    <ScoreCircle score={resume.feedback.overallScore} />
                    {isHovered && (
                      <div className="absolute -top-1 -right-1 animate-in zoom-in duration-200">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {resume.jobTitle && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <h3 className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300 truncate">
                    {resume.jobTitle}
                  </h3>
                </div>
              )}

              {!resume.companyName && !resume.jobTitle && (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      Candidate Profile
                    </h2>
                  </div>
                  {/* Score Circle beside title */}
                  <div className="relative flex-shrink-0">
                    <ScoreCircle score={resume.feedback.overallScore} />
                    {isHovered && (
                      <div className="absolute -top-1 -right-1 animate-in zoom-in duration-200">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {topCategories.map(([category, { score, icon: Icon }]) => (
                <div
                  key={category}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-300 truncate">
                      {category}
                    </p>
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getScoreBadgeClass(score)} mt-1`}
                    >
                      {score}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-4 space-y-3">
            {/* Strengths */}
            {strengths.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Key Strengths
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {strengths.slice(0, 1).map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-300 leading-relaxed">
                        {strength.tip.length > 80
                          ? `${strength.tip.substring(0, 80)}...`
                          : strength.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Areas */}
            {improvementTips.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Growth Opportunities
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {improvementTips.slice(0, 1).map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
                    >
                      <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-300 leading-relaxed">
                        {tip.tip.length > 80
                          ? `${tip.tip.substring(0, 80)}...`
                          : tip.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Evaluation Complete</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-medium">
                <span>View Full Report</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
