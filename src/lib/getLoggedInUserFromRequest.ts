import { verifyToken } from '@/utils/jwt';
import UserModel from '@/db/models/UserModel';
import { cookies } from 'next/headers';
import errorHandler from './errorHandler';

export async function getLoggedInUserFromRequest() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('Authorization')?.value;

    if (!cookie) throw new Error('Unauthorized');

    const [type, token] = cookie.split(' ');
    if (type !== 'Bearer' || !token) throw new Error('Invalid token');

    const userData = await verifyToken<{ _id: string; email: string }>(token);
    const user = await UserModel.findById(userData._id);
    return user;
  } catch (error) {
    return errorHandler(error);
  }
}
