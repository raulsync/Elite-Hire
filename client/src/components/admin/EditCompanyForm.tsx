import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY_API } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useGetCompanyById } from "@/hooks/useGetCompanyById";

interface IState {
  name: string;
  description: string;
  website: string;
  location: string;
  file?: File | string | null;
}

function EditCompanyForm() {
  const params = useParams();

  useGetCompanyById(params.id);

  const [input, setInput] = useState<IState>({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((state: RootState) => state.company);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `${COMPANY_API}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast({
          description: response.data.message,
        });
        navigate("/admin/companies");
      }
    } catch (error) {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center border-zinc-200 shadow-none gap-2 text-zinc-600 hover:bg-zinc-50 font-semibold rounded-lg h-9"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <h1 className="font-extrabold text-2xl text-zinc-900">
            Company Settings
          </h1>
        </div>

        <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-zinc-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={handleEventChange}
                className="border-zinc-200 shadow-none focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-zinc-700">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleEventChange}
                className="border-zinc-200 shadow-none focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-zinc-700">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleEventChange}
                className="border-zinc-200 shadow-none focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-zinc-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleEventChange}
                className="border-zinc-200 shadow-none focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-sm font-semibold text-zinc-700">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border-zinc-200 shadow-none focus-visible:ring-primary cursor-pointer text-zinc-550 file:text-primary"
              />
            </div>
          </div>

          <div className="pt-4">
            {loading ? (
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 font-semibold flex items-center justify-center gap-2 cursor-wait" disabled>
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 font-semibold shadow-sm transition-colors"
              >
                Update Settings
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCompanyForm;
