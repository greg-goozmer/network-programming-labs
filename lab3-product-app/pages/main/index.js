import { ProductCardComponent } from '../../components/product-card/index.js';
import { ProductPage } from '../product/index.js';
import { products } from '../../data/products.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getData() {
        return products;
    }

    getHTML() {
        return `
            <header class="topbar container py-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div class="brand"><span class="brand-red">Рос</span>Тендер</div>
                <span class="text-muted">ЛР 3 · Жеребенков А.Ю.</span>
            </header>

            <section class="hero-section">
                <div class="container py-5">
                    <div class="hero-box text-center mx-auto">
                        
                        <h1 class="mb-3">Помогаем разобраться в тендерах и начать участвовать</h1>
                        <p class="hero-text mb-0">
                            На данной странице представлены несколько карточек продуктов, которые можно приобрести/получить бесплатно.
                        </p>
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

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
