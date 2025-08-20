import { useCallback } from "react";
import { Info, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full p-4 rounded-2xl bg-black/70 cursor-pointer">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="size-6" />
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    ({formatSize(file.size)})
                  </p>
                </div>
              </div>

              <button
                className="p-[0.5px] hover:bg-white/10 bg-white/5 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <X className="size-6 text-red-400 p-1" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-2">
                <Info className="size-10 text-blue-400" />
              </div>

              <p className="text-md text-gray-300">
                <span className="font-medium">Click to upload</span> or Drag and
                drop your resume here
              </p>

              <p className="text-sm text-gray-400">
                PDF (max {formatSize(20 * 1024 * 1024)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
