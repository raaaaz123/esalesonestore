import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from './components/common/MainLayout';
import { StoreProvider } from './lib/store';

export const metadata: Metadata = {
  title: "e-SalesOne Store",
  description: "Premium eCommerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
