import { useState } from "react";
import { FileText, Target, ListChecks } from "lucide-react";
import Summary from "../Summary";
import ATS from "../ATS";
import Details from "../Details";
import { cn } from "../../lib/utils";

interface FeedbackTabsProps {
  feedback: Feedback;
}

const FeedbackTabs = ({ feedback }: FeedbackTabsProps) => {
  const [activeTab, setActiveTab] = useState<"summary" | "ats" | "details">(
    "summary"
  );

  const tabs = [
    {
      id: "summary" as const,
      label: "Profile Summary",
      icon: <FileText className="w-4 h-4" />,
      description: "Overview & fit scores",
    },
    {
      id: "ats" as const,
      label: "ATS Readiness",
      icon: <Target className="w-4 h-4" />,
      description: "System compatibility check",
    },
    {
      id: "details" as const,
      label: "Detailed Evaluation",
      icon: <ListChecks className="w-4 h-4" />,
      description: "In-depth assessment",
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Tab Navigation */}
      <div className="bg-black/20 border border-white/10 backdrop-blur-lg rounded-xl p-1 mb-12">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white"
                  : "hover:bg-white/5 text-gray-400 hover:text-gray-200"
              )}
            >
              {/* Active Indicator */}
              {activeTab === tab.id && (
                <div className="absolute inset-x-0 -top-1 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              )}

              <div className="flex items-center gap-2 ">
                <span
                  className={cn(
                    "transition-colors duration-200",
                    activeTab === tab.id ? "text-purple-400" : ""
                  )}
                >
                  {tab.icon}
                </span>
                <span className="font-semibold monty text-sm">{tab.label}</span>
              </div>

              <span className="text-xs opacity-70 hidden sm:block">
                {tab.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            activeTab === "summary"
              ? "opacity-100 translate-x-0"
              : "opacity-0 absolute inset-0 -translate-x-full pointer-events-none"
          )}
        >
          {activeTab === "summary" && <Summary feedback={feedback} />}
        </div>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            activeTab === "ats"
              ? "opacity-100 translate-x-0"
              : "opacity-0 absolute inset-0 translate-x-full pointer-events-none"
          )}
        >
          {activeTab === "ats" && (
            <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips} />
          )}
        </div>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            activeTab === "details"
              ? "opacity-100 translate-x-0"
              : "opacity-0 absolute inset-0 translate-x-full pointer-events-none"
          )}
        >
          {activeTab === "details" && <Details feedback={feedback} />}
        </div>
      </div>
    </div>
  );
};

export default FeedbackTabs;
