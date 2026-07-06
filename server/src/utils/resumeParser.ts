import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import logger from "./logger";

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}

function parseResumeLocally(text: string): ParsedResume {
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  const phoneMatch = text.match(
    /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
  );

  const knownSkills = [
    "javascript",
    "typescript",
    "react",
    "node.js",
    "nodejs",
    "express",
    "mongodb",
    "sql",
    "python",
    "java",
    "c++",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "html",
    "css",
    "tailwind",
    "next.js",
    "nextjs",
    "graphql",
    "postgresql",
    "redis",
    "firebase",
    "angular",
    "vue",
    "svelte",
    "rust",
    "go",
    "golang",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "rest api",
    "microservices",
    "ci/cd",
    "linux",
    "nginx",
  ];

  const textLower = text.toLowerCase();
  const foundSkills = knownSkills.filter((skill) => textLower.includes(skill));

  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  const possibleName = lines[0]?.trim().substring(0, 50) || "Candidate";

  return {
    name: possibleName,
    email: emailMatch ? emailMatch[0] : "",
    phone: phoneMatch ? phoneMatch[0] : "",
    bio: `Experienced professional with skills in ${foundSkills.slice(0, 5).join(", ") || "software development"}.`,
    skills: foundSkills.length > 0 ? foundSkills : ["Software Development"],
    experience: [],
    education: [],
  };
}

export async function parseResumeWithAI(
  resumeText: string,
): Promise<ParsedResume> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    logger.info("GEMINI_API_KEY not set, using local resume parser fallback");
    return parseResumeLocally(resumeText);
  }

  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey,
      temperature: 0.1,
    });

    const prompt = `
You are an expert resume parser. Extract structured information from the following resume text.

Resume Text:
"""
${resumeText.substring(0, 4000)}
"""

Respond ONLY with a valid JSON object (no markdown, no code blocks). The JSON must have this exact shape:
{
  "name": "string (full name of the candidate)",
  "email": "string (email address, empty string if not found)",
  "phone": "string (phone number, empty string if not found)",
  "bio": "string (a concise 2-3 sentence professional summary)",
  "skills": ["string (list of technical and professional skills found)"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string (e.g., 'Jan 2022 - Present')",
      "description": "string (brief description of responsibilities)"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "year": "string"
    }
  ]
}
`;

    const response = await model.invoke(prompt);
    const text =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(cleanText) as ParsedResume;

    return {
      name: parsed.name || "Candidate",
      email: parsed.email || "",
      phone: parsed.phone || "",
      bio: parsed.bio || "",
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      education: Array.isArray(parsed.education) ? parsed.education : [],
    };
  } catch (error) {
    logger.error(
      "AI resume parsing failed, falling back to local parser",
      error,
    );
    return parseResumeLocally(resumeText);
  }
}
