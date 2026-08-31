window.Clock = window.Clock || {};

function initSoundCustomizer() {
    const btn = document.getElementById('btn-soundstyle');
    if (btn) {
        btn.textContent = 'SOUND STYLE';
        btn.addEventListener('click', () => {
            const style = prompt('Введите стиль звука: default, low, soft или sharp:', soundStyle);
            if (style) {
                soundStyle = style;
                localStorage.setItem('arachne_sound_style', style);
                
                if (window.Clock.soundEnabled) {
                    window.Clock.soundStyle = soundStyle;
                }
            }
        });
    }
    
    let soundStyle = localStorage.getItem('arachne_sound_style') || 'default';
    
    window.addEventListener('clock-tick', () => {
        if (window.Clock.soundEnabled) {
            const audioCtx = window.Clock.audioCtx;
            if (audioCtx) {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.type = soundStyle === 'soft' ? 'sine' : 'square';
                
                if (soundStyle === 'low') {
                    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.03);
                } else if (soundStyle === 'sharp') {
                    oscillator.frequency.setValueAtTime(2500, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.03);
                } else if (soundStyle === 'soft') {
                    oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.03);
                } else {
                    oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03);
                }
                
                gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.06);
            }
        }
    });
}

initSoundCustomizer();
