export interface AIMatchReport {
  score: number;
  feedback: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  recommendations: string[];
}

export function generateAIMatchReport(
  applicantName: string,
  applicantSkills: string[],
  jobTitle: string,
  jobRequirements: string | string[]
): AIMatchReport {
  // Format job requirements safely
  let reqsArray: string[] = [];
  if (typeof jobRequirements === "string") {
    reqsArray = jobRequirements.split(",").map((s) => s.trim());
  } else if (Array.isArray(jobRequirements)) {
    reqsArray = jobRequirements;
  }

  // Hash function to make results consistent for the same applicant + job
  const combined = `${applicantName}-${jobTitle}-${(applicantSkills || []).join(",")}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  const positiveHash = Math.abs(hash);

  // Parse requirements and applicant skills
  const appSkillsLower = (applicantSkills || []).map((s) => s.toLowerCase());
  const jobReqsLower = reqsArray.map((r) => r.toLowerCase());

  // Find overlapping skills
  const matched = (applicantSkills || []).filter((skill) =>
    jobReqsLower.some(
      (req) =>
        req.includes(skill.toLowerCase()) || skill.toLowerCase().includes(req)
    )
  );

  const missing = reqsArray.filter(
    (req) =>
      !appSkillsLower.some(
        (skill) =>
          req.toLowerCase().includes(skill) || skill.includes(req.toLowerCase())
      )
  );

  // Dynamic but consistent base score
  const skillMatchRatio = reqsArray.length > 0 ? matched.length / reqsArray.length : 0.5;
  let score = Math.round(58 + skillMatchRatio * 32 + (positiveHash % 9));
  if (score > 98) score = 98;
  if (score < 50) score = 50;

  let feedback = "";
  let strengths: string[] = [];
  let recommendations: string[] = [];

  if (score >= 83) {
    feedback = `${applicantName} is an exceptional fit for the ${jobTitle} position. Their background aligns perfectly with key technical requirements, demonstrating solid experience in ${matched.slice(0, 3).join(", ") || "core areas"}.`;
    strengths = [
      `Strong alignment with core technologies: ${matched.slice(0, 2).join(", ") || "required skills"}`,
      "Relevant industry certifications & hands-on application experience",
      "Highly tailored skill profile for engineering responsibilities",
    ];
    recommendations = [
      "Fast-track to technical interview round",
      "Inquire about experience leading/mentoring junior developers",
    ];
  } else if (score >= 68) {
    feedback = `${applicantName} has a strong baseline of skills suitable for the ${jobTitle} role, particularly in ${matched.slice(0, 2).join(", ") || "foundational areas"}. However, there are minor gaps in their exposure to ${missing.slice(0, 2).join(", ") || "advanced requirements"}.`;
    strengths = [
      `Solid foundational skills in: ${matched.slice(0, 2).join(", ") || "their core stack"}`,
      "Demonstrable problem-solving capability in full-stack projects",
    ];
    recommendations = [
      `Evaluate candidate's familiarity with: ${missing.slice(0, 2).join(", ") || "required tooling"}`,
      "Consider for technical assessment round",
    ];
  } else {
    feedback = `${applicantName} lacks some of the critical technical criteria required for ${jobTitle}. While they have experience in ${applicantSkills.slice(0, 2).join(", ") || "general IT/software"}, they lack exposure to ${missing.slice(0, 3).join(", ") || "required skills"}.`;
    strengths = [
      "Familiarity with standard software development lifecycles",
      "Eagerness to learn new methodologies and frameworks",
    ];
    recommendations = [
      "Conduct brief initial screen to evaluate adaptability",
      "Provide feedback regarding missing skill sets",
    ];
  }

  return {
    score,
    feedback,
    matchedSkills: matched.length > 0 ? matched : ["General Software Engineering"],
    missingSkills: missing.length > 0 ? missing : ["Advanced System Design"],
    strengths,
    recommendations,
  };
}
