// Модуль: Черная дыра
window.Clock = window.Clock || {};

function initBlackHole() {
    const svg = document.querySelector('.clock-svg');
    if (!svg) return;
    
    // Создаем круги для вихря
    const vortexGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    vortexGroup.setAttribute('id', 'vortex');
    svg.appendChild(vortexGroup);
    
    // Gradien для черной дыры
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const radialGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    radialGradient.setAttribute('id', 'vortexGradient');
    radialGradient.setAttribute('cx', '50%');
    radialGradient.setAttribute('cy', '50%');
    radialGradient.setAttribute('r', '50%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#000');
    stop1.setAttribute('stop-opacity', '1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#000');
    stop2.setAttribute('stop-opacity', '0');
    
    radialGradient.appendChild(stop1);
    radialGradient.appendChild(stop2);
    defs.appendChild(radialGradient);
    svg.appendChild(defs);
    
    // Круг черной дыры
    const vortexCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    vortexCircle.setAttribute('cx', '170');
    vortexCircle.setAttribute('cy', '170');
    vortexCircle.setAttribute('r', '25');
    vortexCircle.setAttribute('fill', 'url(#vortexGradient)');
    vortexCircle.setAttribute('opacity', '0.3');
    vortexGroup.appendChild(vortexCircle);
    
    // Частицы вокруг черной дыры
    const particles = [];
    for (let i = 0; i < 10; i++) {
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        particle.setAttribute('r', Math.random() * 2 + 0.5);
        particle.setAttribute('fill', '#f6e6c1');
        particle.setAttribute('opacity', '0.6');
        vortexGroup.appendChild(particle);
        particles.push(particle);
    }
    
    // Вращаем частицы
    function animateVortex() {
        const angle = (Date.now() / 3000) * Math.PI * 2;
        const innerRadius = 10;
        const outerRadius = 45;
        
        for (const particle of particles) {
            const index = particles.indexOf(particle);
            const radius = innerRadius + (outerRadius - innerRadius) * (index / particles.length);
            const particleAngle = angle + index * 0.5;
            const cx = 170 + Math.cos(particleAngle) * radius;
            const cy = 170 + Math.sin(particleAngle) * radius;
            
            particle.setAttribute('cx', cx);
            particle.setAttribute('cy', cy);
        }
        
        vortexCircle.setAttribute('transform', `rotate(${angle * 57.3} 170 170)`);
        vortexCircle.setAttribute('opacity', '0.3 + ' + Math.sin(Date.now() / 1000) * 0.1);
        
        requestAnimationFrame(animateVortex);
    }
    
    animateVortex();
}

initBlackHole();
