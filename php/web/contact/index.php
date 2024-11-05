<?php
require_once '../../src/main.php';
?><!DOCTYPE html>
<html lang="en">
<head>
	<?php output_meta('ToDo Wizard - Contact', 'Some Description', 'Some Keywords'); ?>
	<?php output_head_resources() ?>
</head>
<body class="d-flex flex-column min-vh-100">
	<?php output_body_header() ?>
	<main class="flex-shrink-0">
		<!-- Contact Header -->
		<section class="py-5 bg-light">
			<div class="container" style="max-width: 1140px">
				<div class="row justify-content-center">
					<div class="col-lg-8 text-center">
						<h1 class="fw-bold mb-3">Get in Touch</h1>
						<p class="lead text-muted">Have questions about ToDo Wizard? We're here to help!</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Contact Options -->
		<section class="py-5">
			<div class="container" style="max-width: 1140px">
				<div class="row g-4 justify-content-center">
					<!-- Email Contact -->
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-sm">
							<div class="card-body text-center p-4">
								<div class="mb-3">
									<i class="bi bi-envelope text-primary display-5"></i>
								</div>
								<h3 class="h4 mb-3">Email Us</h3>
								<p class="text-muted mb-3">We'll respond within 24 hours</p>
								<a href="mailto:contact@todowizard.com" class="text-decoration-none">contact@todowizard.com</a>
							</div>
						</div>
					</div>

					<!-- Social Media -->
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-sm">
							<div class="card-body text-center p-4">
								<div class="mb-3">
									<i class="bi bi-chat-dots text-primary display-5"></i>
								</div>
								<h3 class="h4 mb-3">Social Media</h3>
								<p class="text-muted mb-3">Follow us for updates</p>
								<div class="d-flex justify-content-center gap-3">
									<a href="#" class="text-decoration-none text-muted">
										<i class="bi bi-twitter fs-4"></i>
									</a>
									<a href="#" class="text-decoration-none text-muted">
										<i class="bi bi-linkedin fs-4"></i>
									</a>
									<a href="#" class="text-decoration-none text-muted">
										<i class="bi bi-github fs-4"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

		<!-- FAQ Section -->
		<section class="py-5 bg-light">
			<div class="container" style="max-width: 1140px">
				<h3 class="text-center mb-4">Frequently Asked Questions</h3>
				<div class="row justify-content-center">
					<div class="col-lg-8">
						<div class="accordion" id="faqAccordion">
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
										What are your support hours?
									</button>
								</h2>
								<div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
									<div class="accordion-body">
										We provide support Monday through Friday, 9 AM to 5 PM EST. Email responses are typically sent within 24 hours.
									</div>
								</div>
							</div>
							<div class="accordion-item">
								<h2 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
										How can I report a bug?
									</button>
								</h2>
								<div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
									<div class="accordion-body">
										You can report bugs through our contact form or by emailing us directly. Please include as much detail as possible about the issue.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
	<?php output_body_footer() ?>
</body>
</html>
