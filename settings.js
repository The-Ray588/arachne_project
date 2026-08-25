// Локальное хранилище для настроек
window.Clock = window.Clock || { soundEnabled: true };

function saveSettings() {
    localStorage.setItem('arachne_brightness', document.documentElement.style.getPropertyValue('--brightness') || '100');
    localStorage.setItem('arachne_theme', document.body.classList.contains('daylight') ? 'daylight' : 'night');
    localStorage.setItem('arachne_sound', window.Clock.soundEnabled ? 'on' : 'off');
}

function loadSettings() {
    const savedBrightness = localStorage.getItem('arachne_brightness');
    const savedTheme = localStorage.getItem('arachne_theme');
    const savedSound = localStorage.getItem('arachne_sound');
    
    if (savedBrightness) {
        document.documentElement.style.setProperty('--brightness', savedBrightness + '%');
    }
    if (savedTheme === 'daylight') {
        document.body.classList.add('daylight');
    }
    if (savedSound === 'off') {
        window.Clock.soundEnabled = false;
    }
}

// Добавляем ползунок яркости
function addBrightnessSlider() {
    const slider = document.createElement('div');
    slider.innerHTML = `
        <label style="font-size:11px; letter-spacing:2px; color:#a8873f;">BRIGHTNESS</label>
        <input type="range" min="40" max="160" value="100" style="width:150px; margin-left:10px;">
    `;
    slider.style.cssText = "position:fixed; bottom:20px; right:20px; display:flex; align-items:center; gap:10px;";
    document.body.appendChild(slider);
    
    slider.querySelector('input').addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--brightness', val + '%');
        saveSettings();
    });
}

// Добавляем кнопку темы
function addThemeToggle() {
    const btn = document.createElement('button');
    btn.textContent = 'DAYLIGHT';
    btn.style.cssText = "position:fixed; bottom:20px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer;";
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
        document.body.classList.toggle('daylight');
        if (document.body.classList.contains('daylight')) {
            btn.textContent = 'NIGHT';
        } else {
            btn.textContent = 'DAYLIGHT';
        }
        saveSettings();
    });
}

// Добавляем кнопку звука
function addSoundToggle() {
    const btn = document.createElement('button');
    btn.textContent = window.Clock.soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
    btn.style.cssText = "position:fixed; bottom:60px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer;";
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
        window.Clock.soundEnabled = !window.Clock.soundEnabled;
        btn.textContent = window.Clock.soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
        saveSettings();
    });
}

// Запуск
loadSettings();
addBrightnessSlider();
addThemeToggle();
addSoundToggle();
