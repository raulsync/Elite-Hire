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
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <h1 className="font-extrabold text-3xl text-zinc-900">
            Register Company
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            What is the name of your organization? You can change this later at any time.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName" className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              className="w-full border-zinc-200 shadow-none focus-visible:ring-primary"
              placeholder="e.g. Acme Corp, Google..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            className="rounded-lg px-4 border-zinc-200 text-zinc-650 hover:bg-zinc-50"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            className="rounded-lg px-5 bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm transition-colors"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyForm;
