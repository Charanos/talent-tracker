import { useState, useEffect } from "react";
import {
  ArrowRight,
  Upload,
  BarChart3,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Link } from "react-router";

const EnhancedHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "10K+", label: "Candidate Profiles Processed", icon: FileText },
    { number: "95%", label: "Role-Fit Accuracy", icon: CheckCircle },
    { number: "2.5x", label: "Shortlist Rate", icon: TrendingUp },
    { number: "500+", label: "Hiring Partners", icon: Users },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 my-12">
        <div
          className={`page-heading transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="sm:inline-flex hidden items-center gap-2 px-4 py-2 !bg-white/10 backdrop-blur-md rounded-full mb-6 group hover:scale-105 transition-transform duration-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm  font-medium text-gray-300 monty uppercase">
              AI-assisted • Pipeline-ready insights
            </span>
            <Zap className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 !text-4xl sm:!text-5xl leading-tight">
            Candidate Vetting &amp;
            <br />
            <span className="">
              Talent Pool Scoring
              <div className="absolute -bottom-2 left-0 right-0 h-1 !bg-gradient-to-r !from-blue-500/60 !via-purple-500/60 !to-cyan-500/60 rounded-full"></div>
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-base sm:text-xl text-gray-300 mb-6 leading-relaxed max-w-6xl">
              Add candidate CVs or paste profile links to receive structured
              evaluations tailored for Andishi's developer talent pipeline —
              role-fit scores, strengths & gaps, ATS readiness, recommended
              interview questions, and suggested next steps for shortlisting.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 items-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Link
              to={"/upload"}
              className="primary-button group flex items-center gap-3 max-w-xs hover:scale-105"
            >
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Uploaad Resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
