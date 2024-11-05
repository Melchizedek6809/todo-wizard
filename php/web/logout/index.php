<?php
require_once '../../src/main.php';

setcookie('session_token', '', time() - 365 * 86400, '/');
header('Location: /');
exit;
