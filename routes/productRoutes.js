// routes/productRoutes.js
// Rutas para las operaciones CRUD de productos

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas API para productos
router.post('/api/products', productController.createProduct);           // CREATE
router.get('/api/products', productController.getAllProducts);           // READ ALL
router.get('/api/products/:id', productController.getProductById);       // READ ONE
router.put('/api/products/:id', productController.updateProduct);        // UPDATE
router.delete('/api/products/:id', productController.deleteProduct);     // DELETE

// Ruta adicional de consulta
router.get('/api/products/category/:categoryId', productController.getProductsByCategory);

module.exports = router;