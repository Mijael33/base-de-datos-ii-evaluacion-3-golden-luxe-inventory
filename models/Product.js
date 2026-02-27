// models/Product.js
// Define la estructura de los productos (joyas)

const mongoose = require('mongoose');

// Creamos el esquema (la estructura)
const productSchema = new mongoose.Schema({
    // Nombre del producto (obligatorio)
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    
    // Descripción detallada
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    
    // Precio de venta
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    
    // Cantidad en inventario
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    },
    
    // Categoría a la que pertenece (relación)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoría es obligatoria']
    },
    
    // Material principal (relación)
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
        required: [true, 'El material es obligatorio']
    },
    
    // Peso en gramos
    weight: {
        type: Number,
        required: [true, 'El peso es obligatorio'],
        min: [0.01, 'El peso mínimo es 0.01 gramos']
    },
    
    // ¿Está disponible?
    isAvailable: {
        type: Boolean,
        default: true
    },
    
    // Fecha de creación automática
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Creamos el modelo a partir del esquema
module.exports = mongoose.model('Product', productSchema);