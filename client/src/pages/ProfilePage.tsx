import AppliedJobs from "@/components/profile/AppliedJobs";
import Profile from "@/components/profile/Profile";
import UpdateProfile from "@/components/profile/UpdateProfile";
import { useState } from "react";

function ProfilePage() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <Profile setOpenModal={setOpenModal} />
      <AppliedJobs />
      <UpdateProfile
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}

export default ProfilePage;
