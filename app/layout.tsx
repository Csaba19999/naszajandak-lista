import type { Metadata, Viewport } from "next";
import "./globals.css";

// Careful: this is what shows up in the browser tab and in the link preview
// when the invitation gets shared around. It has to stay in character.
const TITLE = "Nászajándék lista";
const DESCRIPTION =
  "Kedves Vendégeink! Összeírtuk, minek örülnénk igazán a nagy napon.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "hu_HU",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
