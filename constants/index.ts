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
    Please analyze this developer profile for role-fit and technical alignment.
    Evaluate the candidate's suitability for inclusion in Andishi's talent pool.
    Be thorough and objective in your assessment. Focus on technical competencies, experience quality, and role alignment.
    If the profile has significant gaps or misalignments, provide honest scores to help improve candidate selection.
    Consider ATS readiness for potential client opportunities.
    Use the provided role requirements to assess fit and alignment.
    The target role is: ${jobTitle}
    The role requirements are: ${jobDescription}
    Provide the evaluation using the following format: ${AIResponseFormat}
    Return the analysis as a JSON object, without any other text and without the backticks.
    Do not include any other text or comments.`;