import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SegmentedControlProps = {
  pages: { name: string; path: string }[];
};

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  pages,
}) => {
  const [activeOption, setActiveOption] = useState(usePathname());

  return (
    <div
      className="relative flex sm:p-1 rounded-full dark:bg-[#2F1E2B] bg-[#606B79]
        text-white mr-6 p-1 sm:p-0"
    >
      <div
        className={cn(
          `absolute top-2 bottom-2 rounded-full bg-black
           transition-all duration-300 ease-in-out`,
          activeOption === pages[0].path
            ? "left-1.8 sm:left-2.5 sm:w-[calc(40%-0.125rem)] w-[calc(40%)]"
            : "left-[calc(48%-0.125rem)] w-[calc(48%-0.125rem)] sm:w-[calc(46%-0.125rem)]"
        )}
      />

      {pages.map((page) => (
        <Link
          key={page.name}
          onClick={() => setActiveOption(page.path)}
          href={page.path}
          className={cn(
            "relative z-10 px-3 sm:px-6 py-3 rounded-full text-sm font-medium transition-colors",
            activeOption === page.name ? "" : "hover:text-white/80"
          )}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};