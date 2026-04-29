export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getFeaturesHTML(features) {
        return features.map((item) => `<li class="mb-2">${item}</li>`).join('');
    }

    getHTML(data) {
        return `
            <section class="container py-4 py-lg-5">
                <div class="detail-card shadow-sm">
                    <div class="row g-4 align-items-start">
                        <div class="col-lg-4">
                            <div class="detail-preview">
                                <img class="detail-image" src="${data.image}" alt="${data.title}">

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
                                                ${this.getFeaturesHTML(data.features)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
