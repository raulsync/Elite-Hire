import { toast } from "@/hooks/use-toast";
import { addCompany } from "@/store/features/companySlice";
import { COMPANY_API } from "@/utils/api";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateCompanyForm from "@/components/admin/CreateCompanyForm";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState<string>("");
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${COMPANY_API}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        dispatch(addCompany(response.data.company));
        toast({
          description: response.data.message,
        });
        const companyId = response?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <CreateCompanyForm
        handleRegister={handleRegister}
        navigate={navigate}
        setCompanyName={setCompanyName}
      />
    </div>
  );
};

export default CreateCompany;
