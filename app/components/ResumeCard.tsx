import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [resume.imagePath]);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-500"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {resume.companyName && (
            <h2 className="break-words">{resume.companyName}</h2>
          )}

          {resume.jobTitle && (
            <h3 className="text-lg break-words !text-gray-400">
              {resume.jobTitle}
            </h3>
          )}

          {!resume.companyName && !resume.jobTitle && (
            <h2 className="break-words">Resume</h2>
          )}
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-600">
        <div className="w-full h-full">
          <img
            alt="resume"
            title="resume"
            src={resumeUrl}
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
