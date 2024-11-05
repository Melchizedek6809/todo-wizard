import PageTitle from "@/components/format/PageTitle";

export default function TermsPage() {
	return (
		<main className="max-w-4xl mx-auto p-8">
			<PageTitle>Terms of Service</PageTitle>
			<div className="bg-white shadow-sm rounded-lg p-8 space-y-6">
				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">1. Agreement to Terms</h2>
					<p className="text-gray-600">
						By accessing or using TaskFlow, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">2. Account Responsibilities</h2>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						<li>You are responsible for maintaining the confidentiality of your account credentials</li>
						<li>You must provide accurate and complete information when creating an account</li>
						<li>You are responsible for all activities that occur under your account</li>
						<li>You must notify us immediately of any unauthorized use of your account</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">3. Acceptable Use</h2>
					<p className="text-gray-600 mb-3">
						You agree not to:
					</p>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						<li>Use the service for any illegal purposes</li>
						<li>Share your account with others</li>
						<li>Attempt to gain unauthorized access to our systems</li>
						<li>Upload malicious content or interfere with our service</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Service Modifications</h2>
					<p className="text-gray-600">
						We reserve the right to modify, suspend, or discontinue any part of our service at any time. 
						We will provide reasonable notice of any significant changes.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Data and Privacy</h2>
					<p className="text-gray-600">
						Your use of TaskFlow is also governed by our Privacy Policy. By using our service, 
						you agree to our collection and use of information as described in the Privacy Policy.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">6. Termination</h2>
					<p className="text-gray-600">
						We may terminate or suspend your account at any time for violations of these terms. 
						You may also delete your account at any time through the account settings.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">7. Limitation of Liability</h2>
					<p className="text-gray-600">
						TaskFlow is provided "as is" without any warranties. We are not liable for any damages 
						or losses related to your use of our service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3 text-gray-900">8. Contact</h2>
					<p className="text-gray-600">
						If you have any questions about these Terms of Service, please contact us at terms@taskflow.com
					</p>
				</section>

				<footer className="mt-8 pt-6 border-t border-gray-200 text-gray-500 text-sm">
					<p>Last updated: {new Date().toLocaleDateString()}</p>
				</footer>
			</div>
		</main>
	);
}