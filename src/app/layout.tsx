import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "My project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} min-h-dvh bg-white text-gray-900 antialiased`}>
        <div className="mx-auto max-w-2xl px-4 py-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Todo</h1>
            <p className="text-sm text-gray-500">
              I am a learner !
            </p>
          </header>
          <StoreProvider>{children}</StoreProvider>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
