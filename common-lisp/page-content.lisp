(in-package #:todo-wizard)

(defun content-about ()
	"<main class='flex-shrink-0'>
	<!-- Hero Section -->
	<section class='py-5 text-center bg-light'>
		<div class='container' style='max-width: 1140px'>
			<div class='row py-lg-5'>
				<div class='col-lg-8 mx-auto'>
					<h1 class='fw-bold mb-4'>ToDo Wizard</h1>
					<p class='lead text-muted mb-4'>Stay organized and boost your productivity with our intuitive todo list app. Simple enough for personal tasks, powerful enough for team projects.</p>
					<div class='d-grid gap-2 d-sm-flex justify-content-sm-center'>
						<a href='/register/' class='btn btn-primary btn-lg px-4 gap-3'>Start Organizing</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class='py-5'>
		<div class='container' style='max-width: 1140px'>
			<div class='row g-4 py-5 row-cols-1 row-cols-lg-3'>
				<div class='col'>
					<div class='d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
						<i class='bi bi-check2-square text-primary'></i>
					</div>
					<h3 class='fs-2'>Smart Lists</h3>
					<p>Create multiple lists for different aspects of your life. Work, personal, shopping - keep everything organized in one place with custom categories and tags.</p>
				</div>
				<div class='col'>
					<div class='d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
						<i class='bi bi-bell text-primary'></i>
					</div>
					<h3 class='fs-2'>Smart Reminders</h3>
					<p>Never miss a deadline again. Set custom reminders and receive notifications across all your devices. Our smart scheduling helps you stay on track.</p>
				</div>
				<div class='col'>
					<div class='d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
						<i class='bi bi-people text-primary'></i>
					</div>
					<h3 class='fs-2'>Team Collaboration</h3>
					<p>Share lists with family, friends, or colleagues. Assign tasks, track progress, and achieve goals together with real-time updates and comments.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works Section -->
	<section class='py-5 bg-light'>
		<div class='container' style='max-width: 1140px'>
			<h2 class='text-center mb-5'>How It Works</h2>
			<div class='row g-4'>
				<div class='col-md-4 text-center'>
					<div class='display-6 text-primary mb-3'>1</div>
					<h4>Create Your Lists</h4>
					<p class='text-muted'>Start by creating lists for different projects or areas of your life. Customize them with colors and icons.</p>
				</div>
				<div class='col-md-4 text-center'>
					<div class='display-6 text-primary mb-3'>2</div>
					<h4>Add Your Tasks</h4>
					<p class='text-muted'>Add tasks with due dates, priorities, and descriptions. Break down big projects into manageable subtasks.</p>
				</div>
				<div class='col-md-4 text-center'>
					<div class='display-6 text-primary mb-3'>3</div>
					<h4>Stay Organized</h4>
					<p class='text-muted'>Track your progress, receive reminders, and celebrate as you check off completed tasks.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class='py-5 bg-primary text-white'>
		<div class='container' style='max-width: 1140px'>
			<div class='row align-items-center'>
				<div class='col-lg-8 text-lg-start'>
					<h2 class='fw-bold mb-3'>Ready to become more productive?</h2>
					<p class='lead mb-0'>Join thousands of organized users today. Free to get started!</p>
				</div>
				<div class='col-lg-4 text-lg-end mt-4 mt-lg-0'>
					<a href='/login/'><button type='button' class='btn btn-light btn-lg px-4'>Create Free Account</button></a>
				</div>
			</div>
		</div>
	</section>
</main>")

(defun content-index ()
  "<main class='flex-shrink-0'>
		<section class='py-5 text-center bg-light'>
			<div class='container' style='max-width: 1140px'>
				<div class='row py-lg-5'>
					<div class='col-lg-8 mx-auto'>
						<h1 class='fw-bold mb-4'>Welcome to ToDo Wizard</h1>
						<p class='lead text-muted mb-4'>A powerful platform designed to help you achieve your goals. Simple, intuitive, and built for success.</p>
						<div class='d-grid gap-2 d-sm-flex justify-content-sm-center'>
							<a href='/register/'><button type='button' class='btn btn-primary btn-lg px-4 gap-3'>Get Started</button></a>
							<a href='/about/'><button type='button' class='btn btn-outline-secondary btn-lg px-4'>Learn More</button></a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class='py-5'>
			<div class='container' style='max-width: 1140px'>
				<div class='row g-4 py-5 row-cols-1 row-cols-lg-3'>
					<div class='col'>
						<div class='d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
							<i class='bi bi-gear-fill text-primary'></i>
						</div>
						<h3 class='fs-2'>Feature One</h3>
						<p>Paragraph of text explaining this amazing feature of your product and why users should be excited about it.</p>
					</div>
					<div class='col'>
						<div class='d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
							<i class='bi bi-graph-up text-primary'></i>
						</div>
						<h3 class='fs-2'>Feature Two</h3>
						<p>Another paragraph of text explaining another fantastic feature that makes your product stand out from the competition.</p>
					</div>
					<div class='col'>
						<div class='d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
							<i class='bi bi-graph-up text-primary'></i>
						</div>
						<h3 class='fs-2'>Feature Three</h3>
						<p>Another paragraph of text explaining another fantastic feature that makes your product stand out from the competition.</p>
					</div>
				</div>
			</div>
		</section>
	</main>")
