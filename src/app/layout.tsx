import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshara Farmer Producer Company | Certified Seeds, Agri-Inputs & Produce Marketing",
  description:
    "Akshara Farmer Producer Company (FPC) empowers 5,000+ farmers across 120+ villages with lab-certified high-yield seeds, bio-fertilizers, produce aggregation, direct mandi market linkage, and 24/7 agronomy advisory.",
  keywords: [
    "Akshara Farmer Producer Company",
    "Akshara FPC",
    "Certified Onion Seeds",
    "Agriculture Company India",
    "Farmer Producer Organization",
    "FPC Seeds",
    "Bio-Fertilizers",
    "Produce Aggregation",
    "Kisan Helpline",
    "Nashik Agriculture FPC",
  ],
  authors: [{ name: "Akshara Farmer Producer Company Ltd." }],
  openGraph: {
    title: "Akshara Farmer Producer Company | Empowering Farmers, Enriching Agriculture",
    description:
      "Certified seeds, bio-nutrients, direct produce aggregation, and modern agronomic training for 5,000+ farmer members.",
    url: "https://aksharafpc.org",
    siteName: "Akshara Farmer Producer Company",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Akshara Farmer Producer Company Ltd.",
    alternateName: "Akshara FPC",
    url: "https://aksharafpc.org",
    logo: "https://aksharafpc.org/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-1800-889-2345",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. 42, Krishi Seva Kendra Complex, APMC Road",
      addressLocality: "Niphad",
      addressRegion: "Maharashtra",
      postalCode: "422303",
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com",
      "https://twitter.com",
      "https://instagram.com",
      "https://youtube.com",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-earth-50 text-stone-900 selection:bg-forest-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
