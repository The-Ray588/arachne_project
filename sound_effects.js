export function initSoundEffects() {
    window.Clock.soundEnabled = true;
    
    // Обновляет настройку звука при каждом тике (вызывается из app.js)
    window.addEventListener('clock-tick', () => {
        // Здесь можно добавить случайный шорох, если захотите
    });
    
    // Пример: Создаем кнопку для выключения звука
    const soundBtn = document.createElement('button');
    soundBtn.textContent = 'SOUND: ON';
    soundBtn.style.cssText = "position:fixed; bottom:20px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer;";
    document.body.appendChild(soundBtn);
    
    soundBtn.addEventListener('click', () => {
        window.Clock.soundEnabled = !window.Clock.soundEnabled;
        soundBtn.textContent = window.Clock.soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
        localStorage.setItem('arachne_sound', window.Clock.soundEnabled ? 'on' : 'off');
    });
}
