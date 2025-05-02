import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/jwt';
import DashboardPage from '@/components/pages/DashboardPage';
import UserModel from '@/db/models/UserModel';
import { get } from 'http';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';

const Dashboard = async () => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    throw new Error('User not found or invalid user type');
  }

  return (
    <div>
      <DashboardPage user={user} />
    </div>
  );
};

export default Dashboard;
