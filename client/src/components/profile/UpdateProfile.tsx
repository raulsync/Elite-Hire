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
import { Loader2 } from "lucide-react";

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
}

function UpdateProfile({ openModal, setOpenModal }: IProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<IState>({
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill) || [],
    file: user?.profile?.resumeUrl,
  });
  console.log("User from Redux:", user);

  const { toast } = useToast();
  const dispatch = useDispatch();

  console.log("Input state:", input);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, file: e.target.files?.[0] });
    console.log("filehandle", input.file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name || "");
    formData.append("email", input.email || "");
    formData.append("phoneNumber", input.phoneNumber || "");
    formData.append("bio", input.bio || "");
    if (input.skills) {
      formData.append("skills", input?.skills);
    }
    if (input.file) {
      formData.append("file", input.file);
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        USER_API + "/profile/update",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data) {
        dispatch(addUser({ ...response.data.data, skills: input.skills }));
        setOpenModal(false);
        toast({
          description: response.data.message,
        });
      }
      console.log("API Response:", response.data);
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
      <Dialog open={openModal}>
        <DialogContent
          className="max-w-2xl"
          onInteractOutside={() => setOpenModal(false)}
        >
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-3 my-3 justify-center">
              <h2 className="text-3xl font-semibold">
                Let's update your <span className="text-red-600">profile</span>
              </h2>
              <p className="text-sm text-gray-500">
                Because employers love and prefer good completed profiles
              </p>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right"
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
                  className="text-right"
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
                  className="text-right"
                >
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNnumber"
                  value={input.phoneNumber}
                  onChange={handleEventChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="bio"
                  className="text-right"
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
                  className="text-right"
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
                  htmlFor="file"
                  className="text-right"
                >
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {isLoading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> loading...{" "}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4"
                >
                  Update
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
