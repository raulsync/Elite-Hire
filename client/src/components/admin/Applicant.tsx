import { PopulatedJob } from "@/store/features/applicationSlice";

interface ApplicantProps {
  applicants: PopulatedJob | null;
}

function Applicant({ applicants }: ApplicantProps) {
  return (
    <div>
      <h1 className="font-bold text-xl my-5">
        Applicants {applicants?.applications?.length || 0}
      </h1>
    </div>
  );
}

export default Applicant;
