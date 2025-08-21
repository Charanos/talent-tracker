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
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Evaluating candidate profile...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback)
      return setStatusText("Error: Failed to evaluate candidate profile");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Candidate evaluation complete, redirecting...");
    navigate(`/resume/${uuid}`);
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
          <h1>Developer Profile Vetting Pipeline</h1>

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
            <h2>
              Add candidate profiles for comprehensive role-fit evaluation and
              ATS readiness assessment
            </h2>
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
