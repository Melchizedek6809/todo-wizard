<?php
require_once '../../src/main.php';

$error_message = '';
$registration_success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$passwordConfirm = $_POST['passwordConfirm'];

	if ($password !== $passwordConfirm) {
		$error_message = 'Passwords do not match';
	}

	if (!$error_message) {
		Database::db()->createUser($email, $password);
		$registration_success = true;
	}
}

?><!DOCTYPE html>
<html lang="en">
<head>
	<?php output_meta('ToDo Wizard - Register', 'Some Description', 'Some Keywords'); ?>
	<?php output_head_resources() ?>
</head>
<body class="d-flex flex-column min-vh-100">
	<?php output_body_header() ?>
	<main class="flex-shrink-0">
	<section class="py-5">
		<div class="container" style="max-width: 1140px">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<?php if ($registration_success): ?>
						<div class="text-center">
							<h1 class="fw-bold mb-4">Registration Successful!</h1>
							<div class="card border-0 shadow-sm">
								<div class="card-body p-4 p-md-5">
									<p class="mb-4">Thank you for registering with ToDo Wizard! Your account has been created successfully.</p>
									<p class="mb-4">You can now sign in to start organizing your tasks.</p>
									<a href="/login/" class="btn btn-primary btn-lg w-100">Sign In</a>
								</div>
							</div>
						</div>
					<?php else: ?>
						<div class="text-center mb-4">
							<h1 class="fw-bold">Create Account</h1>
							<p class="text-muted">Join ToDo Wizard and start organizing your tasks today</p>
						</div>
						<div class="card border-0 shadow-sm">
							<div class="card-body p-4 p-md-5">
								<?php if ($error_message): ?>
									<div class="alert alert-danger mb-4" role="alert">
										<?php echo htmlspecialchars($error_message); ?>
									</div>
								<?php endif; ?>
								<form action="/register/" method="post">
									<div class="row g-4">
										<div class="col-12">
											<label for="registerEmail" class="form-label">Email</label>
											<input type="email" class="form-control form-control-lg" id="registerEmail" name="email" 
												value="<?php echo htmlspecialchars($email ?? ''); ?>" required>
										</div>
										<div class="col-12">
											<label for="registerPassword" class="form-label">Password</label>
											<input type="password" class="form-control form-control-lg" id="registerPassword" name="password" 
												value="<?php echo htmlspecialchars($password ?? ''); ?>" required>
										</div>
										<div class="col-12">
											<label for="registerPasswordConfirm" class="form-label">Confirm Password</label>
											<input type="password" class="form-control form-control-lg" id="registerPasswordConfirm" name="passwordConfirm" 
												value="<?php echo htmlspecialchars($passwordConfirm ?? ''); ?>" required>
										</div>
										<div class="col-12">
											<button type="submit" class="btn btn-primary btn-lg w-100">Create Account</button>
										</div>
										<div class="col-12 text-center">
											<p class="mb-0 text-muted">Already have an account? <a href="/login/" class="text-decoration-none">Sign in</a></p>
										</div>
									</div>
								</form>
							</div>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>
	</main>
	<?php output_body_footer() ?>
</body>
</html>
