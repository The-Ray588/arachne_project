function initParticles() {
    const svg = document.querySelector('.clock-svg');
    if (!svg) return;
    
    const particlesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    particlesGroup.setAttribute('id', 'particles');
    svg.appendChild(particlesGroup);
    
    for (let i = 0; i < 15; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', Math.random() * 1.5 + 0.5);
        circle.setAttribute('fill', '#f6e6c1');
        circle.setAttribute('opacity', '0.4');
        particlesGroup.appendChild(circle);
    }
    
    const circles = particlesGroup.querySelectorAll('circle');
    
    function animateParticles() {
        circles.forEach((circle, index) => {
            const angle = (Date.now() / 3000 + index * 0.5) * 0.1;
            const radius = 50 + Math.sin(Date.now() / 1500 + index) * 30;
            const cx = 170 + Math.cos(angle) * radius;
            const cy = 170 + Math.sin(angle) * radius;
            
            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

initParticles();
