import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
	// Only check protected routes
	if (!request.nextUrl.pathname.startsWith('/tasks')) {
		return NextResponse.next();
	}

	const authToken = request.cookies.get('auth_token')?.value;

	if (!authToken) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	const payload = await verifyToken(authToken);
	
	if (!payload) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}
