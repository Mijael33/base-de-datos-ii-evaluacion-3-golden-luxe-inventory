// controllers/productController.js
// Controlador para operaciones CRUD de productos

const Product = require('../models/Product');
const Category = require('../models/Category');
const Material = require('../models/Material');

// CREATE - Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        // Verificar que los datos necesarios existen
        const { name, description, price, stock, category, material, weight } = req.body;
        
        if (!name || !description || !price || !category || !material || !weight) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            });
        }
        
        // Verificar que la categoría existe
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: 'La categoría no existe'
            });
        }
        
        // Verificar que el material existe
        const materialExists = await Material.findById(material);
        if (!materialExists) {
            return res.status(400).json({
                success: false,
                message: 'El material no existe'
            });
        }
        
        // Crear el producto
        const newProduct = new Product({
            name,
            description,
            price: Number(price),
            stock: Number(stock) || 0,
            category,
            material,
            weight: Number(weight),
            isAvailable: true
        });
        
        // Guardar en base de datos
        const savedProduct = await newProduct.save();
        
        // Poblar los campos referenciados para la respuesta
        const populatedProduct = await Product.findById(savedProduct._id)
            .populate('category')
            .populate('material');
        
        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: populatedProduct
        });
        
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el producto',
            error: error.message
        });
    }
};

// READ - Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        // Obtener todos los productos con sus relaciones
        const products = await Product.find()
            .populate('category')
            .populate('material')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// READ - Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id)
            .populate('category')
            .populate('material');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};

// UPDATE - Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Si se actualiza stock, verificar que no sea negativo
        if (updateData.stock !== undefined && updateData.stock < 0) {
            return res.status(400).json({
                success: false,
                message: 'El stock no puede ser negativo'
            });
        }
        
        // Actualizar el producto
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('category').populate('material');
        
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: updatedProduct
        });
        
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// DELETE - Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Producto eliminado exitosamente',
            data: deletedProduct
        });
        
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

// READ - Obtener productos por categoría (consulta adicional)
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        
        // Verificar que la categoría existe
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }
        
        // Obtener productos de esa categoría
        const products = await Product.find({ category: categoryId })
            .populate('category')
            .populate('material')
            .sort({ price: -1 }); // Ordenar por precio descendente
        
        res.json({
            success: true,
            category: category.name,
            count: products.length,
            data: products
        });
        
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos por categoría',
            error: error.message
        });
    }
};