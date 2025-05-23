import { CurrencySelector } from "@/features/currency-selector/components/CurrencySelector";
import Logo from "@/assets/logo.svg";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SegmentedControl } from "./SegmentendControl";
import { SearchCoins } from "./SearchCoins";
import { MarketCoins } from "@/features/market-coins/components/MarketCoins";

export const Navbar = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-orange-900 via-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="mx-auto flex items-center justify-between md:px-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Logo width={48} height={48} className="object-contain" />
              <span className="block">
                <SegmentedControl />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SearchCoins />
            <CurrencySelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <MarketCoins />
    </>
  );
};
