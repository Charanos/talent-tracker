import { useEffect } from "react";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import { usePuterStore } from "~/lib/puter";
import ResumeCard from "~/components/ResumeCard";
import { useLocation, useNavigate } from "react-router";

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
  const { auth } = usePuterStore();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  return (
    <main>
      <Navbar />

      <section className="max-w-7xl mx-auto main-section">
        <Hero />
        {resumes.length > 0 && (
          <div className="resumes-section mb-20">
            {resumes.map((resume) => {
              return <ResumeCard key={resume.id} resume={resume} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
