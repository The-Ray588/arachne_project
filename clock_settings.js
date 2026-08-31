window.Clock = window.Clock || {};

function initColorSettings() {
    const btn = document.getElementById('btn-strcolor');
    if (btn) {
        btn.textContent = 'ARROW COLOR';
        btn.addEventListener('click', () => {
            const color = prompt('Введите цвет стрелок (например, #ff0000 или blue):', arrowColor);
            if (color) {
                arrowColor = color;
                localStorage.setItem('arachne_arrow_color', color);
                
                const legs = document.querySelectorAll('.leg');
                for (const leg of legs) {
                    leg.style.stroke = arrowColor;
                }
            }
        });
    }
    
    let arrowColor = localStorage.getItem('arachne_arrow_color') || '#f6e6c1';
}

function initNumeralStyle() {
    const btn = document.getElementById('btn-numstyle');
    if (btn) {
        btn.textContent = 'NUMERAL STYLE';
        btn.addEventListener('click', () => {
            const style = prompt('Введите стиль цифр: classic, serif или modern:', numeralStyle);
            if (style) {
                numeralStyle = style;
                localStorage.setItem('arachne_numeral_style', style);
                
                const numerals = document.querySelectorAll('.numerals');
                for (const numeral of numerals) {
                    numeral.style.fontSize = '36px';
                    numeral.style.fontFamily = style === 'serif' ? 'Times New Roman' : style === 'modern' ? 'Courier New' : 'Arial';
                    numeral.style.opacity = style === 'modern' ? '0.6' : '0.9';
                }
            }
        });
    }
    
    let numeralStyle = localStorage.getItem('arachne_numeral_style') || 'classic';
}

initColorSettings();
initNumeralStyle();
