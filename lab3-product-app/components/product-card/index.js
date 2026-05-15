export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getBadgeByCategory(category) {
        if (category === 'Документы') {
            return 'Хит';
        }

        if (category === 'Обучение') {
            return 'New';
        }

        if (category === 'Сервисы') {
            return 'Top';
        }

        return 'Продукт';
    }

    getAudienceByCategory(category) {
        if (category === 'Документы') {
            return 'Для начинающих';
        }

        if (category === 'Обучение') {
            return 'Студентам';
        }

        if (category === 'Сервисы') {
            return 'Малому бизнесу';
        }

        return 'Без категории';
    }

    formatPrice(price) {
        if (String(price) === '0') {
            return 'Бесплатно';
        }

        return `${price} ₽`;
    }

    getHTML(data) {
        const productBadge = this.getBadgeByCategory(data.category);
        const productAudience = this.getAudienceByCategory(data.category);
        const productPrice = this.formatPrice(data.price);

        return `
            <div class="col-12 col-md-6 col-xl-4 mb-4">
                <div class="product-card h-100 shadow-sm">
                    <img class="product-image" src="${data.image}" alt="${data.title}">

                    <div class="d-flex flex-wrap gap-2 mb-3">
                        <span class="badge text-bg-danger">${productBadge}</span>
                        <span class="badge text-bg-secondary">${data.category}</span>
                        <span class="badge text-bg-light border text-dark">${productPrice}</span>
                    </div>

                    <h3 class="product-title">${data.title}</h3>
                    <p class="product-text">${data.description}</p>

                    <div class="mt-auto d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <small class="text-muted">${productAudience}</small>
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
