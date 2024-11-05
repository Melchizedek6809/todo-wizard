import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

// GET /api/tasks
export async function GET() {
	try {
		const tasks = await prisma.task.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		});
		return NextResponse.json(tasks);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch tasks' },
			{ status: 500 }
		);
	}
}

// POST /api/tasks
export async function POST(request: Request) {
	try {
		const { title } = await request.json();

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

		if (!user) {
			return NextResponse.json(null);
		}
		const task = await prisma.task.create({
			data: {
				title,
				userId: user.id,
			},
		});

		return NextResponse.json(task);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to create task' },
			{ status: 500 }
		);
	}
}

// DELETE /api/task
export async function DELETE(request: Request) {
	try {
		const { id } = await request.json();

		await prisma.task.delete({
			where: {
				id,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to delete task' },
			{ status: 500 }
		);
	}
}