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
    <div className=" bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-red-400">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="cursor-pointer h-24 w-24">
            <AvatarImage src={user?.profile?.profilePhoto} />
          </Avatar>
          <div>
            <h1 className=" font-medium text-xl">{user?.name}</h1>
            <p>{user?.profile?.bio}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpenModal(true)}
          className="text-right"
          variant="outline"
        >
          <Pen />
        </Button>
      </div>
      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span className="">
            {/* {user?.email} */}
            <a href={`mailto:${user?.email}`}>{user?.email}</a>
          </span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span className="">
            <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
          </span>
        </div>
      </div>

      <div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills?.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-bold"> Resume</label>
          <div>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resumeUrl}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Download
                <span className="ml-2">{user?.profile?.resumeName}</span>
              </a>
            ) : (
              <span>No Resume Found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
