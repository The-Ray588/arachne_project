window.Clock = window.Clock || {};

function initBackgroundMusic() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.3;
    gainNode.connect(audioCtx.destination);
    
    // Кнопка музыка
    const btn = document.getElementById('btn-music');
    if (btn) {
        btn.textContent = 'MUSIC: OFF';
        btn.addEventListener('click', () => {
            musicEnabled = !musicEnabled;
            btn.textContent = musicEnabled ? 'MUSIC: ON' : 'MUSIC: OFF';
            
            if (musicEnabled) {
                startMusic();
            } else {
                stopMusic();
            }
        });
    }
    
    let musicEnabled = false;
    let currentTrack = 0;
    let timer = null;
    
    // Кнопка переключения треков
    const trackBtn = document.getElementById('btn-track');
    if (trackBtn) {
        trackBtn.textContent = 'TRACK: 1';
        trackBtn.addEventListener('click', () => {
            currentTrack = (currentTrack + 1) % tracks.length;
            trackBtn.textContent = `TRACK: ${currentTrack + 1}`;
            
            if (musicEnabled) {
                stopMusic();
                startMusic();
            }
        });
    }
    
    // Список эмбиент-треков
    const tracks = [
        { tempo: 60, notes: [220, 330, 440, 550] },      // Спокойный
        { tempo: 90, notes: [180, 270, 360, 450] },       // Атмосферный
        { tempo: 120, notes: [160, 240, 320, 400] },      // Загадочный
    ];
    
    // Функция генерации музыкальной ноты
    function generateNote(frequency, duration) {
        const oscillator = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        noteGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        oscillator.connect(noteGain);
        noteGain.connect(gainNode);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    }
    
    // Вращающаяся музыкальная шкатулка
    function startMusic() {
        const track = tracks[currentTrack];
        timer = setInterval(() => {
            for (const note of track.notes) {
                generateNote(note, 0.5);
            }
        }, 2000);
    }
    
    function stopMusic() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
}

initBackgroundMusic();
