import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Andishi - Talent Tracker" },
    {
      name: "description",
      content:
        "An AI-powered Resume Analyzer with React, React Router, and Puter.js! Create job listings, upload candidate resumes, and use AI to automatically evaluate and match resumes to job requirements.",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="max-w-7xl mx-auto main-section">
        <Hero />

        {loadingResumes && (
          <div className="flex justify-center items-center flex-col">
            <img
              src="/images/resume-scan-2.gif"
              className="w-64 h-64"
              alt="resume-scan"
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section mb-20 px-6 sm:px-0">
            {resumes.map((resume) => {
              return <ResumeCard key={resume.id} resume={resume} />;
            })}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex justify-center items-center flex-col my-22 monty uppercase">
            <p className="text-2xl">No resumes found</p>
          </div>
        )}
      </section>
    </main>
  );
}
