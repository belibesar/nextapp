import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeliBesar | Mitra Grosir Terpercaya',
  description: 'BeliBesar adalah platform yang menghubungkan supplier dan reseller untuk memudahkan transaksi grosir.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="scroll-smooth">{children}</main>
      </body>
    </html>
  );
}
