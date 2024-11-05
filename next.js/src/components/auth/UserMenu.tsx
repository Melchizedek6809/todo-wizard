'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Menu, MenuItem, Modal, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

interface User {
	id: string;
	name: string;
	email: string;
}

interface UserMenuProps {
	user: User;
	onLogout: () => Promise<void>;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
	const pathname = usePathname();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				onClick={handleMenuClick}
				startIcon={<AccountCircleIcon />}
				color="primary"
			>
				{user.name}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={() => {
					setIsAccountModalOpen(true);
					handleMenuClose();
				}}>
					<EmailIcon className="mr-2" />
					My Account
				</MenuItem>
				<MenuItem onClick={() => {
					handleMenuClose();
					onLogout();
				}}>
					<LogoutIcon className="mr-2" />
					Logout
				</MenuItem>
			</Menu>

			<Modal
				open={isAccountModalOpen}
				onClose={() => setIsAccountModalOpen(false)}
			>
				<Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-96">
					<button
						onClick={() => setIsAccountModalOpen(false)}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<CloseIcon className="w-5 h-5" />
					</button>

					<h2 className="text-2xl font-semibold mb-4">Account Information</h2>
					<div className="space-y-4">
						<div>
							<label className="font-medium text-gray-600">Name:</label>
							<p className="mt-1">{user.name}</p>
						</div>
						<div>
							<label className="font-medium text-gray-600">Email:</label>
							<p className="mt-1">{user.email}</p>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);
}