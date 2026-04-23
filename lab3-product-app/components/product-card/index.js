export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-12 col-md-6 col-xl-4 mb-4">
                <div class="product-card h-100 shadow-sm">
                    <div class="product-icon">${data.icon}</div>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        <span class="badge text-bg-danger">${data.badge}</span>
                        <span class="badge text-bg-secondary">${data.category}</span>
                        <span class="badge text-bg-light border text-dark">${data.price}</span>
                    </div>
                    <h3 class="product-title">${data.title}</h3>
                    <p class="product-text">${data.shortText}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <small class="text-muted">${data.audience}</small>
                        <button id="open-card-${data.id}" data-id="${data.id}" class="btn btn-primary">
                            Открыть продукт
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`open-card-${data.id}`)
            .addEventListener('click', listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
