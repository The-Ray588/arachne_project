// Модуль: Голосовое объявление времени
window.Clock = window.Clock || {};

function initSpeech() {
    const btn = document.createElement('button');
    btn.textContent = 'VOICE: OFF';
    btn.style.cssText = "position:fixed; bottom:110px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let voiceEnabled = false;
    btn.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        btn.textContent = voiceEnabled ? 'VOICE: ON' : 'VOICE: OFF';
    });

    // Слушаем событие тика
    window.addEventListener('clock-tick', () => {
        if (voiceEnabled) {
            const now = new Date();
            const h = now.getHours();
            const m = now.getMinutes();
            
            if (m % 30 === 0 && now.getSeconds() === 0) {
                const speech = new SpeechSynthesisUtterance(`Сейчас ${h} часов ${m} минут`);
                speech.lang = 'ru-RU';
                speech.rate = 0.9;
                window.speechSynthesis.speak(speech);
            }
        }
    });
}

initSpeech();
