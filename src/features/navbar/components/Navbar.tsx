import { SearchCoins } from "@/features/search-coins/components/SearchCoins";
import { CurrencySelector } from "@/features/currency-selector/components/CurrencySelector";
import { SegmentedControl } from "@/features/navbar/components/SegmentedControl";
import Logo from "@/assets/logo.svg";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MarketCoins } from "@/features/market-coins/components/MarketCoins";

const pages = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
];

export const Navbar = () => {
  return (
    <>
      <div className="bg-gradient-to-r dark:from-orange-900 dark:via-purple-900 dark:via-blue-900 dark:to-indigo-900 from-gray-400 to-gray-300 via-blue-100 to-gray-400 p-4 sm:px-38">
        <div className="mx-auto flex justify-between md:px-10 ">
          <div className="flex items-center gap-3 sm:gap-6 ">
            <div className="hidden sm:block sm:w-13 sm:h-13">
              <Logo className="w-full h-full" />
            </div>
            <span className="block">
              <SegmentedControl pages={pages} />
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 ">
            <SearchCoins isSearchIcon asLink />
            <CurrencySelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <MarketCoins />
    </>
  );
};
