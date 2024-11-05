import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();

		// Validate input
		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !await bcrypt.compare(password, user.password)) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 400 }
			);
		}

		// Create tokens
		const { password: _, ...userWithoutPassword } = user;
		const authToken = await createAccessToken(userWithoutPassword);

		// Store refresh token in database
		await prisma.session.create({
			data: {
				userId: user.id,
				authToken,
			},
		});

		const response = NextResponse.json(userWithoutPassword);
		
		// Set cookies
		response.cookies.set({
			name: 'auth_token',
			value: authToken,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 365 * 24 * 60 * 60, // 365 days
		});

		return response;

	} catch (error) {
		console.error('Signin error:', error);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		);
	}
}