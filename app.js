// app.js
// Archivo principal de la aplicación

// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rutas
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');

// Crear la aplicación Express
const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Middlewares
// -------------------------
// Para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Para procesar datos de formularios y JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a MongoDB
// -------------------------
console.log('Conectando a MongoDB...');

// Versión SIMPLIFICADA - sin opciones obsoletas
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ Conectado a la BD correctamente');
    
    // Inicializar datos de ejemplo después de conectar
    initializeSampleData();
})
.catch((error) => {
    console.error('❌ Error conectando a la BD:', error.message);
    process.exit(1);
});

// Función para crear datos de ejemplo
async function initializeSampleData() {
    try {
        const Category = require('./models/Category');
        const Material = require('./models/Material');
        const Product = require('./models/Product');
        const Supplier = require('./models/Supplier');
        const Sale = require('./models/Sale');
        
        // Verificar si ya hay datos
        const categoriesCount = await Category.countDocuments();
        
        if (categoriesCount === 0) {
            console.log('Creando datos de ejemplo...');
            
            // Crear categorías
            const categories = await Category.insertMany([
                { name: 'Anillos', description: 'Anillos de compromiso y argollas', order: 1 },
                { name: 'Collares', description: 'Collares y gargantillas', order: 2 },
                { name: 'Pulseras', description: 'Pulseras y brazaletes', order: 3 },
                { name: 'Aretes', description: 'Aretes y pendientes', order: 4 },
                { name: 'Relojes', description: 'Relojes de lujo', order: 5 }
            ]);
            
            // Crear materiales
            const materials = await Material.insertMany([
                { name: 'Oro Amarillo 18K', purity: '18K', color: 'Amarillo', pricePerGram: 85000 },
                { name: 'Oro Blanco 18K', purity: '18K', color: 'Blanco', pricePerGram: 90000 },
                { name: 'Oro Rosado 18K', purity: '18K', color: 'Rosado', pricePerGram: 88000 },
                { name: 'Plata 925', purity: '925', color: 'Plateado', pricePerGram: 5000 },
                { name: 'Platino', purity: '950', color: 'Blanco', pricePerGram: 150000 }
            ]);
            
            // Crear proveedores
            const suppliers = await Supplier.insertMany([
                {
                    businessName: 'Joyas Export S.A.',
                    contactName: 'Carlos Rodríguez',
                    email: 'carlos@joyasexport.com',
                    phone: '+57 300 123 4567',
                    address: 'Calle 100 #20-30, Bogotá',
                    materialTypes: ['Oro', 'Plata'],
                    rating: 5
                },
                {
                    businessName: 'Diamantes del Sur',
                    contactName: 'María González',
                    email: 'maria@diamantessur.com',
                    phone: '+57 310 987 6543',
                    address: 'Carrera 15 #85-20, Medellín',
                    materialTypes: ['Diamantes', 'Otras gemas'],
                    rating: 4
                },
                {
                    businessName: 'Metales Preciosos Ltda.',
                    contactName: 'Juan Pérez',
                    email: 'juan@metalespreciosos.com',
                    phone: '+57 320 555 1234',
                    address: 'Av. Las Américas #45-67, Cali',
                    materialTypes: ['Oro', 'Plata', 'Platino'],
                    rating: 5
                }
            ]);
            
            // Crear productos
            const products = await Product.insertMany([
                {
                    name: 'Anillo Solitario Diamante',
                    description: 'Elegante anillo solitario con diamante central de 0.5 quilates',
                    price: 2500000,
                    stock: 5,
                    category: categories[0]._id, // Anillos
                    material: materials[0]._id, // Oro Amarillo
                    weight: 3.5,
                    isAvailable: true
                },
                {
                    name: 'Collar de Perlas',
                    description: 'Collar clásico de perlas cultivadas con cierre de oro blanco',
                    price: 1800000,
                    stock: 8,
                    category: categories[1]._id, // Collares
                    material: materials[1]._id, // Oro Blanco
                    weight: 15.2,
                    isAvailable: true
                },
                {
                    name: 'Pulsera Tennis',
                    description: 'Pulsera tennis con diamantes incrustados',
                    price: 3200000,
                    stock: 3,
                    category: categories[2]._id, // Pulseras
                    material: materials[1]._id, // Oro Blanco
                    weight: 8.7,
                    isAvailable: true
                },
                {
                    name: 'Aretes de Oro',
                    description: 'Aretes de aro en oro amarillo 18K',
                    price: 950000,
                    stock: 12,
                    category: categories[3]._id, // Aretes
                    material: materials[0]._id, // Oro Amarillo
                    weight: 2.3,
                    isAvailable: true
                },
                {
                    name: 'Reloj Clásico',
                    description: 'Reloj automático con correa de cuero y caja de acero',
                    price: 4500000,
                    stock: 2,
                    category: categories[4]._id, // Relojes
                    material: materials[4]._id, // Platino
                    weight: 45.0,
                    isAvailable: true
                }
            ]);
            
            // Crear algunas ventas
            const sales = await Sale.insertMany([
                {
                    product: products[0]._id,
                    quantity: 1,
                    unitPrice: 2500000,
                    totalPrice: 2500000,
                    paymentMethod: 'Tarjeta crédito',
                    clientName: 'Ana Martínez',
                    seller: 'Sistema'
                },
                {
                    product: products[1]._id,
                    quantity: 2,
                    unitPrice: 1800000,
                    totalPrice: 3600000,
                    paymentMethod: 'Efectivo',
                    clientName: 'Roberto Sánchez',
                    seller: 'Sistema'
                },
                {
                    product: products[2]._id,
                    quantity: 1,
                    unitPrice: 3200000,
                    totalPrice: 3200000,
                    paymentMethod: 'Transferencia',
                    clientName: 'Laura Gómez',
                    seller: 'Sistema'
                },
                {
                    product: products[3]._id,
                    quantity: 3,
                    unitPrice: 950000,
                    totalPrice: 2850000,
                    paymentMethod: 'Tarjeta débito',
                    clientName: 'Carlos Ruiz',
                    seller: 'Sistema'
                }
            ]);
            
            console.log('✅ Datos de ejemplo creados exitosamente');
            console.log(`📊 Categorías: ${categories.length}`);
            console.log(`📊 Materiales: ${materials.length}`);
            console.log(`📊 Proveedores: ${suppliers.length}`);
            console.log(`📊 Productos: ${products.length}`);
            console.log(`📊 Ventas: ${sales.length}`);
        }
    } catch (error) {
        console.error('Error creando datos de ejemplo:', error);
    }
}

// Usar las rutas
app.use('/', mainRoutes);
app.use('/', productRoutes);

// Ruta para manejar errores 404 (página no encontrada)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 Presiona Ctrl+C para detener el servidor`);
});

// Manejar cierre graceful del servidor
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando conexiones...');
    await mongoose.connection.close();
    console.log('✅ Conexión a MongoDB cerrada');
    process.exit(0);
});