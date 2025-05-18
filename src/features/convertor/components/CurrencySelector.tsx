import { useFetchCoinData } from "../../../shared/hooks/useFetchCoinData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyInfo } from "../types/currency";
import { RootState } from "@/store";
import { setCurrencyCode, setCurrencyInfo } from "../currencySlice";
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

type Rates = {
  rates: {
    [key: string]: CurrencyInfo;
  };
};

export const CurrencySelector = () => {
  const dispatch = useDispatch();
  const { data, status } = useFetchCoinData<Rates>("/exchange_rates");
  const { currencyCode } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    const selectedRate = data?.rates[currencyCode];
    if (selectedRate) {
      dispatch(setCurrencyInfo(selectedRate));
    } else {
      console.warn(`Currency ${currencyCode} not found in exchange rates.`);
    }
  }, [currencyCode, dispatch, data]);

  if (status === "pending") {
    return <div>CurrencySelector loading...</div>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="false"
          className="flex items-center gap-2 bg-gray-800/50 text-white hover:bg-gray-700/50 w-[35%] justify-between"
        >
          <div className="flex-1">{currencyCode.toUpperCase()}</div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {data &&
                Object.keys(data.rates).map((currency) => (
                  <CommandItem
                    key={currency}
                    value={currency}
                    onSelect={(selectedValue) => {
                      dispatch(setCurrencyCode(selectedValue.toLowerCase()));
                    }}
                  >
                    {currency.toUpperCase()}
                    <Check
                      className={cn(
                        "ml-auto",
                        currencyCode === currency ? "opacity-100" : "opacity-0"
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