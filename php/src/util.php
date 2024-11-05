<?php

function nav_link(string $href, string $text, string $classes = "nav-link"): string {
	$current_page = $_SERVER['REQUEST_URI'];
	
	// Remove query parameters if they exist
	$current_page = strtok($current_page, '?');
	
	// Add 'active' class if this is the current page
	if ($current_page === $href) {
		$classes .= " active";
	}
	
	return sprintf(
		'<a href="%s" class="%s">%s</a>',
		htmlspecialchars($href),
		htmlspecialchars($classes),
		htmlspecialchars($text)
	);
}