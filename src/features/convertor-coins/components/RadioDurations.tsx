import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const durations = {
  "1d": "1",
  "7d": "7",
  "30d": "30",
  "90d": "90",
  "1y": "365",
};

type RadioDurationsProps = {
  days: string;
  setDays: React.Dispatch<React.SetStateAction<string>>;
};

export const RadioDurations: React.FC<RadioDurationsProps> = ({
  days,
  setDays,
}) => {
  return (
    <RadioGroup
      value={days}
      onValueChange={setDays}
      className="flex sm:gap-7 gap-6.5 mb-5 "
    >
      {Object.entries(durations).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center space-x-2 flex-wrap sm:gap-y-0 gap-y-4 text-white"
        >
          <RadioGroupItem value={value} id={key} className="bg-gray-300" />
          <Label htmlFor={key}>{key}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
