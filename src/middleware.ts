import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './utils/jwt';
import errorHandler from './lib/errorHandler';

export async function middleware(request: NextRequest) {
    try {
        const getCookie = request.cookies.get('Authorization')?.value;
        const [type, token] = getCookie?.split(' ') || [];
        if (type !== 'Bearer' || !token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        const tokenPayload = await verifyToken(token as string)
        request.headers.set('x-user-data', JSON.stringify(tokenPayload));
        return NextResponse.next();
    } catch (error) {
        return errorHandler(error)
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/orders/:path*', '/products/:path*', '/profile/:path*', '/api/producers:path*', '/api/products:path*'],
};