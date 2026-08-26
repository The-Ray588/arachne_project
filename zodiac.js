// Модуль: Знак зодиака
window.Clock = window.Clock || {};

function initZodiac() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const zodiacEl = document.createElement('div');
    zodiacEl.style.cssText = "font-size:14px; letter-spacing:3px; color:#a8873f; margin-top:5px; opacity:0.7;";
    footer.appendChild(zodiacEl);
    
    // Список знаков
    const signs = [
        { name: 'CAPRICORN', dates: 'Dec 22 - Jan 19' },
        { name: 'AQUARIUS', dates: 'Jan 20 - Feb 18' },
        { name: 'PISCES', dates: 'Feb 19 - Mar 20' },
        { name: 'ARIES', dates: 'Mar 21 - Apr 19' },
        { name: 'TAURUS', dates: 'Apr 20 - May 20' },
        { name: 'GEMINI', dates: 'May 21 - Jun 20' },
        { name: 'CANCER', dates: 'Jun 21 - Jul 22' },
        { name: 'LEO', dates: 'Jul 23 - Aug 22' },
        { name: 'VIRGO', dates: 'Aug 23 - Sep 22' },
        { name: 'LIBRA', dates: 'Sep 23 - Oct 22' },
        { name: 'SCORPIO', dates: 'Oct 23 - Nov 21' },
        { name: 'SAGITTARIUS', dates: 'Nov 22 - Dec 21' }
    ];
    
    // Вычисляем знак
    function getZodiacSign(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signs[0];
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signs[1];
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return signs[2];
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signs[3];
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signs[4];
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signs[5];
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signs[6];
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signs[7];
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signs[8];
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signs[9];
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signs[10];
        return signs[11];
    }
    
    function updateZodiac() {
        const now = new Date();
        const sign = getZodiacSign(now);
        zodiacEl.textContent = `${sign.name} · ${sign.dates}`;
    }
    
    updateZodiac();
    setInterval(updateZodiac, 60000);
}

initZodiac();
