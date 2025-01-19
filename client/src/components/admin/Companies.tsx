import { useGetCompanies } from "@/hooks/useGetCompanies";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/store/features/companySlice";

function Companies() {
  useGetCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompany(input));
  }, [input]);
  return (
    <div className="flex items-center justify-between my-5">
      <Input
        className="w-fit"
        placeholder="Filter by name"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="bg-red-600 hover:bg-red-400"
        onClick={() => navigate("/admin/companies/create")}
      >
        New Company
      </Button>
    </div>
  );
}

export default Companies;
