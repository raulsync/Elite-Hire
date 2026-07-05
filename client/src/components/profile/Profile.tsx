import { Contact, Mail, Pen } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface IProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

function Profile({ setOpenModal }: IProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const isResume = user?.profile?.resumeUrl;
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl my-5 p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-5">
          <Avatar className="cursor-pointer h-20 w-20 border border-zinc-200 shadow-sm">
            <AvatarImage src={user?.profile?.profilePhoto} className="object-cover" />
          </Avatar>
          <div>
            <h1 className="font-bold text-xl text-zinc-900">{user?.name}</h1>
            <p className="text-sm text-zinc-500 mt-1">{user?.profile?.bio || "No bio added yet."}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpenModal(true)}
          className="rounded-full h-8 w-8 text-zinc-400 hover:text-primary hover:bg-primary/10 border-zinc-200"
          variant="outline"
          size="icon"
        >
          <Pen className="h-4 w-4" />
        </Button>
      </div>

      <div className="my-6 space-y-3">
        <div className="flex items-center gap-3 text-zinc-400">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${user?.email}`} className="text-zinc-650 hover:text-primary transition-colors text-sm font-medium">
            {user?.email}
          </a>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          <Contact className="h-4 w-4" />
          <a href={`tel:${user?.phoneNumber}`} className="text-zinc-650 hover:text-primary transition-colors text-sm font-medium">
            {user?.phoneNumber}
          </a>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-bold text-zinc-900 mb-3">Skills</h2>
        <div className="flex flex-wrap items-center gap-2">
          {user?.profile?.skills?.length !== 0 ? (
            user?.profile?.skills?.map((item, index) => (
              <Badge
                key={index}
                className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shadow-none font-medium px-2.5 py-0.5"
                variant="outline"
              >
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-zinc-400 text-sm">No skills added yet.</span>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-6">
        <h2 className="text-sm font-bold text-zinc-900 mb-3">Resume</h2>
        <div>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resumeUrl}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-semibold text-sm hover:underline cursor-pointer"
            >
              <span>Download:</span>
              <span className="text-zinc-500 font-medium underline">{user?.profile?.resumeName}</span>
            </a>
          ) : (
            <span className="text-zinc-400 text-sm">No Resume Found</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
