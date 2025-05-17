"use client";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/shared/components/Navbar";

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
      <Provider store={store}>
        <body
          className={`${spaceGrotesk.className} antialiased min-h-screen bg-gradient-to-r from-orange-900 via-purple-900 via-blue-900 to-indigo-900 `}
        >
          <div className="h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_7%,black_100%)]">
            <ThemeProvider>
              <Navbar />
              {children}
            </ThemeProvider>
          </div>
        </body>
      </Provider>
    </html>
  );
}