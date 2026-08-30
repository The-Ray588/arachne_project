// Модуль: Заметки (Sticky Notes)
window.Clock = window.Clock || {};

function initNotes() {
    // Создаем блокнот
    const noteArea = document.createElement('div');
    noteArea.style.cssText = `
        position: fixed;
        bottom: 20px;
        top: 20px;
        right: 20px;
        width: 280px;
        height: 100%;
        max-height: 500px;
        overflow-y: auto;
        padding: 15px;
        background: rgba(23, 24, 38, 0.85);
        border: 1px solid var(--brass-500, #a8873f);
        letter-spacing: 1px;
        font-family: 'Courier New', Courier, monospace;
        color: #f6e6c1;
        opacity: 0.7;
        transition: opacity 0.3s;
        z-index: 10;
    `;
    document.body.appendChild(noteArea);
    
    noteArea.addEventListener('mouseenter', () => {
        noteArea.style.opacity = '1';
    });
    noteArea.addEventListener('mouseleave', () => {
        noteArea.style.opacity = '0.7';
    });

    // Создаем подгрузку текста
    const notesText = document.createElement('textarea');
    notesText.style.cssText = `
        width: 100%;
        height: 100%;
        resize: none;
        background: transparent;
        border: none;
        outline: none;
        font-family: inherit;
        font-size: 12px;
        letter-spacing: 1px;
        color: inherit;
        padding: 10px;
        opacity: 0.9;
    `;
    notesText.placeholder = "Write your notes here...";
    noteArea.appendChild(notesText);

    // Создаем кнопку для "Запуск" (или "Сброс")
    const resetBtn = document.createElement('button');
    resetBtn.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        width: 20px;
        height: 20px;
        background: transparent;
        border: none;
        color: #a8873f;
        font-family: inherit;
        font-size: 14px;
        cursor: pointer;
    `;
    resetBtn.textContent = '✕';
    noteArea.appendChild(resetBtn);

    // Храним данные
    let notes = localStorage.getItem('arachne_notes');
    if (notes) {
        notesText.value = notes;
    }

    // Записи в память
    notesText.addEventListener('input', () => {
        localStorage.setItem('arachne_notes', notesText.value);
    });

    // Сброс
    resetBtn.addEventListener('click', () => {
        notesText.value = '';
        localStorage.setItem('arachne_notes', '');
    });
}

initNotes();
