import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rec",
  description: "Share Ai powered videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-[#171717] `}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
