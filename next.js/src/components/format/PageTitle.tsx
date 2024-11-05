interface PageTitleProps {
	children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
	return (
		<h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
			{children}
		</h1>
	);
}