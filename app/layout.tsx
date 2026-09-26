import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { WindowManagerProvider } from "@/context/WindowManagerContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('saurabhos-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <WindowManagerProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  fontFamily: 'var(--font-mono)',
                },
              }}
            />
          </WindowManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}