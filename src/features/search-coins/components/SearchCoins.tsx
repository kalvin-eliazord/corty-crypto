import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounceCoin } from "../hooks/useDebounceCoin";
import { CoinLinkResult } from "./CoinsLinkResult";
import { CoinsResult } from "./CoinResult";
import { useSmartQuery } from "@/shared/hooks/useSmartQuery";
import { fetchApiClient } from "@/shared/utils/fetchApiClient";
import { SearchResults } from "@/shared/types/coins";
import { useTheme } from "next-themes";

type SearchCoinsProps = {
  isSearchIcon: boolean;
  asLink: boolean;
  setSelectedCoinId?: (id: string) => void;
  isNavbar?: boolean;
};

export const SearchCoins: React.FC<SearchCoinsProps> = ({
  isSearchIcon,
  setSelectedCoinId,
  asLink,
  isNavbar = true,
}) => {
  const { resolvedTheme } = useTheme();
  const [searchCoinInput, setSearchCoinInput] = useState<string>("");
  const [coinSearched, setCoinSearched] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  useDebounceCoin(searchCoinInput, setCoinSearched);

  const url = coinSearched ? `search?query=${coinSearched}` : "";
  const { data, status } = useSmartQuery({
    queryKey: ["coinData", url],
    queryFn: () => fetchApiClient<SearchResults>(url),
    enabled: !!url,
  });

  const handleCoinNameClick = (coinId: string) => {
    if (!setSelectedCoinId) {
      console.warn("setSelectCoinId isn't passed.");
      return;
    }

    setSelectedCoinId(coinId);
    const selectedCoinObj = data && data.coins.find((c) => c.id === coinId);

    if (selectedCoinObj) {
      setCoinSearched(selectedCoinObj.name);
      setSearchCoinInput(selectedCoinObj.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchCoinInput(e.target.value.trim());

  const handleFocus = () => setIsFocused(true);

  const handleOnBlurInput = () => {
    setTimeout(() => {
      if (asLink) {
        setCoinSearched("");
        setSearchCoinInput("");
      }
      setIsFocused(false);
    }, 200);
  };

  const showResults = searchCoinInput.trim() !== "";

  const width = isNavbar ? "sm:w-full" : "w-full";

  return (
    <div className={`relative w-10 ${width}`}>
      <div
        className={`flex items-center w-10 h-9 ${width} border border-gray-500 dark:border-white/20 rounded-md dark:bg-input/30 ring-ring/50 focus-within:ring-[3px] `}
      >
        {isSearchIcon && (
          <Search
            className="pl-2 h-7 w-7 text-white flex-shrink-0"
            color={resolvedTheme === "light" ? "gray" : "white"}
          />
        )}
        <Input
          id="search-coins"
          onBlur={handleOnBlurInput}
          onFocus={handleFocus}
          type="text"
          placeholder="Search coins"
          value={searchCoinInput}
          onChange={handleInputChange}
          className={`border-none absolute top-0 left-0 opacity-0 ${
            isNavbar ? "sm:opacity-100" : "opacity-100"
          }  sm:static sm:w-auto focus-visible:ring-[0px] sm:h-auto`}
        />
      </div>

      {asLink && isFocused && (
        <CoinLinkResult
          coinResults={data?.coins || []}
          status={status}
          showResults={showResults}
        />
      )}

      {!asLink && isFocused && (
        <CoinsResult
          coinResults={data?.coins || []}
          handleCoinNameClick={handleCoinNameClick}
          status={status}
          showResults={showResults}
        />
      )}
    </div>
  );
};
