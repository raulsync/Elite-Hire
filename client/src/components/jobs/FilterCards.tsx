import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Bangalore", "Delhi", "Gurgaon", "Noida", "Mumbai", "Remote"],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Finance",
      "Marketing",
      "Healthcare",
      "Education",
      "Manufacturing",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

interface FilterCardsProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

const FilterCards = ({ selectedValue, onChange }: FilterCardsProps) => {
  return (
    <div className="w-full bg-white p-5 border border-zinc-200/50 rounded-2xl shadow-sm">
      <h1 className="font-bold text-lg text-zinc-900 mb-4">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={onChange} className="space-y-6">
        {filterData.map((data) => (
          <div key={data.filterType} className="space-y-2">
            <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-400">{data.filterType}</h2>
            <div className="space-y-2">
              {data.array.map((item) => {
                const itemId = `${data.filterType}-${item}`;
                return (
                  <div key={item} className="flex items-center space-x-3">
                    <RadioGroupItem value={item} id={itemId} className="text-primary focus:ring-primary" />
                    <Label
                      htmlFor={itemId}
                      className="text-sm text-zinc-650 cursor-pointer hover:text-primary transition-colors font-medium"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCards;
