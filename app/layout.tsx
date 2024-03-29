"use client";

import type { Metadata } from "next";
import "./globals.css";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SessionProvider from "@/hocs/session-provider";
import { useSession } from "next-auth/react";
// export const metadata: Metadata = {
//   title: "Room App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-full overflow-hidden">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
