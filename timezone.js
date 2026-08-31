window.Clock = window.Clock || {};

function initTimezone() {
    const btn = document.getElementById('btn-timezone');
    if (btn) {
        btn.textContent = 'TZ: LOCAL';
        btn.addEventListener('click', () => {
            const input = prompt('Введите часовой пояс (например: Europe/London, America/New_York или LOCAL):', selectedTimezone);
            if (input) {
                selectedTimezone = input;
                btn.textContent = `TZ: ${selectedTimezone.toUpperCase()}`;
            }
        });
    }
    
    let selectedTimezone = 'local';
    
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
