<?php
require_once '../../src/main.php';

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $user) {
	// Handle delete action
	if (isset($_POST['action']) && $_POST['action'] === 'delete' && isset($_POST['task_id'])) {
		$taskId = (int)$_POST['task_id'];
		// Verify the task belongs to the user before deleting
		if (Database::db()->deleteTask($user['id'], $taskId)) {
			header('Location: /tasks/');
			exit;
		}
	}
	
	// Handle create action (your existing create task code)
	if (isset($_POST['title'])) {
		$title = trim($_POST['title']);
		if (!empty($title)) {
			if (Database::db()->createTask($user['id'], $title)) {
				header('Location: /tasks/'); // Redirect to refresh the page
				exit;
			}
		}
	}
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<?php output_meta('ToDo Wizard', 'Some Description', 'Some Keywords'); ?>
	<?php output_head_resources() ?>
</head>
<body class="d-flex flex-column min-vh-100">
	<?php output_body_header() ?>
	<main class="flex-shrink-0">
		<?php if ($user): ?>
			<div class="container mt-4 content-width">
				<h1>My Tasks</h1>
				<div class="row">
					<div class="col-md-12">
						<!-- Task List -->
						<div class="list-group">
							<?php
							$tasks = Database::db()->getUserTasks($user['id']);
							if ($tasks && count($tasks) > 0):
								foreach ($tasks as $task):
							?>
								<div class="list-group-item list-group-item-action">
									<div class="d-flex w-100 justify-content-between align-items-start">
										<h5 class="mb-1" style="white-space: pre-wrap; word-break: break-word;"><?php echo htmlspecialchars($task['text']); ?></h5>
										<form action="/tasks/" method="POST" class="d-inline">
											<input type="hidden" name="action" value="delete">
											<input type="hidden" name="task_id" value="<?php echo $task['id']; ?>">
											<button type="submit" class="btn btn-danger btn-sm">Delete</button>
										</form>
									</div>
								</div>
							<?php
								endforeach;
							else:
							?>
								<div class="alert alert-info">
									No tasks found. Start by adding a new task!
								</div>
							<?php endif; ?>
						</div>
						
						<!-- Quick Add Task Form -->
						<div class="mt-3">
							<form action="/tasks/" method="POST" class="row g-3 align-items-start" id="addTaskForm">
								<div class="col-auto flex-grow-1">
									<textarea 
										class="form-control" 
										name="title" 
										placeholder="Enter new task" 
										required
										rows="1"
										style="min-height: 38px; resize: none;"
										oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"
										onkeydown="handleTaskKeyPress(event)"
									></textarea>
								</div>
								<div class="col-auto">
									<button type="submit" class="btn btn-primary">Add Task</button>
								</div>
							</form>
						</div>

						<script>
						function handleTaskKeyPress(event) {
							if (event.key === 'Enter') {
								if (!event.shiftKey) {
									event.preventDefault();
									if (event.target.value.trim()) {
										document.getElementById('addTaskForm').submit();
									}
								}
							}
						}
						</script>
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
