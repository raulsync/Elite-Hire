import { toast } from "@/hooks/use-toast";
import { RootState } from "@/store/store";
import { JOB_API } from "@/utils/api";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2, BriefcaseIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface JobInput {
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
  jobType: string;
  experience: string;
  position: number;
  companyId: string;
}

function CreateJob() {
  const [input, setInput] = useState<JobInput>({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((state: RootState) => state.company);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value: string) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${JOB_API}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast({
          description: response.data.message,
        });
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("API Error:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast({
          description: errorMessage,
        });
      } else {
        toast({
          description: "Unexpected error occurred!",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-primary/5 py-12">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-primary bg-primary/10 border border-primary/25 font-medium text-sm">
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            Create New Position
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Post a New <span className="text-primary">Job Opening</span>
          </h1>

          <p className="text-zinc-550 max-w-2xl mx-auto">
            Fill in the details below to create a new job posting for your
            company
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200/60 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="Brief job description"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="Key requirements"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Salary Range</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="e.g. 12 LPA"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="e.g. Bangalore, India"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="e.g. Full-time, Remote"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                placeholder="e.g. 3+ years"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Number of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="rounded-lg border-zinc-200 shadow-none focus-visible:ring-primary"
                min="1"
              />
            </div>
          </div>

          {companies.length > 0 && (
            <div className="space-y-2">
              <Label className="text-zinc-700 font-semibold">Select Company</Label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full rounded-lg border-zinc-200 focus:ring-primary shadow-none">
                  <SelectValue placeholder="Choose a company" />
                </SelectTrigger>
                <SelectContent className="bg-white border-zinc-200">
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-11 transition-colors font-semibold shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Post New Job"
            )}
          </Button>

          {companies.length === 0 && (
            <p className="text-sm text-rose-500 text-center font-semibold">
              Please register a company first before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
