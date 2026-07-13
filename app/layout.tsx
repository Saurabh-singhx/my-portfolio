import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { WindowManagerProvider } from "@/context/WindowManagerContext";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saurabh Kumar — Full-Stack & GenAI Developer",
  description: "Portfolio of Saurabh Kumar — Full-stack and GenAI developer from Patna, India. Built Sonix Music (AWS, LangGraph, pgvector RAG) and AI microservices with Gemini 3.1.",
  keywords: ["Saurabh Kumar", "Full-Stack Developer", "GenAI", "LangGraph", "Next.js", "Patna", "India", "Backend Developer"],
  authors: [{ name: "Saurabh Kumar", url: "https://saurabhx.site" }],
  openGraph: {
    title: "Saurabh Kumar — Full-Stack & GenAI Developer",
    description: "SaurabhOS — Interactive developer portfolio",
    url: "https://saurabhx.site",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <WindowManagerProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#161b22',
                color: '#e6edf3',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
              },
            }}
          />
        </WindowManagerProvider>
      </body>
    </html>
  );
}
