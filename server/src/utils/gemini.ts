import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export interface AIAssessmentReport {
  score: number;
  feedback: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  recommendations: string[];
}

// Local fallback assessment matcher
export function generateLocalFallbackAssessment(
  applicantName: string,
  applicantBio: string,
  applicantSkills: string[],
  jobTitle: string,
  jobRequirements: string[]
): AIAssessmentReport {
  const reqsArray = jobRequirements.map((s) => s.trim().toLowerCase());
  const skillsArray = (applicantSkills || []).map((s) => s.trim().toLowerCase());

  // Find matches
  const matched = (applicantSkills || []).filter((skill) =>
    reqsArray.some(
      (req) =>
        req.includes(skill.toLowerCase()) || skill.toLowerCase().includes(req)
    )
  );

  const missing = jobRequirements.filter(
    (req) =>
      !skillsArray.some(
        (skill) =>
          req.toLowerCase().includes(skill) || skill.includes(req.toLowerCase())
      )
  );

  // Score computation
  const matchRatio = jobRequirements.length > 0 ? matched.length / jobRequirements.length : 0.5;
  let score = Math.round(60 + matchRatio * 30 + (applicantName.length % 9));
  if (score > 98) score = 98;
  if (score < 45) score = 45;

  let feedback = "";
  let strengths: string[] = [];
  let recommendations: string[] = [];

  if (score >= 80) {
    feedback = `${applicantName} shows high compatibility for the ${jobTitle} role. Their skills strongly align with core competencies like ${matched.slice(0, 3).join(", ") || "the core stack"}.`;
    strengths = [
      `Excellent matching profile for: ${matched.slice(0, 2).join(", ") || "required skills"}`,
      "Solid alignment with primary responsibilities of the role",
      "Demonstrates relevant background and hands-on skill match",
    ];
    recommendations = [
      "Move forward to a technical round directly",
      "Discuss their experience applying these tools in past projects",
    ];
  } else if (score >= 65) {
    feedback = `${applicantName} possesses key foundational skills for ${jobTitle}, particularly in ${matched.slice(0, 2).join(", ") || "key areas"}. However, there are skill gaps in ${missing.slice(0, 2).join(", ") || "certain requirements"}.`;
    strengths = [
      `Familiarity with key frameworks: ${matched.slice(0, 2).join(", ") || "skills"}`,
      "Good foundational technical aptitude",
    ];
    recommendations = [
      `Assess capability or learning interest in: ${missing.slice(0, 2).join(", ") || "missing tools"}`,
      "Consider for initial technical screening",
    ];
  } else {
    feedback = `${applicantName}'s current skillset has limited overlap with the requirements for ${jobTitle}. They lack exposure to crucial skills like ${missing.slice(0, 3).join(", ") || "requested technologies"}.`;
    strengths = [
      "General software engineering or technical experience",
      "Transferable technical concepts",
    ];
    recommendations = [
      "Brief screen to verify foundational skills or adaptability",
      "Assess interest in training or junior tracks",
    ];
  }

  return {
    score,
    feedback,
    matchedSkills: matched.length > 0 ? matched : ["General Tech Support"],
    missingSkills: missing.length > 0 ? missing : ["Advanced Stack Details"],
    strengths,
    recommendations,
  };
}

export const generateAIAssessment = async (
  applicant: { name: string; profile?: { bio?: string; skills: string[] } },
  jobTitle: string,
  jobRequirements: string[],
  jobDescription: string = ""
): Promise<AIAssessmentReport> => {
  const apiKey = process.env.GEMINI_API_KEY;
  const applicantName = applicant.name || "Candidate";
  const applicantBio = applicant.profile?.bio || "";
  const applicantSkills = applicant.profile?.skills || [];

  if (!apiKey) {
    console.log("GEMINI_API_KEY not configured. Using local fallback assessment.");
    return generateLocalFallbackAssessment(
      applicantName,
      applicantBio,
      applicantSkills,
      jobTitle,
      jobRequirements
    );
  }

  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      apiKey: apiKey,
      temperature: 0.2,
    });

    const prompt = `
You are an expert AI HR recruiter and talent acquisition agent.
Analyze the following candidate's profile against the job requirements and output a valid JSON report.

Job Title: ${jobTitle}
Job Requirements: ${JSON.stringify(jobRequirements)}
Job Description: ${jobDescription}

Candidate Name: ${applicantName}
Candidate Bio: ${applicantBio}
Candidate Skills: ${JSON.stringify(applicantSkills)}

Respond ONLY with a JSON object. Do not include any markdown formatting (like \`\`\`json) or extra text. The JSON object must have this exact shape:
{
  "score": number (an integer between 0 and 100 representing the match percentage based on skills, experience, and role alignment),
  "feedback": "string (a concise 2-3 sentence overview of their fit)",
  "matchedSkills": ["string" (skills the candidate has that align with the job)],
  "missingSkills": ["string" (skills requested in the job requirements but missing from the candidate's profile)],
  "strengths": ["string" (2-3 key technical or professional strengths based on their profile)],
  "recommendations": ["string" (2-3 tailored interview recommendations or questions for this candidate)]
}
`;

    const response = await model.invoke(prompt);
    const text = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
    
    // Clean code block ticks if any
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanText) as AIAssessmentReport;
    
    return {
      score: typeof result.score === "number" ? result.score : 70,
      feedback: result.feedback || "AI assessment completed.",
      matchedSkills: Array.isArray(result.matchedSkills) ? result.matchedSkills : [],
      missingSkills: Array.isArray(result.missingSkills) ? result.missingSkills : [],
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      recommendations: Array.isArray(result.recommendations) ? result.recommendations : [],
    };
  } catch (error) {
    console.error("Error invoking Gemini via LangChain:", error);
    return generateLocalFallbackAssessment(
      applicantName,
      applicantBio,
      applicantSkills,
      jobTitle,
      jobRequirements
    );
  }
};
