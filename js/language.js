// language.js
const languageSelect = document.getElementById('language-select');

// Load language preference from localStorage
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
	languageSelect.value = savedLanguage;
	loadTranslations(savedLanguage).then(translatePage);
}

// Handle language change event
languageSelect.addEventListener('change', () => {
	const selectedLanguage = languageSelect.value;
	localStorage.setItem('language', selectedLanguage);
	loadTranslations(selectedLanguage).then(translatePage);
});

// Function to translate the page
function translatePage(data) {
	if (!data) return;

	document.getElementById('headline').textContent = data.headline;
	document.getElementById('warning-message').textContent = data.warningMessage;
	document.getElementById('spot-suspicious').textContent = data.spotSuspicious;
	document.getElementById('after-click').textContent = data.afterClick;
	document.getElementById('closing-message').textContent = data.closingMessage;

	const suspiciousList = document.getElementById('suspicious-list');
	suspiciousList.innerHTML = '';
	data.suspiciousList.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = `<strong>${item.title}:</strong> ${item.description}`;
		suspiciousList.appendChild(li);
	});

	const afterClickList = document.getElementById('after-click-list');
	afterClickList.innerHTML = '';
	data.afterClickList.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = `<strong>${item.title}:</strong> ${item.description}`;
		afterClickList.appendChild(li);
	});
}

function loadTranslations(language) {
	return fetch(`translations/${language}.json`)
		.then(response => response.json())
		.catch(() => {
			console.error('Failed to load translations.');
			return null;
		});
}

// Automatically load translations based on saved language or default
const userLang = savedLanguage || (navigator.language || navigator.userLanguage).substring(0, 2);
const lang = userLang.startsWith('pl') ? 'pl' : userLang.startsWith('de') ? 'de' : 'en';

loadTranslations(lang).then(translatePage);
