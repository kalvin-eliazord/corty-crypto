import { navbarLinks } from "./configs/navbarLinks";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ul>
          {navbarLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path}> {link.name}</Link>
            </li>
          ))}
        </ul>
        {children}
      </body>
    </html>
  );
}
