window.onload = function() {
    const div = document.getElementById('message');

    document.getElementById('btn1').onclick = () => {
        alert(div.innerHTML); // "Привет, <b>мир</b>!"
    };

    document.getElementById('btn2').onclick = () => {
        alert(div.textContent); // "Привет, мир!"
    };

    document.getElementById('btn3').onclick = () => {
        div.innerHTML = 'Новый <i>текст</i>'; // вставится с курсивом
    };

    document.getElementById('btn4').onclick = () => {
        div.textContent = 'Просто текст <i>не будет курсивом</i>'; // теги не сработают
    };
}
