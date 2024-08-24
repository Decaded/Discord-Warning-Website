loadTranslations(lang).then(data => {
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
});
