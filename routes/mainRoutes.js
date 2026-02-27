// routes/mainRoutes.js
// Rutas para las páginas principales

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Ruta para la página de inicio
router.get('/', mainController.getHomePage);

// Ruta para la página de productos
router.get('/products', mainController.getProductsPage);

// Ruta para el formulario de nuevo producto
router.get('/product-form', mainController.getProductFormPage);

// Ruta API para datos del dashboard (consulta adicional)
router.get('/api/dashboard', mainController.getDashboardData);

module.exports = router;