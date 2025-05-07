import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';
import { redirect } from 'next/navigation';

export default async function LayoutWithNavFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUserFromRequest();
  if (!user || (user instanceof Response && !user.ok)) {
    return <div>{children}</div>;
  } else {
    redirect('/dashboard');
  }
}
