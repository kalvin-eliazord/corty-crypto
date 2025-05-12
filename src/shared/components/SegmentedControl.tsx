import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const pages = [
  { name: "Coins", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
];

export const SegmentedControl = () => {
  const [activeOption, setActiveOption] = useState(pages[0].name);

  return (
    <div className={cn("relative flex rounded-full p-1 bg-black/80 text-white")}>
      <div
        className={cn(
          "absolute top-1 bottom-1 rounded-full bg-white/10 transition-all duration-300 ease-in-out",
          activeOption === pages[0].name
            ? "left-1"
            : "left-[calc(50%-0.125rem)]",
          "w-[calc(50%-0.125rem)]"
        )}
      />

      {pages.map((page) => (
        <Link
          key={page.name}
          onClick={() => setActiveOption(page.name)}
          href={page.path}
          className={cn(
            "relative z-10 px-6 py-1.5 rounded-full text-sm font-medium transition-colors",
            activeOption === page.name
              ? ""
              : "hover:text-white/80"
          )}
        >
          {page.name}
        </Link>
      ))}
    </div>
  );
};
