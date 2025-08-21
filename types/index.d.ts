interface Role {
    title: string;
    description: string;
    location: string;
    requiredSkills: string[];
  }
  
  interface CandidateProfile {
    id: string;
    companyName?: string; // Always "Andishi" for internal vetting
    jobTitle?: string; // Target role for candidate
    imagePath: string; // Profile preview image
    resumePath: string; // Original PDF profile
    feedback: Feedback;
  }
  
  interface Feedback {
    overallScore: number;
    ATS: {
      score: number;
      tips: {
        type: "good" | "improve";
        tip: string;
      }[];
    };
    toneAndStyle: {
      score: number;
      tips: {
        type: "good" | "improve";
        tip: string;
        explanation: string;
      }[];
    };
    content: {
      score: number;
      tips: {
        type: "good" | "improve";
        tip: string;
        explanation: string;
      }[];
    };
    structure: {
      score: number;
      tips: {
        type: "good" | "improve";
        tip: string;
        explanation: string;
      }[];
    };
    skills: {
      score: number;
      tips: {
        type: "good" | "improve";
        tip: string;
        explanation: string;
      }[];
    };
  }