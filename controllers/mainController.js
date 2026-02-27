// controllers/mainController.js
// Controlador para las páginas principales

const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Material = require('../models/Material');

// Mostrar página de inicio
exports.getHomePage = async (req, res) => {
    try {
        // Obtener productos destacados (los 4 más recientes)
        const featuredProducts = await Product.find()
            .populate('category')
            .populate('material')
            .sort({ createdAt: -1 })
            .limit(4);
            
        // Enviar el archivo HTML
        res.sendFile(path.join(__dirname, '../views/index.html'));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al cargar la página');
    }
};

// Mostrar página de productos
exports.getProductsPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/products.html'));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al cargar la página');
    }
};

// Mostrar formulario de producto
exports.getProductFormPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/product-form.html'));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al cargar la página');
    }
};

// Obtener datos para el dashboard (consulta adicional)
exports.getDashboardData = async (req, res) => {
    try {
        // Consulta para obtener estadísticas
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalMaterials = await Material.countDocuments();
        
        // Productos con bajo stock (menos de 5 unidades)
        const lowStock = await Product.find({ stock: { $lt: 5 } })
            .populate('category')
            .populate('material');
        
        res.json({
            success: true,
            data: {
                totalProducts,
                totalCategories,
                totalMaterials,
                lowStock
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener datos del dashboard' 
        });
    }
};