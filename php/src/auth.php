<?php
require 'db.php';

function getCurrentUser() {
	$sessionToken = $_COOKIE['session_token'] ?? '';
	return Database::db()->getUserBySessionToken($sessionToken);
}
