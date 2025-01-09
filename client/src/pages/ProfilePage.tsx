import AppliedJobs from "@/components/profile/AppliedJobs";
import Profile from "@/components/profile/Profile";

function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto my-10">
      <Profile />
      <AppliedJobs />
    </div>
  );
}

export default ProfilePage;
