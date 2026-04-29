import { ProductCardComponent } from '../../components/product-card/index.js';
import { ProductPage } from '../product/index.js';
import { products } from '../../data/products.js';

export class MainPage {
    static nextCardIndex = 0;
    static selectedCategory = 'Все';

    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getData() {
        if (MainPage.selectedCategory === 'Все') {
            return products;
        }

        return products.filter((item) => item.category === MainPage.selectedCategory);
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

                        <div class="d-flex justify-content-center flex-wrap gap-3 mb-3">
                            <button id="add-card-btn" class="btn btn-primary">Добавить карточку</button>
                            <button id="delete-card-btn" class="btn btn-outline-secondary">Удалить карточку</button>
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

    addCard() {
        const templates = products.slice(0, 3);
        const template = templates[MainPage.nextCardIndex];
        const newCard = JSON.parse(JSON.stringify(template));

        const maxId = products.length ? Math.max(...products.map(item => item.id)) : 0;
        newCard.id = maxId + 1;

        products.push(newCard);

        MainPage.nextCardIndex = (MainPage.nextCardIndex + 1) % 3;

        this.render();
    }

    deleteCard() {
        if (products.length > 0) {
            products.pop();
            this.render();
        }
    }

    setFilter(category) {
        MainPage.selectedCategory = category;
        this.render();
    }

    addPageListeners() {
        document
            .getElementById('add-card-btn')
            .addEventListener('click', this.addCard.bind(this));

        document
            .getElementById('delete-card-btn')
            .addEventListener('click', this.deleteCard.bind(this));

        document
            .getElementById('brand-link')
            .addEventListener('click', this.clickBrand.bind(this));

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

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
