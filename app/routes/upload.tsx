import Navbar from "~/components/Navbar";
import { useNavigate } from "react-router";
import { generateUUID } from "~/lib/utils";
import { usePuterStore } from "~/lib/puter";
import { useState, type FormEvent } from "react";
import { convertPdfToImage } from "~/lib/pdf2img";
import FileUploader from "~/components/FileUploader";
import { prepareInstructions } from "../../constants";

export const meta = () => {
  return [
    { title: "Andishi - Analyze Resume" },
    {
      name: "description",
      content:
        "Add developer profiles to Andishi's talent pipeline for comprehensive vetting and evaluation",
    },
  ];
};

const upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Processing candidate profile...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to process profile");

    setStatusText("Preparing for evaluation...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      console.error("Profile conversion error:", imageFile.error);
      return setStatusText(
        `Error: ${imageFile.error || "Failed to prepare profile for evaluation"}`
      );
    }

    setStatusText("Finalizing profile data...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage)
      return setStatusText("Error: Failed to finalize profile");

    setStatusText("Initializing vetting pipeline...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: {} as Feedback,
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Evaluating candidate profile...");

    let feedback: any;
    try {
      feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );
      
      console.log("AI feedback received:", feedback);
      
      if (!feedback) {
        console.error("AI feedback returned null/undefined");
        return setStatusText("Error: Failed to evaluate candidate profile - AI service unavailable");
      }

      // Check if the response indicates an error
      if (feedback.success === false || feedback.error) {
        console.error("AI service error:", feedback.error);
        
        // Handle specific error types
        if (feedback.error?.code === 'error_400_from_delegate' || 
            feedback.error?.message?.includes('Permission denied') ||
            feedback.error?.message?.includes('usage-limited-chat') ||
            feedback.error?.message?.includes('401') ||
            feedback.error?.message?.includes('Unauthorized')) {
          return setStatusText("Error: AI service access denied. Please sign in to Puter and ensure you have AI credits available.");
        }
        
        if (feedback.error?.message?.includes('rate limit') ||
            feedback.error?.message?.includes('quota')) {
          return setStatusText("Error: AI service usage limit reached. Please try again later.");
        }
        
        const errorMessage = feedback.error?.message || feedback.error || "AI service unavailable";
        return setStatusText(`Error: ${errorMessage}`);
      }

      // Check if we have the expected message structure
      if (!feedback.message || !feedback.message.content) {
        console.error("Unexpected AI response format:", feedback);
        return setStatusText("Error: Invalid response from AI service - please try again");
      }
      
      let feedbackText: string;
      try {
        feedbackText = typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0]?.text || JSON.stringify(feedback.message.content);
      } catch (parseError) {
        console.error("Error parsing AI response content:", parseError);
        return setStatusText("Error: Unable to parse AI response - please try again");
      }

      try {
        data.feedback = JSON.parse(feedbackText);
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError);
        console.log("Raw feedback text:", feedbackText);
        // Store a fallback feedback structure if JSON parsing fails
        data.feedback = {
          overallScore: 0,
          ATS: { score: 0, tips: [{ type: "improve" as const, tip: "Unable to parse AI response. Please try again." }] },
          toneAndStyle: { score: 0, tips: [{ type: "improve" as const, tip: "Response parsing failed", explanation: feedbackText }] },
          content: { score: 0, tips: [{ type: "improve" as const, tip: "Response parsing failed", explanation: "AI service returned invalid format" }] },
          structure: { score: 0, tips: [{ type: "improve" as const, tip: "Response parsing failed", explanation: "Please try uploading again" }] },
          skills: { score: 0, tips: [{ type: "improve" as const, tip: "Response parsing failed", explanation: "AI analysis incomplete" }] }
        };
      }
      
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Candidate evaluation complete, redirecting...");
      navigate(`/resume/${uuid}`);
    } catch (error) {
      console.error("AI feedback error:", error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          return setStatusText("Error: Authentication required. Please sign in to Puter to use AI services.");
        }
        if (error.message.includes('403') || error.message.includes('Forbidden')) {
          return setStatusText("Error: Access denied to AI service. Please check your Puter account permissions.");
        }
        if (error.message.includes('429') || error.message.includes('rate limit')) {
          return setStatusText("Error: Too many requests. Please wait a moment and try again.");
        }
        if (error.message.includes('network') || error.message.includes('fetch')) {
          return setStatusText("Error: Network connection issue. Please check your internet and try again.");
        }
      }
      
      return setStatusText(`Error: ${error instanceof Error ? error.message : 'Failed to evaluate candidate profile'}`);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const jobTitleInput = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    const companyName = "Andishi";
    const jobTitle = jobTitleInput || "";

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main>
      <Navbar />

      <section className="max-w-7xl mx-auto main-section px-6 sm:px-0">
        <div className="page-heading py-22 capitalize">
          <h1 className="mb-6 !text-4xl sm:!text-5xl leading-tight">
            Developer Profile Vetting Pipeline
          </h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="profile evaluation"
                className="w-full max-w-[400px] h-[400px]"
              />
            </>
          ) : (
            <p className="text-base sm:text-xl text-gray-300 mb-6 leading-relaxed max-w-6xl">
              Add candidate CVs or paste profile links to receive structured
              evaluations tailored for Andishi's developer talent pipeline —
              role-fit scores, strengths & gaps, ATS readiness, recommended
              interview questions, and suggested next steps for shortlisting.
            </p>
          )}

          {!isProcessing && (
            <form
              className="flex flex-col bg-white/10 backdrop-blur-3xl w-full max-w-7xl p-4 rounded-2xl shadow-lg gap-4 mt-6"
              onSubmit={handleSubmit}
            >
              <div className="form-div">
                <label htmlFor="job-title">Target Role</label>

                <input
                  type="text"
                  name="job-title"
                  placeholder="Developer Role Title"
                  id="job-title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Role Requirements</label>

                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Technical requirements and expectations"
                  id="job-description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="resume">Candidate Profile</label>

                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button
                type="submit"
                className="primary-button mt-2"
                disabled={!file}
              >
                Evaluate Candidate
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
