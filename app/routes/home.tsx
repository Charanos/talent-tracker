import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import ResumeCard from "~/components/ResumeCard";
import Pagination from "~/components/Pagination";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Andishi - Talent Pipeline" },
    {
      name: "description",
      content:
        "AI-powered developer talent vetting and pipeline management for Andishi. Evaluate candidate profiles, assess role-fit, and streamline the talent pool selection process with comprehensive ATS readiness scoring.",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<CandidateProfile[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resumesPerPage = 5;

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.user && !loadingResumes) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, auth.user, loadingResumes]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumeData = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumeData.map(
        (resume) => JSON.parse(resume.value) as CandidateProfile
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="max-w-8xl mx-auto main-section">
        <Hero />

        {loadingResumes && (
          <div className="flex justify-center items-center flex-col">
            <img
              src="/images/resume-scan-2.gif"
              className="w-64 h-64"
              alt="loading-profiles"
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section mb-20 px-6 sm:px-0">
            {resumes
              .slice(
                (currentPage - 1) * resumesPerPage,
                currentPage * resumesPerPage
              )
              .map((resume) => {
                return <ResumeCard key={resume.id} resume={resume} />;
              })}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(resumes.length / resumesPerPage)}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex justify-center items-center gap-4 flex-col my-22">
            <h2 className="!text-2xl monty uppercase text-center">
              Reviewed profiles will appear here
            </h2>
            <p className="!text-base">
              Click "Analyze Resume" to begin vetting developer profiles
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
