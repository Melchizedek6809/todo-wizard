import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET || 'fallback_secret_key_for_development'
);

export async function createAccessToken(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('365d')
		.sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET);
		return payload;
	} catch (error) {
		return null;
	}
}