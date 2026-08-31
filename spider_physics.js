// Модуль: Физика паука
window.Clock = window.Clock || {};

function initSpiderPhysics() {
    // Создаем кнопку
    const btn = document.createElement('button');
    btn.textContent = 'SPIDER: STAY';
    btn.style.cssText = "position:fixed; bottom:380px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let spiderActive = false;
    btn.addEventListener('click', () => {
        spiderActive = !spiderActive;
        btn.textContent = spiderActive ? 'SPIDER: ACTIVE' : 'SPIDER: STAY';
    });
    
    // Слушаем события тика
    window.addEventListener('clock-tick', () => {
        if (spiderActive) {
            const spider = document.querySelector('#spider');
            if (!spider) return;
            
            // Плавный поворот паука
            const angle = Math.sin(Date.now() / 2000) * 10;
            spider.style.transform = `rotate(${angle}deg)`;
            spider.style.transition = 'transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
        }
    });
}

initSpiderPhysics();
