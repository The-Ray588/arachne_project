let audioCtx;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // Передаем аудио-контекст для плагинов
        window.Clock = window.Clock || {};
        window.Clock.audioCtx = audioCtx;
    }
}

function playTick() {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'square'; 
    oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03);

    gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.06);
}

function getRotation(el) {
    return parseFloat(getComputedStyle(el).getPropertyValue('--rot')) || 0;
}

function forwardOf(target, el) {
    let now = getRotation(el);
    if (target < now) {
        target += 360;
    }
    el.style.setProperty('--rot', target);
    return target;
}

function scheduleTick() {
    setTimeout(tick, 1000 - (Date.now() % 1000));
}

function tick() {
    initAudio();
    playTick();

    const flash = document.getElementById('flash');
    flash.classList.add('active');
    setTimeout(() => flash.classList.remove('active'), 100);

    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours() % 12;

    const secDeg = sec * 6;
    const minDeg = (min + sec / 60) * 6;
    const hourDeg = (hour + min / 60) * 30;

    document.getElementById('readout').textContent = now.toTimeString().split(' ')[0];

    const secEl = document.getElementById('hand-sec');
    const minEl = document.getElementById('hand-min');
    const hourEl = document.getElementById('hand-hour');

    const secRot = forwardOf(secDeg, secEl);
    const minRot = forwardOf(minDeg, minEl);
    const hourRot = forwardOf(hourDeg, hourEl);

    secEl.style.transition = 'transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
    minEl.style.transition = 'transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
    hourEl.style.transition = 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)';

    secEl.style.transform = `rotate(${secRot}deg)`;
    minEl.style.transform = `rotate(${minRot}deg)`;
    hourEl.style.transform = `rotate(${hourRot}deg)`;

    // Отправляем событие для всех плагинов
    window.dispatchEvent(new Event('clock-tick'));

    scheduleTick();
}

tick();
