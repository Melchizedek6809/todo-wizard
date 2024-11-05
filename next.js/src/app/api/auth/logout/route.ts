import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
	try {
		const cookieStore = await cookies();
		const authToken = cookieStore.get('auth_token')?.value;

		if (authToken) {
			// Remove session from database
			await prisma.session.delete({
				where: { authToken },
			});
		}

		const response = NextResponse.json({ success: true });
		
		// Clear cookies with path and domain
		response.cookies.set({
			name: 'auth_token',
			value: '',
			expires: new Date(0),
			path: '/',
		});
		
		return response;
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		);
	}
}