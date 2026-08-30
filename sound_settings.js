// Модуль: Дополнительные настройки звука
window.Clock = window.Clock || {};

function initSoundSettings() {
    const btn = document.createElement('button');
    btn.textContent = 'SOUND VOLUME';
    btn.style.cssText = "position:fixed; bottom:350px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let volume = localStorage.getItem('arachne_sound_volume') || '1.0';
    
    btn.addEventListener('click', () => {
        const vol = prompt('Введите громкость звука (0.1 - 1.0):', volume);
        if (vol) {
            volume = vol;
            localStorage.setItem('arachne_sound_volume', vol);
            
            if (window.Clock.soundEnabled) {
                window.Clock.volume = parseFloat(vol);
            }
        }
    });
    
    // Слушаем событие тика
    window.addEventListener('clock-tick', () => {
        if (window.Clock.soundEnabled) {
            const audioCtx = window.Clock.audioCtx;
            if (audioCtx) {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03);
                
                gainNode.gain.setValueAtTime(parseFloat(window.Clock.volume || 1.0) * 0.25, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.06);
            }
        }
    });
}

initSoundSettings();
