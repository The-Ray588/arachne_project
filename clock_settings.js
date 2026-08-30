// Модуль: Настройки часов (цвет стрелок + стиль цифр)
window.Clock = window.Clock || {};

// Обработка настройки цвета стрелок
function initColorSettings() {
    const btn = document.createElement('button');
    btn.textContent = 'ARROW COLOR';
    btn.style.cssText = "position:fixed; bottom:260px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let arrowColor = localStorage.getItem('arachne_arrow_color') || '#f6e6c1';
    
    btn.addEventListener('click', () => {
        const color = prompt('Введите цвет стрелок (например, #ff0000 или blue):', arrowColor);
        if (color) {
            arrowColor = color;
            localStorage.setItem('arachne_arrow_color', color);
            
            // Обновляjau элементы
            const legs = document.querySelectorAll('.leg');
            for (const leg of legs) {
                leg.style.stroke = arrowColor;
            }
        }
    });
}

// Обработка настройки стиля цифр
function initNumeralStyle() {
    const btn = document.createElement('button');
    btn.textContent = 'NUMERAL STYLE';
    btn.style.cssText = "position:fixed; bottom:290px; left:20px; background:transparent; border:1px solid #a8873f; color:#a8873f; font-family:monospace; padding:5px 10px; cursor:pointer; font-size:11px;";
    document.body.appendChild(btn);
    
    let numeralStyle = localStorage.getItem('arachne_numeral_style') || 'classic';
    
    btn.addEventListener('click', () => {
        const style = prompt('Введите стиль цифр: classic, serif или modern:', numeralStyle);
        if (style) {
            numeralStyle = style;
            localStorage.setItem('arachne_numeral_style', style);
            
            // Обновляем цифры
            const numerals = document.querySelectorAll('.numerals');
            for (const numeral of numerals) {
                numeral.style.fontSize = '36px';
                numeral.style.fontFamily = style === 'serif' ? 'Times New Roman' : style === 'modern' ? 'Courier New' : 'Arial';
                numeral.style.opacity = style === 'modern' ? '0.6' : '0.9';
            }
        }
    });
}

initColorSettings();
initNumeralStyle();
