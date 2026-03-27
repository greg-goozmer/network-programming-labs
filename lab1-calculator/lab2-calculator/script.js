window.onload = function() {
    const extraToggle = document.getElementById('btn_extra_toggle');
    const extraPanel = document.getElementById('extraPanel');

    extraToggle.onclick = () => {
        if (extraPanel.style.display === 'none') {
            extraPanel.style.display = 'block';
            extraToggle.textContent = ' ♺';
        } else {
            extraPanel.style.display = 'none';
            extraToggle.textContent = ' ♺';
        }
    };
}
