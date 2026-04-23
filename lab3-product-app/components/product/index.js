export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getFeaturesHTML(features) {
        return features.map((item) => `<li class="list-group-item">${item}</li>`).join('');
    }

    getHTML(data) {
        return `
            <section class="container py-4 py-lg-5">
                <div class="detail-card shadow-sm">
                    <div class="row g-4 align-items-start">
                        <div class="col-lg-4">
                            <div class="detail-preview">
                                <div class="detail-icon">${data.icon}</div>
                                <div class="d-flex flex-wrap gap-2 justify-content-center mt-3">
                                    <span class="badge text-bg-danger">${data.badge}</span>
                                    <span class="badge text-bg-secondary">${data.category}</span>
                                    <span class="badge text-bg-light border text-dark">${data.price}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <h1 class="mb-3">${data.title}</h1>
                            <p class="lead mb-3">${data.description}</p>
                            <p class="text-muted mb-4">Целевая аудитория: ${data.audience}</p>

                            <h2 class="h4 mb-3">Что входит</h2>
                            <ul class="list-group mb-4">
                                ${this.getFeaturesHTML(data.features)}
                            </ul>

                            <div class="alert alert-primary mb-0" role="alert">
                                Это вторая страница приложения. Она открывается по кнопке из карточки на главной странице.
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
