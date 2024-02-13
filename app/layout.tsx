import Header from "@/components/header";
import type { Metadata } from "next";
import { getSession } from "@/server/session";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wordyling",
  description: "Keep your language learning burning",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()
  
  return (
    <html lang="en">
      <body>
        <main className="max-w-7xl sm:px-20 m-auto p-4">
          <Header session={session} />
          {children}
        </main>
      </body>
    </html>
  );
}
