import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Coin from "@/assets/coin.svg";
import { setCurrency } from "../../../shared/store/currencySlice";
import { useFetchCoinData } from "../../../shared/hooks/useFetchCoinData";

type Rates = {
  rates: {
    [key: string]: {
      unit: string;
    };
  };
};

export const CurrencySelector = () => {
  const dispatch = useDispatch();
  const { data, status } = useFetchCoinData<Rates>("/exchange_rates");
  const { code } = useSelector((state: RootState) => state.currency);

  const handleSelectCurrency = (selectedCurrencyCode: string) => {
    const selectedRate = data?.rates[selectedCurrencyCode];
    if (!selectedRate) {
      console.warn(
        `Currency ${selectedCurrencyCode} not found in exchange rates.`
      );
      return;
    }

    const newCurrency = {
      code: selectedCurrencyCode,
      symbol: selectedRate.unit,
    };
    
    dispatch(setCurrency(newCurrency));
  };

  if (status === "pending") {
    return <Skeleton className="h-10 w-[6%] rounded" />;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="false"
          className="flex items-center gap-2 bg-gray-800/50 text-white hover:bg-gray-700/50 justify-between"
        >
          <Coin />
          <span>{code.toUpperCase()}</span>
          <ChevronsUpDown className="opacity-50 size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search  .." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {data &&
                Object.keys(data.rates).map((currencyCode) => (
                  <CommandItem
                    key={currencyCode}
                    value={currencyCode}
                    onSelect={(selectedValue) =>
                      handleSelectCurrency(selectedValue.toLowerCase())
                    }
                  >
                    {currencyCode.toUpperCase()}
                    <Check
                      className={cn(
                        "ml-auto",
                        currencyCode === code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
