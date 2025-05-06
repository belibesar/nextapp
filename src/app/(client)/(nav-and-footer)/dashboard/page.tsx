import AdminDashboardPage from '@/components/pages/Admin/AdminDashboardPage';
import UserDashboardPage from '@/components/pages/User/UserDashboardPage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';

const Dashboard = async () => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    throw new Error('User not found or invalid user type');
  }
  return <div>{user.role === 'admin' ? <AdminDashboardPage user={user} /> : <UserDashboardPage user={user} />}</div>;
};

export default Dashboard;
