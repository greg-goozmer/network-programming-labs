import { ProductCardComponent } from '../../components/product-card/index.js';
import { ProductPage } from '../product/index.js';
import { ajax } from '../../modules/ajax.js';
import { productUrls } from '../../modules/productUrls.js';

export class MainPage {
    static selectedCategory = 'Все';

    constructor(parent) {
        this.parent = parent;
        this.filterTitle = '';
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <header class="topbar container py-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div id="brand-link" class="brand brand-clickable">
                    <span class="brand-red">Рос</span>Тендер
                </div>
            </header>

            <section class="hero-section">
                <div class="container py-5">
                    <div class="hero-box text-center mx-auto">
                        <h1 class="mb-3">Обучитесь основам закупок с РосТендер</h1>
                        <p class="hero-text mb-4">
                            На данной странице представлены полезные продукты для изучения основ закупок.
                        </p>

                        <div class="d-flex justify-content-center flex-wrap gap-2 mb-3">
                            <input
                                id="filter-title-input"
                                class="form-control"
                                type="text"
                                placeholder="Введите название продукта"
                                value="${this.filterTitle}"
                                style="max-width: 320px;"
                            >
                            <button id="filter-title-btn" class="btn btn-outline-secondary">
                                Фильтровать
                            </button>
                            <button id="open-create-form-btn" class="btn btn-primary">
                                Добавить продукт
                            </button>
                        </div>

                        <div class="d-flex justify-content-center flex-wrap gap-2">
                            <button id="filter-all" class="btn btn-outline-secondary">Все</button>
                            <button id="filter-documents" class="btn btn-outline-secondary">Документы</button>
                            <button id="filter-education" class="btn btn-outline-secondary">Обучение</button>
                            <button id="filter-services" class="btn btn-outline-secondary">Сервисы</button>
                        </div>
                    </div>
                </div>
            </section>

            <main class="container py-4 py-lg-5">
                <div id="main-page" class="row"></div>
            </main>
        `;
    }

    clickCard(event) {
        const cardId = Number(event.target.dataset.id);
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickBrand() {
        MainPage.selectedCategory = 'Все';
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    openCreateForm() {
        alert('Страницу добавления подключим следующим шагом.');
    }

    setFilter(category) {
        MainPage.selectedCategory = category;
        this.getData();
    }

    applyTitleFilter() {
        this.filterTitle = document.getElementById('filter-title-input').value.trim();
        this.getData();
    }

    getData() {
        this.pageRoot.innerHTML = `
            <div class="col-12 text-center text-muted">
                Загрузка данных...
            </div>
        `;

        ajax.get(
            productUrls.getProducts(this.filterTitle, MainPage.selectedCategory),
            (data, status) => {
                this.pageRoot.innerHTML = '';

                if (status !== 200 || !Array.isArray(data)) {
                    this.pageRoot.innerHTML = `
                        <div class="col-12 text-center text-danger">
                            Не удалось загрузить продукты с сервера.
                        </div>
                    `;
                    return;
                }

                this.renderData(data);
            }
        );
    }

    renderData(items) {
        if (!items.length) {
            this.pageRoot.innerHTML = `
                <div class="col-12 text-center text-muted">
                    По вашему запросу ничего не найдено.
                </div>
            `;
            return;
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    addPageListeners() {
        document
            .getElementById('brand-link')
            .addEventListener('click', this.clickBrand.bind(this));

        document
            .getElementById('filter-title-btn')
            .addEventListener('click', this.applyTitleFilter.bind(this));

        document
            .getElementById('open-create-form-btn')
            .addEventListener('click', this.openCreateForm.bind(this));

        document
            .getElementById('filter-title-input')
            .addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.applyTitleFilter();
                }
            });

        document
            .getElementById('filter-all')
            .addEventListener('click', () => this.setFilter('Все'));

        document
            .getElementById('filter-documents')
            .addEventListener('click', () => this.setFilter('Документы'));

        document
            .getElementById('filter-education')
            .addEventListener('click', () => this.setFilter('Обучение'));

        document
            .getElementById('filter-services')
            .addEventListener('click', () => this.setFilter('Сервисы'));
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addPageListeners();
        this.getData();
    }
}
