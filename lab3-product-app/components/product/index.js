export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const productBadge =
            data.category === 'Документы'
                ? 'Хит'
                : data.category === 'Обучение'
                ? 'New'
                : data.category === 'Сервисы'
                ? 'Top'
                : 'Продукт';

        const productAudience =
            data.category === 'Документы'
                ? 'Для начинающих'
                : data.category === 'Обучение'
                ? 'Студентам'
                : data.category === 'Сервисы'
                ? 'Малому бизнесу'
                : 'Без категории';

        const productPrice = String(data.price) === '0' ? 'Бесплатно' : `${data.price} ₽`;

        return `
            <section class="container py-4 py-lg-5">
                <div class="detail-card shadow-sm">
                    <div class="row g-4 align-items-start">
                        <div class="col-lg-4">
                            <div class="detail-preview mb-4">
                                <img class="detail-image" src="${data.image}" alt="${data.title}">
                            </div>
                        </div>

                        <div class="col-lg-8">
                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <span class="badge text-bg-danger">${productBadge}</span>
                                <span class="badge text-bg-secondary">${data.category}</span>
                                <span class="badge text-bg-light border text-dark">${productPrice}</span>
                            </div>

                            <h1 class="mb-3">${data.title}</h1>
                            <p class="lead mb-3">${data.description}</p>
                            <p class="text-muted mb-4">Целевая аудитория: ${productAudience}</p>

                            <div class="accordion mb-4" id="product-accordion-${data.id}">
                                <div class="accordion-item custom-accordion-item">
                                    <h2 class="accordion-header">
                                        <button
                                            class="accordion-button collapsed custom-accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#product-collapse-${data.id}"
                                            aria-expanded="false"
                                            aria-controls="product-collapse-${data.id}"
                                        >
                                            Что входит?
                                        </button>
                                    </h2>
                                    <div
                                        id="product-collapse-${data.id}"
                                        class="accordion-collapse collapse"
                                        data-bs-parent="#product-accordion-${data.id}"
                                    >
                                        <div class="accordion-body">
                                            <ul class="mb-0 ps-3">
                                                <li class="mb-2">Описание приходит с backend API через XMLHttpRequest</li>
                                                <li class="mb-2">Страница загружается по id выбранной карточки</li>
                                                <li class="mb-2">Данные выводятся без перезагрузки всей страницы</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="alert alert-danger mb-0" role="alert">
                                Возврат на главную страницу выполняется по нажатию на надпись «РосТендер» в левом верхнем углу.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
