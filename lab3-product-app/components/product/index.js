import {
    findServiceOfferCouples,
    buildSortedServicePhrase,
    getSumAndMultOfServiceValues,
    fillServiceTagsArray
} from '../../utils/product-tools.js';

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getFeaturesHTML(features) {
        return features.map((item) => `<li class="mb-2">${item}</li>`).join('');
    }

    getHTML(data) {
        const foundServiceCouples = findServiceOfferCouples(
            data.serviceOfferNumbers,
            data.targetOfferSum
        );

        const sortedServicePhrase = buildSortedServicePhrase(data.servicePhrase);

        const serviceValueResult = getSumAndMultOfServiceValues(data.serviceValueArray);

        const filledServiceTags = fillServiceTagsArray(
            data.serviceTagCount,
            data.serviceTagValue
        );

        return `
            <section class="container py-4 py-lg-5">
                <div class="detail-card shadow-sm">
                    <div class="row g-4 align-items-start">
                        <div class="col-lg-4">
                            <div class="detail-preview mb-4">
                                <img class="detail-image" src="${data.image}" alt="${data.title}">
                            </div>

                            <div class="detail-model-box">
                                <div id="product-model-viewer" class="product-model-viewer"></div>
                            </div>
                        </div>

                        <div class="col-lg-8">
                            <h1 class="mb-3">${data.title}</h1>
                            <p class="lead mb-3">${data.description}</p>
                            <p class="text-muted mb-4">Целевая аудитория: ${data.audience}</p>

                            <div class="alert alert-light border mb-3" role="alert">
                                <strong>Найденные пары для суммы ${data.targetOfferSum}:</strong>
                                ${foundServiceCouples.length ? foundServiceCouples.join(', ') : 'Подходящих пар нет'}
                            </div>

                            <div class="alert alert-light border mb-3" role="alert">
                                <strong>Отсортированная служебная фраза:</strong>
                                ${sortedServicePhrase}
                            </div>

                            <div class="alert alert-light border mb-3" role="alert">
                                <strong>Сумма значений массива:</strong> ${serviceValueResult.sum}<br>
                                <strong>Произведение значений массива:</strong> ${serviceValueResult.mult}
                            </div>

                            <div class="alert alert-light border mb-4" role="alert">
                                <strong>Заполненный массив тегов:</strong>
                                [${filledServiceTags.join(', ')}]
                            </div>

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
