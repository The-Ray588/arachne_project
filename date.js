export function initDate() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const dateEl = document.createElement('div');
    dateEl.style.cssText = "font-size:14px; letter-spacing:3px; color:#f6e6c1; margin-top:5px; opacity:0.7;";
    footer.appendChild(dateEl);
    
    function updateDate() {
        const now = new Date();
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        
        dateEl.textContent = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
    }
    
    updateDate();
    setInterval(updateDate, 60000); // Обновляем раз в минуту
}
