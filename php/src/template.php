<?php

function output_meta($title = '', $description = '', $keywords = '') {
	?>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="<?= $description ?>">
	<title><?= $title ?></title>
	<?php
}

function output_head_resources() {
	?>
	<link rel="stylesheet" href="/res/bootstrap/css/bootstrap.min.css">
	<script src="/res/bootstrap/js/bootstrap.min.js" defer></script>

	<link rel="stylesheet" href="/res/main.css">
	<script src="/res/main.js" defer></script>
	<?php
}

function output_user_panel($user) {
	?>
		<div class="offcanvas offcanvas-end" tabindex="-1" id="userPanel">
			<div class="offcanvas-header border-bottom">
				<h5 class="offcanvas-title">User Profile</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div class="offcanvas-body">
				<!-- User Info Section -->
				<div class="text-center mb-4 py-3 bg-light rounded">
					<i class="bi bi-person-circle display-4"></i>
					<h5 class="mt-2 mb-1"><?= htmlspecialchars($user['email']) ?></h5>
				</div>

				<!-- Menu Options -->
				<div class="d-grid gap-2">
					<a href="/profile/" class="btn btn-outline-primary">
						<i class="bi bi-person-gear me-2"></i>Edit Profile
					</a>
					<hr class="my-3">
					<a href="/logout/" class="btn btn-danger">
						<i class="bi bi-box-arrow-right me-2"></i>Logout
					</a>
				</div>
			</div>
		</div>
	<?php
}

$user = getCurrentUser();

function output_body_header() {
	global $user;
	?>
	<header>
		<?php output_user_panel($user); ?>
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
			<div class="container content-width">
				<a class="navbar-brand" href="/"><?= SITE_TITLE ?></a>
				
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item">
							<?= nav_link('/', 'Home') ?>
						</li>
						<?php if ($user): ?>
						<li class="nav-item">
							<?= nav_link('/tasks/', 'Tasks') ?>
						</li>
						<?php endif; ?>
						<li class="nav-item">
							<?= nav_link('/about/', 'About') ?>
						</li>
						<li class="nav-item">
							<?= nav_link('/contact/', 'Contact') ?>
						</li>
						<li class="nav-item ms-lg-2">
							<?php 
							if ($user) {
								?>
								<style>
								.user-btn:hover span {
									filter: grayscale(1) brightness(0) !important;
								}
								</style>
								<button class="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center user-btn" 
									style="width: 38px; height: 38px;" 
									type="button" 
									data-bs-toggle="offcanvas" 
									data-bs-target="#userPanel">
									<span style="filter: grayscale(1) brightness(100);">👤</span>
								</button>
								<?php
							} else {
								echo '<a href="/login/" class="btn btn-outline-light">Login</a>';
							}
							?>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
	<?php
}

function output_body_footer() {
	?>
	<footer class="footer mt-auto py-4 bg-light">
		<div class="container content-width">
			<div class="row">
				<div class="col-md-6 text-center text-md-start">
					<p class="text-muted mb-0">&copy; <?= date('Y') ?> - Ben</p>
				</div>
				<div class="col-md-6 text-center text-md-start">
					
				</div>
			</div>
		</div>
	</footer>
	<?php
}
