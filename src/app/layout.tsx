import type { Metadata } from "next";
import MapBar from '../components/MapBar'
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <MapBar/>
          {children}
      </body>
    </html>
  );
}