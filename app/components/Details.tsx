import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";
import {
  Palette,
  FileText,
  Layout,
  Code,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import ScoreBadge from "./ScoreBadge";

interface DetailsProps {
  feedback: Feedback;
}

const Details = ({ feedback }: DetailsProps) => {
  const sections = [
    {
      id: "tone-style",
      title: "Tone & Style",
      icon: <Palette className="w-5 h-5" />,
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
      description:
        "Writing tone, language style, and professional presentation",
    },
    {
      id: "content",
      title: "Content",
      icon: <FileText className="w-5 h-5" />,
      score: feedback.content.score,
      tips: feedback.content.tips,
      description: "Relevance, completeness, and quality of information",
    },
    {
      id: "structure",
      title: "Structure",
      icon: <Layout className="w-5 h-5" />,
      score: feedback.structure.score,
      tips: feedback.structure.tips,
      description: "Organization, formatting, and visual hierarchy",
    },
    {
      id: "skills",
      title: "Skills",
      icon: <Code className="w-5 h-5" />,
      score: feedback.skills.score,
      tips: feedback.skills.tips,
      description: "Technical skills, keywords, and competency presentation",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score > 69) return "text-emerald-400";
    if (score > 49) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="w-full bg-black/10 border border-gray-900/90 backdrop-blur-lg rounded-2xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold monty mb-2">Detailed Analysis</h2>
        <p className="text-sm text-gray-400">
          Comprehensive breakdown of your resume's performance across key areas
        </p>
      </div>

      <Accordion allowMultiple className="space-y-3">
        {sections.map((section) => {
          const goodTips = section.tips.filter((tip) => tip.type === "good");
          const improveTips = section.tips.filter(
            (tip) => tip.type === "improve"
          );

          return (
            <AccordionItem
              key={section.id}
              id={section.id}
              className="bg-black/20 border border-white/10 rounded-xl overflow-hidden hover:bg-black/30 transition-all duration-200"
            >
              <AccordionHeader
                itemId={section.id}
                className="hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {section.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold monty">
                          {section.title}
                        </h3>
                        <ScoreBadge score={section.score} />
                      </div>
                      <p className="text-xs text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span
                        className={`text-xl font-bold monty ${getScoreColor(
                          section.score
                        )}`}
                      >
                        {section.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionHeader>

              <AccordionContent itemId={section.id} className="bg-black/10">
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="px-2">
                    <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ease-out rounded-full ${
                          section.score > 69
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                            : section.score > 49
                              ? "bg-gradient-to-r from-amber-500 to-amber-400"
                              : "bg-gradient-to-r from-red-500 to-red-400"
                        }`}
                        style={{ width: `${Math.max(section.score, 5)}%` }}
                      />
                    </div>
                  </div>

                  {/* Tips Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Strengths */}
                    {goodTips.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-sm font-semibold monty text-emerald-400">
                            Strengths ({goodTips.length})
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {goodTips.map((tip, index) => (
                            <div
                              key={index}
                              className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3"
                            >
                              <p className="text-sm text-gray-200 mb-1">
                                {tip.tip}
                              </p>
                              {tip.explanation && (
                                <p className="text-xs text-gray-400 italic">
                                  {tip.explanation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Improvements */}
                    {improveTips.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          <h4 className="text-sm font-semibold monty text-amber-400">
                            Improvements ({improveTips.length})
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {improveTips.map((tip, index) => (
                            <div
                              key={index}
                              className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-3"
                            >
                              <p className="text-sm text-gray-200 mb-1">
                                {tip.tip}
                              </p>
                              {tip.explanation && (
                                <p className="text-xs text-gray-400 italic">
                                  {tip.explanation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Empty State */}
                  {section.tips.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-gray-400 text-sm">
                        No specific feedback available for this section
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Details;
