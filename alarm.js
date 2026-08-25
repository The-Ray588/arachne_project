// Модуль: Будильник
window.Clock = window.Clock || {};

function initAlarm() {
    const btn = document.createElement('button');
    btn.textContent = 'ALARM SET';
    btn.style.cssText = "position:fixed; bottom:140px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let alarmTime = localStorage.getItem('arachne_alarm');
    if (alarmTime) btn.textContent = `ALARM: ${alarmTime}`;

    btn.addEventListener('click', () => {
        const time = prompt('Введите время будильника (ЧЧ:ММ):', alarmTime || '07:00');
        if (time) {
            alarmTime = time;
            localStorage.setItem('arachne_alarm', time);
            btn.textContent = `ALARM: ${alarmTime}`;
        }
    });

    // Слушаем событие тика
    window.addEventListener('clock-tick', () => {
        const now = new Date();
        const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        if (alarmTime && current === alarmTime && now.getSeconds() === 0) {
            if (window.Clock.soundEnabled) {
                const audioCtx = window.Clock.audioCtx;
                if (audioCtx) {
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.5);
                    
                    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 1);
                }
            }
            
            document.getElementById('readout').textContent = 'ALARM! ⏰';
            setTimeout(() => {
                document.getElementById('readout').textContent = new Date().toTimeString().split(' ')[0];
            }, 3000);
        }
    });
}

initAlarm();
