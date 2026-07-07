import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resumeService } from "@/services/resumeService";
import type { ParsedResume } from "@/types";

export const useParseResume = () => {
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const parseResumeMutation = useMutation({
    mutationFn: (file: File) => resumeService.parseResume(file),
  });

  const parseResume = async (
    file: File,
    onFileSelected: (file: File) => void
  ) => {
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith(".txt")) {
      setError("Please upload a PDF, DOC, DOCX, or TXT file");
      return;
    }

    setFileName(file.name);
    setError(null);
    setParsedData(null);

    parseResumeMutation.mutate(file, {
      onSuccess: (data) => {
        if (data.success) {
          setParsedData(data.data);
          onFileSelected(file);
        } else {
          setError(data.message || "Failed to parse resume");
        }
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || "Failed to parse resume");
      },
    });
  };

  const resetParser = () => {
    setParsedData(null);
    setFileName(null);
    setError(null);
  };

  return {
    isLoading: parseResumeMutation.isPending,
    parsedData,
    error,
    fileName,
    parseResume,
    resetParser,
    setParsedData,
    setFileName,
  };
};
