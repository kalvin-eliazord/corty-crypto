import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinType } from "@/shared/types/coins";
import { Label } from "@/components/ui/label";
import { handleKeyDown } from "@/shared/utils/handleKeyDown";
import { CoinIcon } from "@/shared/components/CoinIcon";

type CoinConvertorPartProps = {
  label: string;
  currencyCode: string;
  selectedCryptoId: string | undefined;
  inputState: string;
  allCoins: CoinType[];
  isError: boolean;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedCoinId: (selectedCoinId: string) => void;
};

export const CoinConvertorPart: React.FC<CoinConvertorPartProps> = ({
  label,
  currencyCode,
  inputState,
  allCoins,
  selectedCryptoId,
  isError,
  isLoading,
  setSelectedCoinId,
  handleInputChange,
}) => {
  const selectedCoin = allCoins.find((c) => c.id === selectedCryptoId);
  return (
    <div className="w-full ">
      <BackgroundGradient className=" rounded-3xl dark:bg-zinc-900 gap-6 p-5 ">
        <Label
          className="text-white dark:text-gray-400 text-sm mb-5"
          htmlFor={label}
        >
          {label}
        </Label>
        <div className="flex flex-col sm:flex-row border-white/40 border border-gray-300 dark:border-white/20 rounded-xl mb-3 overflow-hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded="false"
                className="flex items-center gap-2 bg-gray-800/50 text-white hover:bg-gray-700/50 justify-between rounded-xl "
              >
                {selectedCoin && (
                  <CoinIcon
                    id={selectedCoin.id}
                    image={selectedCoin.image}
                    tailwindSize={"w-5 h-5"}
                  />
                )}

                <span> {selectedCoin?.name}</span>
                <ChevronsUpDown className="opacity-50 size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 ">
              <Command>
                <CommandInput placeholder="Search .." />
                <CommandList>
                  <CommandEmpty>
                    {isLoading
                      ? "Fetching coins..."
                      : isError
                      ? "Fetching error."
                      : "No coins found."}
                  </CommandEmpty>
                  <CommandGroup>
                    {allCoins.map((coin) => (
                      <CommandItem
                        key={coin.id}
                        value={coin.id}
                        onSelect={(selectedValue) =>
                          setSelectedCoinId(selectedValue)
                        }
                      >
                        {coin.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            coin.id === selectedCryptoId
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            id={label}
            value={inputState}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="text-right focus-visible:ring-[0px] text-white"
            type="text"
            inputMode="decimal"
          />
        </div>
        <span className="text-xs dark:text-white text-gray-300">
          1 {selectedCoin?.symbol.toUpperCase()} = {selectedCoin?.current_price}{" "}
          {currencyCode.toUpperCase()}
        </span>
      </BackgroundGradient>
    </div>
  );
};
