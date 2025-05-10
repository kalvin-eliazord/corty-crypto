"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SearchCoins } from "@/features/coins/components/SearchCoins";
import { Convertor } from "@/features/convertor/components/Convertor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navbarLinks = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ul>
            {navbarLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}> {link.name}</Link>
              </li>
            ))}
            <Convertor />
            <SearchCoins />
          </ul>
          {children}
        </body>
      </Provider>
    </html>
  );
}
