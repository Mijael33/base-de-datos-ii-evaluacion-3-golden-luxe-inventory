// models/Category.js
// Categorías de joyas (anillos, collares, etc.)

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio'],
        unique: true,
        trim: true
    },
    
    description: {
        type: String,
        trim: true
    },
    
    // Imagen representativa
    imageUrl: {
        type: String,
        default: '/images/default-category.jpg'
    },
    
    // Para ordenar en la interfaz
    order: {
        type: Number,
        default: 0
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', categorySchema);