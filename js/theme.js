const themeToggleButton = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to apply the current theme
function applyTheme(theme) {
	if (theme === 'dark') {
		document.body.classList.add('dark-mode');
		document.body.classList.remove('light-mode');
		themeToggleButton.textContent = 'Switch to Light Mode';
	} else {
		document.body.classList.add('light-mode');
		document.body.classList.remove('dark-mode');
		themeToggleButton.textContent = 'Switch to Dark Mode';
	}
	// Trigger a theme change event for other scripts
	const event = new Event('themeChange');
	document.dispatchEvent(event);
}

// Get the current theme from local storage or system preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
	applyTheme(currentTheme);
} else {
	applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}

// Toggle theme on button click
themeToggleButton.addEventListener('click', function () {
	const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
	applyTheme(newTheme);
	localStorage.setItem('theme', newTheme);
});

// Listen for changes in system preference
prefersDarkScheme.addEventListener('change', e => {
	if (localStorage.getItem('theme') === null) {
		applyTheme(e.matches ? 'dark' : 'light');
	}
});
