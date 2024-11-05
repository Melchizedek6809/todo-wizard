<?php
require_once '../../src/main.php';

$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$email = $_POST['email'];
	$password = $_POST['password'];

	if (empty($email) || empty($password)) {
		$error_message = 'Email and password are required';
	} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$error_message = 'Invalid email format';
	} else {
		$user = Database::db()->getUserByEmail($email);
		if (!$user) {
			$error_message = 'User not found';
		} else if (!password_verify($password, $user['password_hash'])) {
			$error_message = 'Invalid password';
		} else {
			$sessionToken = Database::db()->createSession($user['id']);
			if (!$sessionToken) {
				$error_message = 'Failed to create session';
			} else {
				setcookie('session_token', $sessionToken, time() + 365 * 86400, '/');
				header('Location: /');
				exit;
			}
		}
	}
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<?php output_meta('ToDo Wizard - Login', 'Some Description', 'Some Keywords'); ?>
	<?php output_head_resources() ?>
</head>
<body class="d-flex flex-column min-vh-100">
	<?php output_body_header() ?>
	<main class="flex-shrink-0">
	<section class="py-5">
		<div class="container" style="max-width: 1140px">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div class="text-center mb-4">
						<h1 class="fw-bold">Login</h1>
						<p class="text-muted">Welcome back to ToDo Wizard</p>
					</div>
					<div class="card border-0 shadow-sm">
						<div class="card-body p-4 p-md-5">
							<form action="/login/" method="post">
								<div class="row g-4">
									<div class="col-12">
										<label for="loginEmail" class="form-label">Email</label>
										<input type="email" class="form-control form-control-lg" id="loginEmail" name="email" 
											value="<?php echo htmlspecialchars($email ?? ''); ?>" required>
									</div>
									<div class="col-12">
										<label for="loginPassword" class="form-label">Password</label>
										<input type="password" class="form-control form-control-lg" id="loginPassword" name="password" 
											value="<?php echo htmlspecialchars($password ?? ''); ?>" required>
									</div>
									<div class="col-12">
										<button type="submit" class="btn btn-primary btn-lg w-100">Login</button>
									</div>
									<div class="col-12 text-center">
										<p class="mb-0 text-muted">Don't have an account? <a href="/register/" class="text-decoration-none">Create one</a></p>
									</div>
								</div>
							</form>
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
