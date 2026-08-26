// Модуль: Глаза, следящие за курсором
window.Clock = window.Clock || {};

function initFollowEye() {
    const svg = document.querySelector('.clock-svg');
    if (!svg) return;
    
    const eyesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    eyesGroup.setAttribute('id', 'eyes');
    svg.appendChild(eyesGroup);
    
    const eyeColor = '#f6e6c1';
    const pupilColor = '#000';
    
    // Создаем глаза
    for (let i = 0; i < 2; i++) {
        const eyeX = i === 0 ? 162 : 178;
        const eyeY = 170;
        
        const eye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        eye.setAttribute('cx', eyeX);
        eye.setAttribute('cy', eyeY);
        eye.setAttribute('r', '4');
        eye.setAttribute('fill', eyeColor);
        eyesGroup.appendChild(eye);
        
        const pupil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pupil.setAttribute('cx', eyeX);
        pupil.setAttribute('cy', eyeY);
        pupil.setAttribute('r', '2');
        pupil.setAttribute('fill', pupilColor);
        eyesGroup.appendChild(pupil);
    }
    
    const pupils = eyesGroup.querySelectorAll('circle:last-child');
    
    // Слушаем движение мышью
    window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - window.innerWidth / 2;
        const dy = e.clientY - window.innerHeight / 2;
        
        for (const pupil of pupils) {
            pupil.setAttribute('cx', parseFloat(pupil.getAttribute('cx')) + dx * 0.002);
            pupil.setAttribute('cy', parseFloat(pupil.getAttribute('cy')) + dy * 0.002);
        }
    });
}

initFollowEye();
