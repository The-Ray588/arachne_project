window.Clock = window.Clock || {};

function initBlinkingColon() {
    const btn = document.getElementById('btn-blink');
    if (btn) {
        btn.textContent = 'BLINK: ON';
        btn.addEventListener('click', () => {
            blinkingEnabled = !blinkingEnabled;
            btn.textContent = blinkingEnabled ? 'BLINK: ON' : 'BLINK: OFF';
        });
    }
    
    let blinkingEnabled = true;
    
    window.addEventListener('clock-tick', () => {
        if (blinkingEnabled) {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            
            const blinkingColon = Math.floor(Date.now() / 1000) % 2 === 0 ? ':' : ' ';
            
            readout.textContent = `${h}${blinkingColon}${m}${blinkingColon}${s}`;
        }
    });
}

initBlinkingColon();
