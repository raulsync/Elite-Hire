import { NavigateFunction } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";

interface JobsProps {
  navigate: NavigateFunction;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

function Jobs({ setInput, navigate }: JobsProps) {
  return (
    <div className="flex items-center justify-between my-5">
      <Input
        className="w-fit"
        placeholder="Filter by name, role"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
    </div>
  );
}

export default Jobs;
