import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

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
      <body className={`${poppins.className} antialiased`}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
