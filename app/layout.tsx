import type {Metadata} from "next";
import "./globals.css";
import Providers from "Shared/lib/core/providers";

export const metadata: Metadata = {
  title: "UMA Calendar",
  description: "Full Stack Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" className="h-full w-full">
        <body className="h-full w-full">
          {children}
        </body>
      </html>
    </Providers >
  );
}
