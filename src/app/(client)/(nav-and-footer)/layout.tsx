import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';
import AdminNavbar from '@/components/layout/AdminNavbar';

export default async function LayoutWithNavFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    )
  }
  return (
    <div>
      {user.role === 'admin' ? <AdminNavbar /> : <Navbar />}
      {children}
      {user.role === 'admin' ? null : <Footer />}
    </div>
  );
}
