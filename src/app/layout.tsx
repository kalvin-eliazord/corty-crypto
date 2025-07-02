"use client";

import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/shared/store";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/features/navbar/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryProvider } from "@/shared/components/ReactQueryProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} antialiased flex min-h-screen flex-col bg-gradient-to-r dark:from-orange-800 dark:via-purple-900 dark:via-blue-900 dark:to-indigo-900 from-gray-400 to-gray-300 via-blue-100 to-gray-400`}
      >
        <Provider store={store}>
          <ReactQueryProvider>
            <div className="flex flex-1 flex-col bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_20%,black_270%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_1%,black_100%)] overflow-hidden">
              <ThemeProvider>
                <Navbar />
                <ReactQueryDevtools initialIsOpen={false} />
                <AuroraBackground className="p-2 sm:p-12 sm:px-46 flex-1 ">
                  {children}
                </AuroraBackground>
              </ThemeProvider>
            </div>
          </ReactQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
