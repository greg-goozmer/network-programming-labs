const fileService = require('./fileService');

let dataFilePath = '';

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title, category, price) => {
    let products = fileService.readData(dataFilePath);

    if (title) {
        products = products.filter((product) =>
            product.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (price) {
        products = products.filter((product) =>
            product.price === price
        );
    }

    if (category) {
        products = products.filter((product) =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    return products;
};

const findOne = (id) => {
    const products = fileService.readData(dataFilePath);
    return products.find((product) => product.id === id);
};

const create = (productData) => {
    const products = fileService.readData(dataFilePath);

    const newId = products.length > 0
        ? Math.max(...products.map((product) => product.id)) + 1
        : 1;

    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    fileService.writeData(dataFilePath, products);

    return newProduct;
};

const update = (id, productData) => {
    const products = fileService.readData(dataFilePath);
    const targetIndex = products.findIndex((product) => product.id === id);

    if (targetIndex === -1) {
        return null;
    }

    products[targetIndex] = {
        ...products[targetIndex],
        ...productData,
        id
    };

    fileService.writeData(dataFilePath, products);
    return products[targetIndex];
};

const remove = (id) => {
    const products = fileService.readData(dataFilePath);
    const filteredProducts = products.filter((product) => product.id !== id);

    if (filteredProducts.length === products.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredProducts);
    return true;
};

module.exports = {
    init,
    findAll,
    findOne,
    create,
    update,
    remove
};
