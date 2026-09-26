import type { Metadata } from "next";
import { 
  Plus_Jakarta_Sans, 
  Syne, 
  Outfit, 
  Space_Grotesk, 
  JetBrains_Mono, 
  Space_Mono, 
  IBM_Plex_Mono, 
  Fira_Code 
} from "next/font/google";
import { Toaster } from "sonner";
import { WindowManagerProvider } from "@/context/WindowManagerContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

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

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
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
    <html 
      lang="en" 
      className={`${plusJakarta.variable} ${syne.variable} ${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spaceMono.variable} ${ibmPlexMono.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('saurabhos-theme');var valid=['cyber-emerald','synthwave','sunset-amber','nordic-frost'];if(t&&valid.indexOf(t)!==-1){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','cyber-emerald');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
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