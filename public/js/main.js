// public/js/main.js
// JavaScript para interactividad del frontend

// Función para mostrar notificaciones
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Función para cargar productos en la página de productos
async function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if (!productsContainer) return;
    
    try {
        // Mostrar spinner de carga
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        
        // Hacer petición a la API
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Ocultar spinner
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        
        if (data.success) {
            displayProducts(data.data);
        } else {
            showAlert('Error al cargar productos', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        showAlert('Error de conexión', 'error');
    }
}

// Función para mostrar productos en tarjetas
function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p class="text-center">No hay productos disponibles</p>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="card">
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">${product.description}</p>
                <div class="card-price">$${product.price.toLocaleString()}</div>
                <div class="card-footer">
                    <span class="badge ${product.stock > 0 ? 'badge-success' : 'badge-danger'}">
                        Stock: ${product.stock}
                    </span>
                    <span class="badge badge-gold">
                        ${product.material?.name || 'N/A'}
                    </span>
                </div>
                <div style="margin-top: 1rem;">
                    <button onclick="editProduct('${product._id}')" class="btn btn-secondary" style="margin-right: 0.5rem;">Editar</button>
                    <button onclick="deleteProduct('${product._id}')" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para cargar categorías en el formulario
async function loadCategories() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Extraer categorías únicas de los productos
        const categories = [...new Map(data.data.map(p => [p.category._id, p.category])).values()];
        
        const select = document.getElementById('category');
        if (select) {
            select.innerHTML = '<option value="">Seleccione una categoría</option>' +
                categories.map(cat => `<option value="${cat._id}">${cat.name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error cargando categorías:', error);
    }
}

// Función para cargar materiales en el formulario
async function loadMaterials() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Extraer materiales únicos de los productos
        const materials = [...new Map(data.data.map(p => [p.material._id, p.material])).values()];
        
        const select = document.getElementById('material');
        if (select) {
            select.innerHTML = '<option value="">Seleccione un material</option>' +
                materials.map(mat => `<option value="${mat._id}">${mat.name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error cargando materiales:', error);
    }
}

// Función para crear/editar producto
async function saveProduct(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        material: document.getElementById('material').value,
        weight: document.getElementById('weight').value
    };
    
    const productId = document.getElementById('productId')?.value;
    const url = productId ? `/api/products/${productId}` : '/api/products';
    const method = productId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert(productId ? 'Producto actualizado' : 'Producto creado', 'success');
            setTimeout(() => {
                window.location.href = '/products';
            }, 2000);
        } else {
            showAlert(data.message || 'Error al guardar', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

// Función para editar producto
async function editProduct(id) {
    try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        
        if (data.success) {
            // Redirigir al formulario con los datos
            sessionStorage.setItem('editingProduct', JSON.stringify(data.data));
            window.location.href = '/product-form';
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al cargar producto', 'error');
    }
}

// Función para eliminar producto
async function deleteProduct(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Producto eliminado', 'success');
            loadProducts(); // Recargar la lista
        } else {
            showAlert('Error al eliminar', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

// Función para cargar datos del dashboard
async function loadDashboardData() {
    const dashboardContainer = document.getElementById('dashboard-data');
    if (!dashboardContainer) return;
    
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
            dashboardContainer.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div class="card" style="text-align: center;">
                        <h3>Total Productos</h3>
                        <p style="font-size: 2rem; color: #d4af37;">${data.data.totalProducts}</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <h3>Total Categorías</h3>
                        <p style="font-size: 2rem; color: #d4af37;">${data.data.totalCategories}</p>
                    </div>
                    <div class="card" style="text-align: center;">
                        <h3>Total Materiales</h3>
                        <p style="font-size: 2rem; color: #d4af37;">${data.data.totalMaterials}</p>
                    </div>
                </div>
                
                <h3>Productos con bajo stock</h3>
                <div class="card-container">
                    ${data.data.lowStock.map(product => `
                        <div class="card">
                            <div class="card-content">
                                <h4>${product.name}</h4>
                                <p>Stock: <span style="color: #dc3545; font-weight: bold;">${product.stock}</span></p>
                                <p>Precio: $${product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        dashboardContainer.innerHTML = '<p class="alert alert-error">Error al cargar datos</p>';
    }
}

// Inicializar según la página actual
document.addEventListener('DOMContentLoaded', function() {
    // Marcar enlace activo en la navegación
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Cargar productos si estamos en la página de productos
    if (window.location.pathname === '/products') {
        loadProducts();
    }
    
    // Cargar datos del dashboard si estamos en la página principal
    if (window.location.pathname === '/') {
        loadDashboardData();
    }
    
    // Cargar categorías y materiales si estamos en el formulario
    if (window.location.pathname === '/product-form') {
        loadCategories();
        loadMaterials();
        
        // Si hay un producto en edición, cargar sus datos
        const editingProduct = sessionStorage.getItem('editingProduct');
        if (editingProduct) {
            const product = JSON.parse(editingProduct);
            
            document.getElementById('productId').value = product._id;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
            document.getElementById('category').value = product.category._id;
            document.getElementById('material').value = product.material._id;
            document.getElementById('weight').value = product.weight;
            
            sessionStorage.removeItem('editingProduct');
        }
    }
    
    // Agregar evento al formulario de producto si existe
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', saveProduct);
    }
});