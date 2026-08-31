window.Clock = window.Clock || {};

function initSpiderPhysics() {
    const btn = document.getElementById('btn-spider');
    if (btn) {
        btn.textContent = 'SPIDER: STAY';
        btn.addEventListener('click', () => {
            spiderActive = !spiderActive;
            btn.textContent = spiderActive ? 'SPIDER: ACTIVE' : 'SPIDER: STAY';
        });
    }
    
    let spiderActive = false;
    
    window.addEventListener('clock-tick', () => {
        if (spiderActive) {
            const spider = document.querySelector('#spider');
            if (!spider) return;
            
            const angle = Math.sin(Date.now() / 2000) * 10;
            spider.style.transform = `rotate(${angle}deg)`;
            spider.style.transition = 'transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
        }
    });
}

initSpiderPhysics();
