const productsService = require('../services/productsService');

const getAllProducts = (req, res) => {
    const { title, category, price } = req.query;
    const products = productsService.findAll(title, category, price);
    res.status(200).json(products);
};

const getProductById = (req, res) => {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный id продукта' });
    }

    const product = productsService.findOne(id);

    if (!product) {
        return res.status(404).json({ error: 'Продукт не найден' });
    }

    return res.status(200).json(product);
};

const createProduct = (req, res) => {
    const { image, title, description, category, price } = req.body;

    if (!image || !title || !description || !category || !price) {
        return res.status(400).json({
            error: 'Не все обязательные поля заполнены: image, title, description, category, price'
        });
    }

    const newProduct = productsService.create({
        image,
        title,
        description,
        category,
        price
    });

    return res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный id продукта' });
    }

    const updatedProduct = productsService.update(id, req.body);

    if (!updatedProduct) {
        return res.status(404).json({ error: 'Продукт не найден' });
    }

    return res.status(200).json(updatedProduct);
};

const deleteProduct = (req, res) => {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный id продукта' });
    }

    const isDeleted = productsService.remove(id);

    if (!isDeleted) {
        return res.status(404).json({ error: 'Продукт не найден' });
    }

    return res.status(204).send();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
