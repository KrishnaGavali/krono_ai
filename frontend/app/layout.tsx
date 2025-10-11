import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Layout/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CurrDateProvider } from "@/context/CurrDateContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "KronoAI",
  description: "Whatsapp Bassed Day Planner AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" md:overflow-y-scroll" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <CurrDateProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </CurrDateProvider>
      </body>
    </html>
  );
}
