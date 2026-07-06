import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { USER_API } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addUser } from "@/store/features/authSlice";
import { Loader2, FileText, Check } from "lucide-react";
import ResumeParser from "./ResumeParser";
import type { ParsedResume } from "@/types";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
interface IState {
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  bio: string | undefined;
  skills: string[] | string | undefined;
  file?: File | string | undefined;
  profilePhoto?: File | string | undefined;
}

function UpdateProfile({ openModal, setOpenModal }: IProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialResumeUrl] = useState(user?.profile?.resumeUrl);
  const [input, setInput] = useState<IState>({
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill) || [],
    file: user?.profile?.resumeUrl,
    profilePhoto: user?.profile?.profilePhoto,
  });

  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleFileSelected = (file: File) => {
    setInput((prev) => ({ ...prev, file }));
  };

  const handleResumeParsed = (data: ParsedResume) => {
    setInput((prev) => ({
      ...prev,
      bio: data.bio || prev.bio,
      skills: data.skills.length > 0 ? data.skills : prev.skills,
    }));
    toast({ description: "Bio and Skills auto-filled from resume!" });
  };

  const handleResetResume = () => {
    setInput((prev) => ({ ...prev, file: initialResumeUrl }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInput({ ...input, file: e.target.files?.[0] });
  // };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, profilePhoto: e.target.files?.[0] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name || "");
    formData.append("email", input.email || "");
    formData.append("phoneNumber", input.phoneNumber || "");
    formData.append("bio", input.bio || "");
    if (input.skills) {
      const skillsStr = Array.isArray(input.skills)
        ? input.skills.join(",")
        : input.skills;
      formData.append("skills", skillsStr);
    }
    if (input.file && typeof input.file !== "string") {
      formData.append("file", input.file);
    }
    if (input.profilePhoto && typeof input.profilePhoto !== "string") {
      formData.append("profilePhoto", input.profilePhoto);
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        USER_API + "/profile/update",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data) {
        dispatch(addUser({ ...response.data.data, skills: input.skills }));
        setOpenModal(false);
        toast({
          description: response.data.message,
        });
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
    <div className="max-w-6xl mx-auto my-10">
      <Dialog
        open={openModal}
        onOpenChange={setOpenModal}
      >
        <DialogContent
          className="max-w-2xl bg-white border border-zinc-200 shadow-xl rounded-2xl p-6"
          onInteractOutside={() => setOpenModal(false)}
        >
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2 my-2 justify-center text-center">
              <h2 className="text-2xl font-bold text-zinc-900">
                Update Profile
              </h2>
              <p className="text-sm text-zinc-550 font-medium">
                Keep your professional profile updated for recruiters
              </p>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* AI Resume Parser */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right text-zinc-500 font-medium text-sm pt-2">
                  Upload Resume
                </Label>
                <div className="col-span-3">
                  <ResumeParser
                    onFileSelected={handleFileSelected}
                    onParsed={handleResumeParsed}
                    onReset={handleResetResume}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right text-zinc-500 font-medium text-sm"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={handleEventChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right text-zinc-500 font-medium text-sm"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleEventChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phoneNumber"
                  className="text-right text-zinc-500 font-medium text-sm"
                >
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={handleEventChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="bio"
                  className="text-right text-zinc-500 font-medium text-sm"
                >
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={handleEventChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="skills"
                  className="text-right text-zinc-500 font-medium text-sm"
                >
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={handleEventChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="profilePhoto"
                  className="text-right text-zinc-500 font-medium text-sm"
                >
                  Profile Photo
                </Label>
                <Input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-zinc-500 font-medium text-sm">
                  Active Resume
                </Label>
                <div className="col-span-3 text-sm font-medium">
                  {input.file ? (
                    typeof input.file === "string" ? (
                      <a
                        href={input.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline flex items-center gap-1.5"
                      >
                        <FileText className="h-4 w-4 text-primary" />
                        {user?.profile?.resumeName || "View Current Resume"}
                      </a>
                    ) : (
                      <span className="text-zinc-800 flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-green-600 font-bold" />
                        {input.file.name} (Ready to upload)
                      </span>
                    )
                  ) : (
                    <span className="text-zinc-400">No resume uploaded</span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              {isLoading ? (
                <Button className="w-full my-4 bg-primary hover:bg-primary/90 text-white rounded-lg py-2 font-semibold flex items-center justify-center gap-2 cursor-wait">
                  <Loader2 className="h-4 w-4 animate-spin" /> Updating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-primary hover:bg-primary/90 text-white rounded-lg py-2 font-semibold shadow-sm transition-colors"
                >
                  Update Profile
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfile;
