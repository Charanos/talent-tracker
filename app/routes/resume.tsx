import { ArrowLeft } from "lucide-react";
import FeedbackTabs from "../components/feedback/FeedbackTabs";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";

export const meta = () => {
  return [
    { title: "Andishi - Candidate Profile" },
    {
      name: "description",
      content: "View comprehensive candidate evaluation and role-fit assessment - Andishi Talent Pipeline",
    },
  ];
};

const resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, ai, kv } = usePuterStore();

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    if (!auth.isAuthenticated && !isLoading) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);

      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });

      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };
    loadResume();

    console.log(imageUrl, resumeUrl, feedback);
  }, [id]);

  return (
    <main className="relative w-full">
      <nav className="absolute top-0 z-50 w-full resume-nav">
        <Link to="/" className="back-button">
          <ArrowLeft className="size-4" />
          <span className="text-xs monty uppercase">back to pipeline</span>
        </Link>
      </nav>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="flex flex-row w-full max-lg:flex-col-reverse py-22 max-w-7xl mx-auto">
        <section className="feedback-section ">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-500 gradient-border max-sm:m-0 h-[90%] max-w-7xl sm:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="candidate-profile"
                  title="candidate-profile"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="capitalize !text-2xl">Candidate Evaluation Report</h2>

          {feedback ? (
            <div className="animate-in fade-in duration-500">
              <FeedbackTabs feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="profile-loading" />
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;
