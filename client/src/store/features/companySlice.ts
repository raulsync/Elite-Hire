import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Company {
  _id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  file?: string | File;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CompanyState {
  singleCompany: Company | null;
  companies: Company[];
  searchCompany: string;
}

const initialState: CompanyState = {
  singleCompany: null,
  companies: [],
  searchCompany: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      state.singleCompany = action.payload;
    },
    addCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setSearchCompany: (state, action: PayloadAction<string>) => {
      state.searchCompany = action.payload;
    },
  },
});
export const { addCompany, addCompanies, setSearchCompany } =
  companySlice.actions;
export default companySlice.reducer;
