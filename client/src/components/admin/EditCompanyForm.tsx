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
    <div className="max-w-4xl mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-5 p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center border-red-600 shadow-md gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">
            <span className="text-2xl text-red-600">Company </span>
            Setting
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={handleEventChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={handleEventChange}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={handleEventChange}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={handleEventChange}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full my-4"
          >
            Update
          </Button>
        )}
      </form>
    </div>
  );
}

export default EditCompanyForm;
