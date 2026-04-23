export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="container pt-4">
                <button id="back-button" class="btn btn-outline-secondary">← Назад на главную</button>
            </div>
        `;
    }

    addListeners(listener) {
        document.getElementById('back-button').addEventListener('click', listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
