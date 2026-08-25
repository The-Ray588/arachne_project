function initSoundEffects() {
    // Синхронизация с часами
    window.addEventListener('clock-tick', () => {
        if (window.Clock && window.Clock.soundEnabled) {
            // Добавляем случайный редкий "шорох" каждые 5-10 секунд
            if (Math.random() < 0.02) {
                const audioCtx = window.Clock.audioCtx;
                if (audioCtx) {
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(1500, audioCtx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
                    
                    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.2);
                }
            }
        }
    });
}

initSoundEffects();
