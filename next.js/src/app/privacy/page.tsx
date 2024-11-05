import PageTitle from "@/components/format/PageTitle";

export default function PrivacyPage() {
	return (
		<main className="max-w-4xl mx-auto p-8">
			<PageTitle>Privacy Policy</PageTitle>
			<div className="bg-white shadow-sm rounded-lg p-8 space-y-6">
				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">Overview</h2>
					<p className="text-gray-600">
						TaskFlow is committed to protecting your privacy. This policy explains how we handle your data when you use our task management application.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">Information We Collect</h2>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						<li>Account information (email address and password)</li>
						<li>Task data that you create and manage</li>
						<li>Basic usage data to improve our service</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">How We Use Your Data</h2>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						<li>To provide and maintain your task management service</li>
						<li>To authenticate your account and keep it secure</li>
						<li>To improve and optimize our application</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">Data Protection</h2>
					<p className="text-gray-600">
						We use industry-standard security measures to protect your data. Your tasks and personal information are encrypted and stored securely.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">Your Rights</h2>
					<p className="text-gray-600">
						You can request to:
					</p>
					<ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
						<li>Access your personal data</li>
						<li>Correct or update your information</li>
						<li>Delete your account and associated data</li>
						<li>Export your task data</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">Contact Us</h2>
					<p className="text-gray-600">
						If you have any questions about this privacy policy or your data, please contact us at privacy@taskflow.com
					</p>
				</section>

				<footer className="mt-8 pt-6 border-t border-gray-200 text-gray-500 text-sm">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
				</footer>
			</div>
		</main>
	);
}