import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Vouch by Revenue Engine — Trade Partner Referral Network",
  description:
    "The exclusive invite-only referral network where vetted local trade professionals exchange qualified leads and earn referral fees automatically. Vouch is a product of Revenue Engine.",
  openGraph: {
    title: "Vouch by Revenue Engine — Trade Partner Referral Network",
    description:
      "Send a referral. Get paid. That simple. Join the exclusive network for vetted trade professionals.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
