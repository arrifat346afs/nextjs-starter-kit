import Provider from "@/app/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nextstarter.xyz/"),
  title: {
    default: "TagPix AI | Automated Metadata Generator for Stock Contributors",
    template: `%s | TagPix AI`,
  },
  description:
    "TagPix AI is an intelligent metadata generator that automatically creates SEO-optimized titles, keywords, and descriptions for stock photos and videos. Save time and boost discoverability on Adobe Stock, Shutterstock, and more.",
  openGraph: {
    description:
      "TagPix AI is an intelligent metadata generator that automatically creates SEO-optimized titles, keywords, and descriptions for stock photos and videos. Save time and boost discoverability on Adobe Stock, Shutterstock, and more.",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
    url: "https://nextstarter.xyz/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TagPix AI | AI-Powered Stock Photo Tagging Tool",
    description:
      "Automate your stock content workflow with TagPix AI. Our AI tagging tool generates high-quality titles, keywords, and descriptions for stock photos and videos, optimized for maximum discoverability.",
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
  },
  keywords:
    "AI tagging, stock photo metadata, automated keyword generator, image tagging software, stock photo keywords, AI metadata generator, Shutterstock tags, Adobe Stock metadata, stock contributor tools, image description generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
              forcedTheme="dark"
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
