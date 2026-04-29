import { products } from '../../data/products.js';
import { ProductComponent } from '../../components/product/index.js';
import { MainPage } from '../main/index.js';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getData() {
        return products.find((item) => item.id === this.id) ?? products[0];
    }

    getHTML() {
        return `
            <header class="topbar container py-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div id="brand-link" class="brand brand-clickable">
                    <span class="brand-red">Рос</span>Тендер
                </div>
                <span class="text-muted">Страница продукта</span>
            </header>
            <div id="product-page"></div>
        `;
    }

    clickBrand() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
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

        const product = new ProductComponent(this.pageRoot);
        product.render(this.getData());
    }
}
