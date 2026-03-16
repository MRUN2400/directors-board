"use client"; // <--- ADD THIS LINE FIRST

import "./globals.css";
import { Providers } from "@/components/Providers"; // Adjust path if needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
