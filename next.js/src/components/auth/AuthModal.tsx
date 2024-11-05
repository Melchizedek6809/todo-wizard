'use client';
import { useState } from 'react';
import { Dialog, DialogContent, TextField, Button, IconButton, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
	const [tab, setTab] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		try {
			const response = await fetch('/api/auth/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Something went wrong');
			}

			onAuthSuccess(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Something went wrong');
			}

			onAuthSuccess(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			maxWidth="sm"
			fullWidth
		>
			<div className="flex justify-between items-center px-6 pt-4">
				<Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
					<Tab label="Sign In" />
					<Tab label="Sign Up" />
				</Tabs>
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{ marginLeft: 'auto' }}
				>
					<CloseIcon />
				</IconButton>
			</div>

			<DialogContent>
				{error && (
					<div className="mb-4 p-2 text-red-500 text-sm bg-red-50 rounded">
						{error}
					</div>
				)}
				
				{tab === 0 ? (
					<form className="space-y-4" onSubmit={handleSignIn}>
						<TextField
							autoFocus
							margin="dense"
							name="email"
							label="Email Address"
							type="email"
							fullWidth
							variant="outlined"
							required
						/>
						<TextField
							margin="dense"
							name="password"
							label="Password"
							type="password"
							fullWidth
							variant="outlined"
							required
						/>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							disabled={loading}
							sx={{ mt: 2 }}
						>
							{loading ? 'Signing In...' : 'Sign In'}
						</Button>
					</form>
				) : (
					<form className="space-y-4" onSubmit={handleSignUp}>
						<TextField
							autoFocus
							margin="dense"
							name="name"
							label="Name"
							type="text"
							fullWidth
							variant="outlined"
							required
						/>
						<TextField
							margin="dense"
							name="email"
							label="Email Address"
							type="email"
							fullWidth
							variant="outlined"
							required
						/>
						<TextField
							margin="dense"
							name="password"
							label="Password"
							type="password"
							fullWidth
							variant="outlined"
							required
						/>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							disabled={loading}
							sx={{ mt: 2 }}
						>
							{loading ? 'Creating Account...' : 'Create Account'}
						</Button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}