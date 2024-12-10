import "./globals.css";

import { Fira_Sans } from 'next/font/google';

// const fira_sans

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
