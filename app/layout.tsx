import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quantumep.co.ke"),
  title: {
    default: "Quantum MEP Consultants | Integrated Building Services",
    template: "%s | Quantum MEP Consultants",
  },
  description:
    "MEP consultancy, design-and-build delivery and lifecycle support for complex projects across Kenya and East Africa.",
  openGraph: {
    title: "Quantum MEP Consultants",
    description: "Coordinated building systems engineered to perform.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileContactBar />
      </body>
    </html>
  );
}
