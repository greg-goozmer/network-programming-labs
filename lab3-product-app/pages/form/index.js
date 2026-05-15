import { MainPage } from '../main/index.js';
import { ajax } from '../../modules/ajax.js';
import { productUrls } from '../../modules/productUrls.js';

export class FormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('form-page');
    }

    getHTML() {
        return `
            <header class="topbar container py-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div id="brand-link" class="brand brand-clickable">
                    <span class="brand-red">Рос</span>Тендер
                </div>
                <span class="text-muted">
                    ${this.id ? 'Редактирование продукта' : 'Добавление продукта'}
                </span>
            </header>

            <main class="container py-4 py-lg-5">
                <div id="form-page" class="detail-card shadow-sm">
                    <h1 class="mb-4">${this.id ? 'Редактирование продукта' : 'Добавление продукта'}</h1>

                    <div class="mb-3">
                        <label class="form-label">Ссылка на изображение</label>
                        <input id="product-image-input" type="text" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input id="product-title-input" type="text" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="product-description-input" class="form-control" rows="4"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Категория</label>
                        <input id="product-category-input" type="text" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Цена</label>
                        <input id="product-price-input" type="text" class="form-control">
                    </div>

                    <div class="alert alert-warning mb-0">
                        В 5-й лабораторной поля можно заполнять и редактировать, но кнопка сохранения появится только в 6-й лабораторной.
                    </div>
                </div>
            </main>
        `;
    }

    clickBrand() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    fillForm(product) {
        document.getElementById('product-image-input').value = product.image ?? '';
        document.getElementById('product-title-input').value = product.title ?? '';
        document.getElementById('product-description-input').value = product.description ?? '';
        document.getElementById('product-category-input').value = product.category ?? '';
        document.getElementById('product-price-input').value = product.price ?? '';
    }

    loadProductData() {
        if (!this.id) {
            return;
        }

        ajax.get(productUrls.getProductById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.fillForm(data);
            }
        });
    }

    addListeners() {
        document
            .getElementById('brand-link')
            .addEventListener('click', this.clickBrand.bind(this));
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners();
        this.loadProductData();
    }
}
