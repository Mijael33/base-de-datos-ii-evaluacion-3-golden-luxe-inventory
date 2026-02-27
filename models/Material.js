// models/Material.js
// Materiales de las joyas (oro, plata, etc.)

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del material es obligatorio'],
        unique: true,
        trim: true
    },
    
    // Pureza/Kilataje
    purity: {
        type: String,
        required: [true, 'La pureza es obligatoria'],
        enum: ['24K', '18K', '14K', '10K', '925', '950', 'Otro']
    },
    
    // Color del material
    color: {
        type: String,
        required: [true, 'El color es obligatorio'],
        enum: ['Amarillo', 'Blanco', 'Rosado', 'Plateado', 'Otro']
    },
    
    // Precio por gramo (para cálculos)
    pricePerGram: {
        type: Number,
        required: [true, 'El precio por gramo es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Material', materialSchema);