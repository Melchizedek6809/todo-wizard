export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto py-6 px-4 text-center text-sm text-gray-500">
			<div className="max-w-6xl mx-auto">
				<p>© {currentYear} TaskFlow. All rights reserved.</p>
				<p className="mt-2">
					<a href="/privacy" className="hover:text-gray-700">Privacy Policy</a>
					{' • '}
					<a href="/terms" className="hover:text-gray-700">Terms of Service</a>
				</p>
			</div>
		</footer>
	);
}