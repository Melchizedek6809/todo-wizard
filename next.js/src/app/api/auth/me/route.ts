import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('auth_token')?.value;

		if (!token) {
			return NextResponse.json(null);
		}

		const payload = await verifyToken(token);
		if (!payload) {
			return NextResponse.json(null);
		}

		const user = await prisma.user.findUnique({
			where: { id: payload.id as string },
			select: {
				id: true,
				email: true,
				name: true,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		console.error('Auth check error:', error);
		return NextResponse.json(null);
	}
}