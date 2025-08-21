export const resumes: CandidateProfile[] = [
    {
      id: "1",
      companyName: "Google",
      jobTitle: "Frontend Developer",
      imagePath: "/images/resume_01.png",
      resumePath: "/resumes/resume-1.pdf",
      feedback: {
        overallScore: 85,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "2",
      companyName: "Microsoft",
      jobTitle: "Cloud Engineer",
      imagePath: "/images/resume_02.png",
      resumePath: "/resumes/resume-2.pdf",
      feedback: {
        overallScore: 55,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "3",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      resumePath: "/resumes/resume-3.pdf",
      feedback: {
        overallScore: 75,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "4",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      resumePath: "/resumes/resume-3.pdf",
      feedback: {
        overallScore: 75,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "5",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      resumePath: "/resumes/resume-3.pdf",
      feedback: {
        overallScore: 75,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
    {
      id: "6",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      resumePath: "/resumes/resume-3.pdf",
      feedback: {
        overallScore: 75,
        ATS: {
          score: 90,
          tips: [],
        },
        toneAndStyle: {
          score: 90,
          tips: [],
        },
        content: {
          score: 90,
          tips: [],
        },
        structure: {
          score: 90,
          tips: [],
        },
        skills: {
          score: 90,
          tips: [],
        },
      },
    },
  ];
  
  export const AIResponseFormat = `
        interface Feedback {
        overallScore: number; //max 100
        ATS: {
          score: number; //rate based on ATS suitability
          tips: {
            type: "good" | "improve";
            tip: string; //give 3-4 tips
          }[];
        };
        toneAndStyle: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        content: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        structure: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
        skills: {
          score: number; //max 100
          tips: {
            type: "good" | "improve";
            tip: string; //make it a short "title" for the actual explanation
            explanation: string; //explain in detail here
          }[]; //give 3-4 tips
        };
      }`;
  
  export const prepareInstructions = ({
    jobTitle,
    jobDescription,
  }: {
    jobTitle: string;
    jobDescription: string;
  }) =>
    `You are an expert in technical talent assessment and developer profile evaluation for Andishi's talent pipeline.
  Please analyze this developer profile for role-fit and technical alignment with high standards.
  Evaluate the candidate's suitability for inclusion in Andishi's talent pool, maintaining strict but fair assessment criteria.
  Focus on technical competencies, experience quality, role alignment, and specific skill match to the job description.
  Be stringent in your evaluation - only award high scores for truly exceptional matches to requirements.
  Prioritize precision in matching technical requirements over general experience.
  IMPORTANT: Parse the target role title to determine seniority. If the title includes senior-level terms (e.g., "Senior", "Sr", "Lead", "Staff", "Principal"), enforce a higher minimum relevant experience threshold:
    - Senior/Sr/Lead: expect 5+ years of directly relevant, recent experience.
    - Staff/Principal: expect 8+ years of directly relevant, recent experience.
    - Mid-level: typically 3–5 years.
    - Junior/Associate: typically 0–2 years (do not penalize for lower tenure if the role implies junior level).
  Count only hands-on, relevant experience with the required stack; exclude unrelated roles or outdated tech when estimating years. If the candidate does not meet the implied seniority threshold, reflect this with lower scores and clear improvement tips.
  If the profile has any gaps or misalignments with the role requirements, provide honest scores that reflect these shortcomings.
  Consider ATS readiness for potential client opportunities with emphasis on keyword matching and format compliance.
  Use the provided role requirements to assess fit and alignment with zero tolerance for vague or irrelevant content.
  The target role is: ${jobTitle}
  The role requirements are: ${jobDescription}
  Provide the evaluation using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;