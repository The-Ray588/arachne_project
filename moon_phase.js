// Модуль: Фаза луны
window.Clock = window.Clock || {};

function initMoonPhase() {
    const svg = document.querySelector('.clock-svg');
    if (!svg) return;
    
    const moonGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    moonGroup.setAttribute('id', 'moon');
    svg.appendChild(moonGroup);
    
    const moonCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    moonCircle.setAttribute('cx', '170');
    moonCircle.setAttribute('cy', '60');
    moonCircle.setAttribute('r', '12');
    moonCircle.setAttribute('fill', '#f6e6c1');
    moonCircle.setAttribute('opacity', '0.6');
    moonGroup.appendChild(moonCircle);
    
    const moonShadow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    moonShadow.setAttribute('cx', '170');
    moonShadow.setAttribute('cy', '60');
    moonShadow.setAttribute('r', '12');
    moonShadow.setAttribute('fill', '#171826');
    moonShadow.setAttribute('opacity', '0');
    moonGroup.appendChild(moonShadow);
    
    function getMoonPhase(date) {
        const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
        const synodicMonth = 29.53058867 * 24 * 60 * 60 * 1000;
        
        const daysSinceNewMoon = (date.getTime() - knownNewMoon) / synodicMonth;
        const phase = ((daysSinceNewMoon % 1) + 1) % 1;
        
        return phase;
    }
    
    function updateMoon() {
        const phase = getMoonPhase(new Date());
        const phaseDegrees = phase * 360;
        
        const shadowX = 170 + 12 * Math.cos(phaseDegrees * Math.PI / 180);
        const shadowY = 60 + 12 * Math.sin(phaseDegrees * Math.PI / 180);
        
        moonShadow.setAttribute('cx', shadowX);
        moonShadow.setAttribute('cy', shadowY);
        moonShadow.setAttribute('r', '12');
        moonShadow.setAttribute('opacity', '0.8');
        
        const phases = ['NEW MOON', 'WAXING CRESCENT', 'FIRST QUARTER', 'WAXING GIBBOUS', 'FULL MOON', 'WANING GIBBOUS', 'LAST QUARTER', 'WANING CRESCENT'];
        const phaseIndex = Math.floor(phase * 8);
        
        const textEl = moonGroup.querySelector('text') || document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', '170');
        textEl.setAttribute('y', '80');
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('font-size', '10');
        textEl.setAttribute('font-family', 'Courier New');
        textEl.setAttribute('fill', '#f6e6c1');
        textEl.setAttribute('opacity', '0.5');
        textEl.textContent = phases[phaseIndex];
        moonGroup.appendChild(textEl);
    }
    
    updateMoon();
    setInterval(updateMoon, 600000);
}

initMoonPhase();
