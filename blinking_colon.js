// Модуль: Мигающие двоеточия
window.Clock = window.Clock || {};

function initBlinkingColon() {
    const readout = document.getElementById('readout');
    if (!readout) return;
    
    // Обновляем текст каждую секунду
    window.addEventListener('clock-tick', () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        
        // Мигание двоеточия: каждую секунду оно меняет состояние
        const blinkingColon = Math.floor(Date.now() / 1000) % 2 === 0 ? ':' : ' ';
        
        readout.textContent = `${h}${blinkingColon}${m}${blinkingColon}${s}`;
    });
}

initBlinkingColon();
