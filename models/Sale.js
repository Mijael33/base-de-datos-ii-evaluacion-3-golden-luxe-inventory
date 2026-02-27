// models/Sale.js
// Registro de ventas realizadas

const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    // Producto vendido
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'El producto es obligatorio']
    },
    
    // Cantidad vendida
    quantity: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [1, 'La cantidad mínima es 1']
    },
    
    // Precio unitario al momento de la venta
    unitPrice: {
        type: Number,
        required: [true, 'El precio unitario es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    
    // Precio total (cantidad * unitPrice)
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es obligatorio']
    },
    
    // Método de pago
    paymentMethod: {
        type: String,
        required: [true, 'El método de pago es obligatorio'],
        enum: ['Efectivo', 'Tarjeta crédito', 'Tarjeta débito', 'Transferencia']
    },
    
    // Cliente (opcional por ahora)
    clientName: {
        type: String,
        trim: true
    },
    
    // Vendedor
    seller: {
        type: String,
        required: [true, 'El vendedor es obligatorio'],
        default: 'Sistema'
    },
    
    saleDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sale', saleSchema);