import Header from "@/components/header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wordyling",
  description: "Keep your language learning burning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-7xl sm:px-20 m-auto p-4">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
