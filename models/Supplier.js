// models/Supplier.js
// Proveedores de materiales y productos

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio'],
        trim: true
    },
    
    contactName: {
        type: String,
        required: [true, 'El nombre del contacto es obligatorio'],
        trim: true
    },
    
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    
    phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    
    // Tipos de materiales que provee
    materialTypes: [{
        type: String,
        enum: ['Oro', 'Plata', 'Platino', 'Diamantes', 'Otras gemas']
    }],
    
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);