import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata = {
  title: "Onward Christian Soldiers — Faith, Discipline, Brotherhood",
  description:
    "Onward Christian Soldiers (OCS) — a faith-based military brotherhood committed to Scripture, service, and excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#0a0f1e] text-white"
        suppressHydrationWarning
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
