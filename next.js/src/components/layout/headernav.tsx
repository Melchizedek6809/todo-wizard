'use client';
import { useState, useEffect, useContext } from 'react';
import AuthModal from '../auth/AuthModal';
import { Skeleton } from '@mui/material';
import UserMenu from '../auth/UserMenu';
import { AuthContext } from '@/context/AuthContext';

interface User {
	id: string;
	name: string;
	email: string;
}

export default function Navigation() {
	const { isAuthOpen, setIsAuthOpen } = useContext(AuthContext);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/api/auth/me')
			.then(res => res.json())
			.then(user => {
				if (user) {
					setUser(user);
				}
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	const handleLogout = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
			});
			
			if (response.ok) {
				setUser(null);
				window.location.reload();
			} else {
				throw new Error('Logout failed');
			}
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<nav className="bg-white shadow-sm border-b border-gray-100">
				<div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<a
							href="/"
							className="text-2xl font-light tracking-wide hover:opacity-90 transition-opacity duration-200"
						>
							<span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
								Task
							</span>
							<span className="font-black bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
								Flow
							</span>
						</a>
					</div>
					<div className="flex items-center space-x-6">
						{loading ? (
							<Skeleton 
								variant="rectangular" 
								width={100} 
								height={40} 
								className="rounded-md"
							/>
						) : user ? (
							<UserMenu user={user} onLogout={handleLogout} />
						) : (
							<button
								onClick={() => setIsAuthOpen(true)}
								className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
							>
								Sign In
							</button>
						)}
					</div>
				</div>
			</nav>

			<AuthModal
				isOpen={isAuthOpen}
				onClose={() => setIsAuthOpen(false)}
				onAuthSuccess={(userData) => {
					setUser(userData);
					setIsAuthOpen(false);
				}}
			/>
		</>
	);
}