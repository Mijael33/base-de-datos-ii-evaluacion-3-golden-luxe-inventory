# Golden Luxe Inventory - Sistema de Gestión para Joyería

## 📋 Descripción del Proyecto
Sistema de inventario para joyería de lujo desarrollado con Node.js, Express y MongoDB. 
Permite gestionar productos, categorías, materiales, proveedores y ventas con una interfaz elegante en tonos negro y dorado.

## 👨‍💻 Autor
- Nombre: Mijael Engelmann
- C.I.: V-31.222.463
- Institución: UNETI - Base de Datos II
- Profesora: Inmaculada Maldonado

## 🛠️ Tecnologías Utilizadas
- Node.js
- Express
- MongoDB Atlas / Compass
- Mongoose
- HTML5, CSS3, JavaScript

## 📁 Estructura de la Base de Datos (5 Colecciones)
1. Products - Joyas (nombre, descripción, precio, stock, categoría, material, peso)
2. Categories - Categorías de productos (nombre, descripción, imagen)
3. Materials - Materiales (nombre, pureza, color, precio por gramo)
4. Suppliers - Proveedores (empresa, contacto, email, teléfono)
5. Sales - Ventas (producto, cantidad, precio, método de pago)

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js instalado
- MongoDB Compass (opcional) o cuenta en MongoDB Atlas

### Pasos para ejecutar el proyecto

1. Descarga y Extrae el ZIP del proyecto en una carpeta nueva 
   Entra a esa carpeta con cd

2. Instalar dependencias
    
    npm install

3. Configurar variables de entorno

    Crear un archivo llamado .env en la raíz del proyecto y pegar esto:
    PORT=3000
    MONGODB_URI=mongodb+srv://admin:admin123@cluster0.mrrk4fo.mongodb.net/golden_luxe?appName=Cluster0

4. Iniciar el servidor

    npm run dev

5. Abrir en el navegador

    http://localhost:3000

    Funcionalidades Implementadas

    ✓ CRUD completo de productos (Crear, Leer, Actualizar, Eliminar)

    ✓ Consulta adicional: Productos por categoría

    ✓ 5 colecciones en MongoDB con mínimo 4 documentos cada una

    ✓ Interfaz gráfica premium negro con dorado

    ✓ Conexión exitosa a MongoDB Atlas
