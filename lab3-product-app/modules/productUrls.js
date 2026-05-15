class ProductUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getProducts(title = '', category = 'Все') {
        const params = new URLSearchParams();

        if (title) {
            params.append('title', title);
        }

        if (category && category !== 'Все') {
            params.append('category', category);
        }

        const query = params.toString();
        return query
            ? `${this.baseUrl}/products?${query}`
            : `${this.baseUrl}/products`;
    }

    getProductById(id) {
        return `${this.baseUrl}/products/${id}`;
    }
}

export const productUrls = new ProductUrls();
