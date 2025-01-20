function Applicant({ applicants }) {
  return (
    <div>
      <h1 className="font-bold text-xl my-5">
        Applicants {applicants?.applications?.length || 0}
      </h1>
    </div>
  );
}

export default Applicant;
