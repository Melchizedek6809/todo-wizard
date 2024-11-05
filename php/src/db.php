<?php

class Database
{
	private $db;
	private static $instance = null;

	private function __construct()
	{
		try {
			$this->db = new SQLite3(__DIR__ . '/../data/database.sqlite');
			$this->initTables();
		} catch (Exception $e) {
			die("Database connection failed: " . $e->getMessage());
		}
	}

	// Singleton pattern to ensure single database connection
	public static function getInstance()
	{
		if (self::$instance === null) {
			self::$instance = new Database();
		}
		return self::$instance;
	}

	// Shorter static alias for getInstance()
	public static function db()
	{
		return self::getInstance();
	}

	private function initTables()
	{
		// Users table
		$this->db->exec('
			CREATE TABLE IF NOT EXISTS users (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				password_hash TEXT NOT NULL,
				email TEXT UNIQUE NOT NULL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		');

		// Sessions table
		$this->db->exec('
			CREATE TABLE IF NOT EXISTS sessions (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				user_id INTEGER NOT NULL,
				session_token TEXT UNIQUE NOT NULL,
				expires_at DATETIME NOT NULL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (user_id) REFERENCES users(id)
			)
		');

		// Tasks table
		$this->db->exec('
			CREATE TABLE IF NOT EXISTS tasks (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				user_id INTEGER NOT NULL,
				text TEXT NOT NULL,
				due_date DATETIME,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				completed BOOLEAN DEFAULT 0,
				FOREIGN KEY (user_id) REFERENCES users(id)
			)
		');
	}

	// User-related functions
	public function createUser($email, $password)
	{
		$stmt = $this->db->prepare('
			INSERT INTO users (email, password_hash)
			VALUES (:email, :password_hash)
		');

		$stmt->bindValue(':email', $email, SQLITE3_TEXT);
		$stmt->bindValue(':password_hash', password_hash($password, PASSWORD_DEFAULT), SQLITE3_TEXT);

		return $stmt->execute() ? $this->db->lastInsertRowID() : false;
	}

	public function getUserByEmail($email)
	{
		$stmt = $this->db->prepare('SELECT * FROM users WHERE email = :email');
		$stmt->bindValue(':email', $email, SQLITE3_TEXT);
		$result = $stmt->execute();
		return $result ? $result->fetchArray(SQLITE3_ASSOC) : null;
	}

	public function getUserById($id)
	{
		$stmt = $this->db->prepare('SELECT * FROM users WHERE id = :id');
		$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
		$result = $stmt->execute();
		return $result ? $result->fetchArray(SQLITE3_ASSOC) : null;
	}

	// Session-related functions
	public function createSession($userId, $expiresIn = 86400)
	{
		$token = bin2hex(random_bytes(32));
		$expiresAt = date('Y-m-d H:i:s', time() + $expiresIn);

		$stmt = $this->db->prepare('
			INSERT INTO sessions (user_id, session_token, expires_at)
			VALUES (:user_id, :token, :expires_at)
		');

		$stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);
		$stmt->bindValue(':token', $token, SQLITE3_TEXT);
		$stmt->bindValue(':expires_at', $expiresAt, SQLITE3_TEXT);

		return $stmt->execute() ? $token : false;
	}

	public function validateSession(string $token)
	{
		$stmt = $this->db->prepare('
			SELECT s.*, u.* 
			FROM sessions s
			JOIN users u ON s.user_id = u.id
			WHERE s.session_token = :token 
			AND s.expires_at > datetime("now")
		');

		$stmt->bindValue(':token', $token, SQLITE3_TEXT);
		$result = $stmt->execute();
		return $result ? $result->fetchArray(SQLITE3_ASSOC) : null;
	}

	public function getSessionByToken(string $token)
	{
		$stmt = $this->db->prepare('SELECT * FROM sessions WHERE session_token = :token');
		$stmt->bindValue(':token', $token, SQLITE3_TEXT);
		$result = $stmt->execute();
		return $result ? $result->fetchArray(SQLITE3_ASSOC) : null;
	}

	public function getUserBySessionToken(string $token)
	{
		$session = $this->getSessionByToken($token);
		return $session ? $this->getUserById($session['user_id']) : null;
	}

	public function deleteSession(string $token)
	{
		$stmt = $this->db->prepare('DELETE FROM sessions WHERE session_token = :token');
		$stmt->bindValue(':token', $token, SQLITE3_TEXT);
		return $stmt->execute();
	}

	// Clean up expired sessions
	public function cleanExpiredSessions()
	{
		return $this->db->exec('DELETE FROM sessions WHERE expires_at <= datetime("now")');
	}

	// Task-related functions
	public function createTask($userId, $text, $dueDate = null)
	{
		$stmt = $this->db->prepare('
			INSERT INTO tasks (user_id, text, due_date)
			VALUES (:user_id, :text, :due_date)
		');

		$stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);
		$stmt->bindValue(':text', $text, SQLITE3_TEXT);
		$stmt->bindValue(':due_date', $dueDate, SQLITE3_TEXT);

		return $stmt->execute() ? $this->db->lastInsertRowID() : false;
	}

	public function getUserTasks($userId)
	{
		$stmt = $this->db->prepare('
			SELECT * FROM tasks 
			WHERE user_id = :user_id 
			ORDER BY due_date ASC, created_at DESC
		');

		$stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);
		$result = $stmt->execute();

		$tasks = [];
		while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
			$tasks[] = $row;
		}
		return $tasks;
	}

	public function updateTask($taskId, $userId, $data)
	{
		$fields = [];
		$values = [];

		foreach ($data as $key => $value) {
			if (in_array($key, ['text', 'due_date', 'completed'])) {
				$fields[] = "$key = :$key";
				$values[":$key"] = $value;
			}
		}

		if (empty($fields)) return false;

		$fields[] = "modified_at = CURRENT_TIMESTAMP";
		$sql = 'UPDATE tasks SET ' . implode(', ', $fields) .
			' WHERE id = :task_id AND user_id = :user_id';

		$stmt = $this->db->prepare($sql);
		$stmt->bindValue(':task_id', $taskId, SQLITE3_INTEGER);
		$stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);

		foreach ($values as $key => $value) {
			$stmt->bindValue(
				$key,
				$value,
				is_int($value) ? SQLITE3_INTEGER : SQLITE3_TEXT
			);
		}

		return $stmt->execute();
	}

	public function deleteTask($userId, $taskId)
	{
		$stmt = $this->db->prepare('
			DELETE FROM tasks 
			WHERE id = :task_id AND user_id = :user_id
		');

		$stmt->bindValue(':task_id', $taskId, SQLITE3_INTEGER);
		$stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);

		return $stmt->execute();
	}
}
