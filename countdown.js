window.Clock = window.Clock || {};

function initCountdown() {
    const btn = document.getElementById('btn-countdown');
    if (btn) {
        btn.textContent = 'COUNTDOWN: SET';
        btn.addEventListener('click', () => {
            const input = prompt('Введите дату (ЧЧ:ММ:ДД:ММ:ГГГГ):', targetDate || '01.01.2026');
            if (input) {
                targetDate = input;
                localStorage.setItem('arachne_countdown', input);
                btn.textContent = `COUNTDOWN: ${input}`;
            }
        });
    }
    
    let targetDate = localStorage.getItem('arachne_countdown');
    if (targetDate) {
        btn.textContent = `COUNTDOWN: ${targetDate}`;
    }
    
    const countdownEl = document.createElement('div');
    countdownEl.style.cssText = "font-size:14px; letter-spacing:3px; color:#f6e6c1; margin-top:5px; opacity:0.7;";
    footer.appendChild(countdownEl);
    
    function updateCountdown() {
        if (!targetDate) return;
        
        const target = new Date(targetDate);
        const now = new Date();
        const diff = target - now;
        
        if (diff <= 0) {
            countdownEl.textContent = 'COUNTDOWN: DONE!';
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            
            countdownEl.textContent = `COUNTDOWN: ${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs`;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

initCountdown();
