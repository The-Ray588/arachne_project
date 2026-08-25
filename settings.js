// Сохранение и загрузка настроек из localStorage
export function initSettings() {
    const savedBrightness = localStorage.getItem('arachne_brightness');
    if (savedBrightness) {
        document.documentElement.style.setProperty('--brightness', savedBrightness + '%');
    }
    
    const savedTheme = localStorage.getItem('arachne_theme');
    if (savedTheme === 'daylight') {
        document.body.classList.add('daylight');
    }
    
    const savedSound = localStorage.getItem('arachne_sound');
    if (savedSound === 'off') {
        window.Clock.soundEnabled = false;
    }
    
    // Пример: добавление ползунка внизу страницы (без изменения HTML!)
    const slider = document.createElement('div');
    slider.innerHTML = `
        <label style="font-size:11px; letter-spacing:2px; color:#a8873f;">BRIGHTNESS</label>
        <input type="range" min="40" max="160" value="${savedBrightness || 100}" style="width:150px; margin-left:10px;">
    `;
    slider.style.cssText = "position:fixed; bottom:20px; right:20px; display:flex; align-items:center; gap:10px;";
    document.body.appendChild(slider);
    
    slider.querySelector('input').addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--brightness', val + '%');
        localStorage.setItem('arachne_brightness', val);
    });
}
