import { useState, useRef } from "react";
import { useParseResume } from "@/hooks/useParseResume";
import { Upload, FileText, Sparkles, Loader2, CheckCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import type { ParsedResume } from "@/types";

interface ResumeParserProps {
  onFileSelected: (file: File) => void;
  onParsed: (data: ParsedResume) => void;
  onReset: () => void;
}

function ResumeParser({ onFileSelected, onParsed, onReset }: ResumeParserProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isLoading,
    parsedData,
    error,
    fileName,
    parseResume,
    resetParser,
  } = useParseResume();

  const handleFile = (file: File) => {
    parseResume(file, onFileSelected);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleApply = () => {
    if (parsedData) {
      onParsed(parsedData);
      resetParser();
    }
  };

  const reset = () => {
    resetParser();
    if (fileInputRef.current) fileInputRef.current.value = "";
    onReset();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!parsedData && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-zinc-300 hover:border-primary/50 hover:bg-zinc-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleInputChange}
            className="hidden"
          />

          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <div>
                <p className="text-sm font-medium text-zinc-700">
                  AI is analyzing your resume...
                </p>
                <p className="text-xs text-zinc-400 mt-1">{fileName}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700">
                  Drop your resume here or{" "}
                  <span className="text-primary">click to browse</span>
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  PDF, TXT, DOC, DOCX • AI will extract your skills & experience
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          <X className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Parsed Results */}
      {parsedData && (
        <div className="bg-gradient-to-br from-primary/5 to-violet-50 border border-primary/20 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-sm text-zinc-800">
                AI Extracted Data
              </h4>
            </div>
            <button onClick={reset} className="text-zinc-400 hover:text-zinc-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          {parsedData.bio && (
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1">Bio</p>
              <p className="text-sm text-zinc-700">{parsedData.bio}</p>
            </div>
          )}

          {parsedData.skills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1.5">
                Skills Found ({parsedData.skills.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {parsedData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs bg-white border border-primary/20 text-primary rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {parsedData.experience.length > 0 && (
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1.5">Experience</p>
              <div className="space-y-2">
                {parsedData.experience.slice(0, 3).map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-zinc-700"
                  >
                    <FileText className="h-3.5 w-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <span className="font-medium">{exp.role}</span>
                      {exp.company && ` at ${exp.company}`}
                      {exp.duration && ` (${exp.duration})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleApply}
              className="bg-primary hover:bg-primary/90 text-white text-sm rounded-lg"
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Auto-fill Profile
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="text-sm rounded-lg"
            >
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeParser;
