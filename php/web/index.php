<?php
require_once '../src/main.php';
?><!DOCTYPE html>
<html lang="en">
<head>
	<?php output_meta('Some Template', 'Some Description', 'Some Keywords'); ?>
	<?php output_head_resources() ?>
</head>
<body class="d-flex flex-column min-vh-100">
	<?php output_body_header() ?>
	<main class="flex-shrink-0">
		<section class="py-5 text-center bg-light">
			<div class="container" style="max-width: 1140px">
				<div class="row py-lg-5">
					<div class="col-lg-8 mx-auto">
						<h1 class="fw-bold mb-4">Welcome to ToDo Wizard</h1>
						<p class="lead text-muted mb-4">A powerful platform designed to help you achieve your goals. Simple, intuitive, and built for success.</p>
						<div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
							<a href="/register/"><button type="button" class="btn btn-primary btn-lg px-4 gap-3">Get Started</button></a>
							<a href="/about/"><button type="button" class="btn btn-outline-secondary btn-lg px-4">Learn More</button></a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="py-5">
			<div class="container" style="max-width: 1140px">
				<div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
					<div class="col">
						<div class="d-inline-flex align-items-center justify-content-center fs-2 mb-3">
							<i class="bi bi-gear-fill text-primary"></i>
						</div>
						<h3 class="fs-2">Feature One</h3>
						<p>Paragraph of text explaining this amazing feature of your product and why users should be excited about it.</p>
					</div>
					<div class="col">
						<div class="d-inline-flex align-items-center justify-content-center fs-2 mb-3">
							<i class="bi bi-graph-up text-primary"></i>
						</div>
						<h3 class="fs-2">Feature Two</h3>
						<p>Another paragraph of text explaining another fantastic feature that makes your product stand out from the competition.</p>
					</div>
					<div class="col">
						<div class="d-inline-flex align-items-center justify-content-center fs-2 mb-3">
							<i class="bi bi-graph-up text-primary"></i>
						</div>
						<h3 class="fs-2">Feature Three</h3>
						<p>Another paragraph of text explaining another fantastic feature that makes your product stand out from the competition.</p>
					</div>
				</div>
			</div>
		</section>
	</main>
	<?php output_body_footer() ?>
</body>
</html>
