import { Albert_Sans } from "next/font/google";
import "./globals.css";

const mainFont = Albert_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "3301 Koan",
  description: "A Test of Perception",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}
