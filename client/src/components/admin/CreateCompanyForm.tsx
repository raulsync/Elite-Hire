import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigateFunction } from "react-router-dom";

import React from "react";

interface CreateCompanyFormProps {
  handleRegister: () => void;
  navigate: NavigateFunction;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({
  handleRegister,
  navigate,
  setCompanyName,
}) => {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">
            <span className="text-3xl text-red-600">Company </span>
            Name
          </h1>
          <p className="text-gray-500 mt-2">
            What title would you like to give your company? You’re free to
            adjust it later if needed
          </p>
        </div>

        <Label htmlFor="companyName">Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Google, Microsoft..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCompanyName(e.target.value)
          }
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={handleRegister}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyForm;
