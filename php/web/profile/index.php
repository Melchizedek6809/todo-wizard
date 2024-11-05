<?php
require_once '../../src/main.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<?php output_meta('ToDo Wizard - Profile', 'Some Description', 'Some Keywords'); ?>
	<?php output_head_resources() ?>
</head>
<body class="d-flex flex-column min-vh-100">
	<?php output_body_header() ?>
	<main class="flex-shrink-0">
		<?php if ($user): ?>
			<div class="container mt-4">
				<h1>Profile Information</h1>
				<div class="card">
					<div class="card-body">
						<div class="mb-3">
							<strong>Email:</strong> 
							<?php echo htmlspecialchars($user['email']); ?>
						</div>
						<div class="mb-3">
							<strong>Member Since:</strong> 
							<?php echo date('F j, Y', strtotime($user['created_at'])); ?>
						</div>
					</div>
				</div>
			</div>
		<?php else: ?>
			<div class="container mt-4">
				<div class="alert alert-warning">
					Please log in to view your profile information.
				</div>
			</div>
		<?php endif; ?>
	</main>
	<?php output_body_footer() ?>
</body>
</html>
