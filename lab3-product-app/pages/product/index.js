import { ProductComponent } from '../../components/product/index.js';
import { MainPage } from '../main/index.js';
import { ajax } from '../../modules/ajax.js';
import { productUrls } from '../../modules/productUrls.js';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <header class="topbar container py-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div id="brand-link" class="brand brand-clickable">
                    <span class="brand-red">Рос</span>Тендер
                </div>
                <span class="text-muted">Страница продукта</span>
            </header>

            <div class="container pb-3">
                <button id="open-edit-form-btn" class="btn btn-primary">
                    Редактировать
                </button>
            </div>

            <div id="product-page"></div>
        `;
    }

    clickBrand() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    openEditForm() {
        alert(`Страницу редактирования подключим следующим шагом. ID продукта: ${this.id}`);
    }

    getData() {
        this.pageRoot.innerHTML = `
            <div class="container py-4 text-center text-muted">
                Загрузка продукта...
            </div>
        `;

        ajax.get(productUrls.getProductById(this.id), (data, status) => {
            this.pageRoot.innerHTML = '';

            if (status !== 200 || !data) {
                this.pageRoot.innerHTML = `
                    <div class="container py-4 text-center text-danger">
                        Не удалось загрузить продукт с сервера.
                    </div>
                `;
                return;
            }

            this.renderData(data);
        });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    addListeners() {
        document
            .getElementById('brand-link')
            .addEventListener('click', this.clickBrand.bind(this));

        document
            .getElementById('open-edit-form-btn')
            .addEventListener('click', this.openEditForm.bind(this));
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.addListeners();
        this.getData();
    }
}
