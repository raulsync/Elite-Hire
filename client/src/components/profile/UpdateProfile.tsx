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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
interface IState {
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  bio: string | undefined;
  skills: string[] | undefined;
  file?: File | string | undefined;
}

function UpdateProfile({ openModal, setOpenModal }: IProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [input, setInput] = useState<IState>({
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill: string) => skill),
    file: user?.profile?.resumeUrl,
  });
  console.log("User from Redux:", user);

  const { toast } = useToast();

  console.log("Input state:", input);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", input);
    try {
      const response = await axios.put(
        USER_API + "/profile/update",
        {
          name: input.name,
          email: input.email,
          phoneNumber: input.phoneNumber,
          file: input.file,
        },
        {
          withCredentials: true,
        }
      );
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
                  htmlFor="number"
                  className="text-right"
                >
                  Phone Number
                </Label>
                <Input
                  id="number"
                  name="number"
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
              <Button
                type="submit"
                className="w-full my-4"
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfile;
