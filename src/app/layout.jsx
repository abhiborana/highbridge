import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/auth";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Highbridge - Manage workflows with ease",
  description: "Workflow Management System with editor and list view",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased h-dvh w-screen",
          geistSans.variable,
          geistMono.variable,
        )}
        cz-shortcut-listen="true"
      >
        {children}
        <Toaster position="top-center" richColors />
        <AuthProvider />
      </body>
    </html>
  );
}
