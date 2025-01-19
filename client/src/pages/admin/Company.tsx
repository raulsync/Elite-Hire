import Companies from "@/components/admin/Companies";
import CompanyTable from "@/components/admin/CompanyTable";

function Company() {
  return (
    <div className="mx-auto flex flex-col gap-2 max-w-7xl mt-10">
      <Companies />
      <CompanyTable />
    </div>
  );
}

export default Company;
