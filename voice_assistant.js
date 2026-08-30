// Модуль: Голосовой помощник
window.Clock = window.Clock || {};

function initVoiceAssistant() {
    const btn = document.createElement('button');
    btn.textContent = 'ASK TIME';
    btn.style.cssText = "position:fixed; bottom:200px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let voiceEnabled = false;
    btn.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        btn.textContent = voiceEnabled ? 'ASK TIME: ON' : 'ASK TIME: OFF';
    });
    
    window.addEventListener('clock-tick', () => {
        if (voiceEnabled) {
            const now = new Date();
            const h = now.getHours();
            const m = now.getMinutes();
            const s = now.getSeconds();
            
            if (s % 30 === 0 && s === 0) {
                const speech = new SpeechSynthesisUtterance(`Сейчас ${h} часов ${m} минут`);
                speech.lang = 'ru-RU';
                speech.rate = 0.9;
                window.speechSynthesis.speak(speech);
            }
        }
    });
}

initVoiceAssistant();
