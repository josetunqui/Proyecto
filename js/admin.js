import { productos, saveProductos } from './productos.js';
import { categorias, saveCategorias } from './categorias.js';
import { getUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    if (!user || user.rol !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    const btnLogoutAdmin = document.getElementById('btn-logout-admin');
    if (btnLogoutAdmin) {
        btnLogoutAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Deseas cerrar sesión?')) {
                localStorage.removeItem('usuarioActivo');
                window.location.href = 'index.html';
            }
        });
    }

    const navLinks = document.querySelectorAll('#sidebarMenu .nav-link');
    const sections = document.querySelectorAll('.admin-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('data-target');
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('d-none');
                } else {
                    section.classList.add('d-none');
                }
            });

            if (targetId === 'reportes-section') renderReports();
        });
    });

    const catTbody = document.getElementById('cat-tbody');
    const catForm = document.getElementById('cat-form');
    const catModalTitle = document.getElementById('cat-modal-title');
    const catModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const inputCatId = document.getElementById('cat-id');
    const inputCatNombre = document.getElementById('cat-nombre');

    const renderCategorias = () => {
        catTbody.innerHTML = '';
        categorias.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.id}</td>
                <td class="fw-bold">${c.nombre}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning btn-edit-cat" data-id="${c.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-sm btn-danger btn-delete-cat" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            catTbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-edit-cat').forEach(btn => {
            btn.addEventListener('click', handleEditCategory);
        });
        document.querySelectorAll('.btn-delete-cat').forEach(btn => {
            btn.addEventListener('click', handleDeleteCategory);
        });

        populateCategoryDropdown();
    };

    const handleEditCategory = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const cat = categorias.find(c => c.id === id);
        if (cat) {
            catModalTitle.textContent = 'Editar Categoría';
            inputCatId.value = cat.id;
            inputCatNombre.value = cat.nombre;
            catModal.show();
        }
    };

    const handleDeleteCategory = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const cat = categorias.find(c => c.id === id);
        if (confirm(`¿Eliminar la categoría "${cat.nombre}"?`)) {
            const index = categorias.findIndex(c => c.id === id);
            if (index > -1) {
                categorias.splice(index, 1);
                saveCategorias(categorias);
                renderCategorias();
                renderReports();
            }
        }
    };

    document.getElementById('btn-add-category').addEventListener('click', () => {
        catModalTitle.textContent = 'Agregar Categoría';
        catForm.reset();
        inputCatId.value = '';
    });

    catForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isEditing = inputCatId.value !== '';
        
        const newCat = {
            id: isEditing ? parseInt(inputCatId.value) : (categorias.length > 0 ? Math.max(...categorias.map(c => c.id)) + 1 : 1),
            nombre: inputCatNombre.value.trim()
        };

        if (isEditing) {
            const index = categorias.findIndex(c => c.id === newCat.id);
            if (index > -1) categorias[index] = newCat;
        } else {
            categorias.push(newCat);
        }

        saveCategorias(categorias);
        catModal.hide();
        renderCategorias();
        renderReports();
    });

    const crudTbody = document.getElementById('crud-tbody');
    const crudForm = document.getElementById('crud-form');
    const modalTitle = document.getElementById('modal-title');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    
    const inputId = document.getElementById('prod-id');
    const inputNombre = document.getElementById('prod-nombre');
    const inputPrecio = document.getElementById('prod-precio');
    const inputCategoria = document.getElementById('prod-categoria');
    const inputMarca = document.getElementById('prod-marca');
    const inputPais = document.getElementById('prod-pais');
    const inputImagen = document.getElementById('prod-imagen');
    const inputDescripcion = document.getElementById('prod-descripcion');

    const populateCategoryDropdown = () => {
        inputCategoria.innerHTML = '<option value="">Seleccione...</option>';
        categorias.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.nombre;
            opt.textContent = c.nombre;
            inputCategoria.appendChild(opt);
        });
    };

    const renderProductos = () => {
        crudTbody.innerHTML = '';
        productos.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.id}</td>
                <td><img src="${p.imagen}" style="width: 50px; height: 50px; object-fit: contain;" onerror="this.src='imagenes/empresa/logo1.png'"></td>
                <td class="fw-bold">${p.nombre}</td>
                <td>${p.marca}</td>
                <td><span class="badge bg-secondary">${p.categoria}</span></td>
                <td>S/ ${parseFloat(p.precio).toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning btn-edit-prod" data-id="${p.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-sm btn-danger btn-delete-prod" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            crudTbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-edit-prod').forEach(btn => {
            btn.addEventListener('click', handleEditProduct);
        });
        document.querySelectorAll('.btn-delete-prod').forEach(btn => {
            btn.addEventListener('click', handleDeleteProduct);
        });
    };

    const handleEditProduct = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const producto = productos.find(p => p.id === id);
        if (producto) {
            modalTitle.textContent = 'Editar Producto';
            inputId.value = producto.id;
            inputNombre.value = producto.nombre;
            inputPrecio.value = producto.precio;
            inputCategoria.value = producto.categoria;
            inputMarca.value = producto.marca;
            inputPais.value = producto.pais;
            inputImagen.value = producto.imagen;
            inputDescripcion.value = producto.descripcion;
            productModal.show();
        }
    };

    const handleDeleteProduct = (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        if (confirm(`¿Estás seguro de que deseas eliminar el producto con ID ${id}?`)) {
            const index = productos.findIndex(p => p.id === id);
            if (index > -1) {
                productos.splice(index, 1);
                saveProductos(productos);
                renderProductos();
                renderReports();
            }
        }
    };

    document.getElementById('btn-add-product').addEventListener('click', () => {
        modalTitle.textContent = 'Agregar Producto';
        crudForm.reset();
        inputId.value = '';
    });

    crudForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isEditing = inputId.value !== '';
        
        const newProduct = {
            id: isEditing ? parseInt(inputId.value) : (productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1),
            nombre: inputNombre.value.trim(),
            precio: parseFloat(inputPrecio.value),
            categoria: inputCategoria.value,
            marca: inputMarca.value.trim(),
            pais: inputPais.value.trim(),
            imagen: inputImagen.value.trim(),
            descripcion: inputDescripcion.value.trim()
        };

        if (isEditing) {
            const index = productos.findIndex(p => p.id === newProduct.id);
            if (index > -1) productos[index] = newProduct;
        } else {
            productos.unshift(newProduct);
        }

        saveProductos(productos);
        productModal.hide();
        renderProductos();
        renderReports();
    });

    const renderReports = () => {
        document.getElementById('rep-total-productos').textContent = productos.length;
        document.getElementById('rep-total-categorias').textContent = categorias.length;
        
        const totalValue = productos.reduce((sum, p) => sum + parseFloat(p.precio), 0);
        document.getElementById('rep-valor-inventario').textContent = `S/ ${totalValue.toFixed(2)}`;

        const breakdownDiv = document.getElementById('rep-cat-breakdown');
        breakdownDiv.innerHTML = '';

        const counts = {};
        categorias.forEach(c => counts[c.nombre] = 0);
        productos.forEach(p => {
            if (counts[p.categoria] !== undefined) counts[p.categoria]++;
        });

        for (const cat in counts) {
            const percent = productos.length > 0 ? (counts[cat] / productos.length) * 100 : 0;
            const progressHtml = `
                <div class="mb-3">
                    <div class="d-flex justify-content-between mb-1">
                        <span>${cat}</span>
                        <span class="text-muted">${counts[cat]} items</span>
                    </div>
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-info" role="progressbar" style="width: ${percent}%;" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            `;
            breakdownDiv.innerHTML += progressHtml;
        }
    };

    renderCategorias();
    renderProductos();
    renderReports();
});
