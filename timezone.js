// Модуль: Часовой пояс
window.Clock = window.Clock || {};

function initTimezone() {
    const btn = document.createElement('button');
    btn.textContent = 'TZ: LOCAL';
    btn.style.cssText = "position:fixed; bottom:170px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let selectedTimezone = 'local';
    
    btn.addEventListener('click', () => {
        const input = prompt('Введите часовой пояс (например: Europe/London, America/New_York или LOCAL):', selectedTimezone);
        if (input) {
            selectedTimezone = input;
            btn.textContent = `TZ: ${selectedTimezone.toUpperCase()}`;
        }
    });
    
    // Слушаем событие тика
    window.addEventListener('clock-tick', () => {
        const now = new Date();
        let timeString = now.toTimeString().split(' ')[0];
        
        if (selectedTimezone !== 'local') {
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: selectedTimezone };
            timeString = new Intl.DateTimeFormat('ru-RU', options).format(now).replace(',', '');
        }
        
        document.getElementById('readout').textContent = timeString;
    });
}

initTimezone();
