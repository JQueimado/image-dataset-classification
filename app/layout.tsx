import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Nav Bar */}
        <div className="navbar bg-base-300">
          <a className="btn btn-ghost text-xl">Image Classifier</a>
        </div>
        {/* Page */}
        {children}
      </body>
    </html>
  );
}
