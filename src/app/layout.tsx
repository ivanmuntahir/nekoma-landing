import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const siteUrl = "https://nekoma.id"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nekoma Academy — Bimbel & Tryout CAT CPNS 2026",
    template: "%s | Nekoma Academy",
  },
  description:
    "Latihan soal SKD & SKB CPNS sesuai standar CAT BKN terbaru, pembahasan analitis, simulasi CAT real-time, dan evaluasi passing grade & ranking nasional. Belajar dari mana saja.",
  keywords: [
    "bimbel CPNS",
    "tryout CPNS",
    "latihan soal SKD",
    "latihan soal SKB",
    "CAT BKN",
    "tryout SKD CPNS 2026",
    "sekolah kedinasan",
    "Nekoma Academy",
  ],
  authors: [{ name: "Nekoma Academy" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Nekoma Academy",
    title: "Nekoma Academy — Bimbel & Tryout CAT CPNS 2026",
    description:
      "Latihan soal standar CAT BKN terbaru, pembahasan analitis, simulasi CAT real-time, evaluasi passing grade & ranking nasional.",
    images: [
      {
        url: "/img/logo.webp", // Siapkan gambar 1200x630px di public/img/
        width: 1200,
        height: 630,
        alt: "Nekoma Academy - Bimbel & Tryout CPNS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nekoma Academy — Bimbel & Tryout CAT CPNS 2026",
    description:
      "Latihan soal standar CAT BKN terbaru, simulasi CAT real-time, evaluasi passing grade & ranking nasional.",
    images: ["/img/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
      google: "KsALFM82lHyO68o493c_KCdJ8MdV6Jcfq6_kFmQsRR0",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
