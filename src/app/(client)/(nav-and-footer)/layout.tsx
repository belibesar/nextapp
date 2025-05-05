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
    throw new Error('User not found or invalid user type');
  }
  return (
    <div>
      {user.role === 'admin' ? <AdminNavbar /> : <Navbar />}
      {children}
      {user.role === 'admin' ? null : <Footer />}
    </div>
  );
}
