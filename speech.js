window.Clock = window.Clock || {};

function initSpeech() {
    const btn = document.getElementById('btn-voice');
    if (btn) {
        btn.textContent = 'VOICE: OFF';
        btn.addEventListener('click', () => {
            voiceEnabled = !voiceEnabled;
            btn.textContent = voiceEnabled ? 'VOICE: ON' : 'VOICE: OFF';
        });
    }
    
    let voiceEnabled = false;
    
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
