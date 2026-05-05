import { productos } from './productos.js';

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('productos-grid');
    const selectCategoria = document.getElementById('filtro-categoria');
    const selectMarca = document.getElementById('filtro-marca');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const paginacion = document.getElementById('paginacion');

    if (!grid) return; // Salir si no estamos en la pagina de productos

    const ITEMS_PER_PAGE = 12;
    let currentPage = 1;
    let filteredProductos = [...productos];

    // Llenar selectores
    const categorias = [...new Set(productos.map(p => p.categoria))].sort();
    const marcas = [...new Set(productos.map(p => p.marca))].sort();

    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        selectCategoria.appendChild(option);
    });

    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        selectMarca.appendChild(option);
    });

    const formatId = (id) => {
        return id.toString().padStart(4, '0');
    };

    const renderProductos = () => {
        grid.innerHTML = '';
        
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const paginatedItems = filteredProductos.slice(start, end);

        if (paginatedItems.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>';
            return;
        }

        paginatedItems.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <div class="codigo">${formatId(producto.id)}</div>
                <div class="producto-img-container">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='imagenes/empresa/logo.png'">
                </div>
                <div class="producto-marca-pais">${producto.marca} | ${producto.pais}</div>
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-precio">S/ ${producto.precio.toFixed(2)}</div>
            `;
            grid.appendChild(card);
        });

        renderPaginacion();
    };

    const renderPaginacion = () => {
        paginacion.innerHTML = '';
        const totalPages = Math.ceil(filteredProductos.length / ITEMS_PER_PAGE);

        if (totalPages <= 1) return;

        const btnPrev = document.createElement('button');
        btnPrev.textContent = '<';
        btnPrev.disabled = currentPage === 1;
        btnPrev.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderProductos();
            }
        };
        paginacion.appendChild(btnPrev);

        for (let i = 1; i <= totalPages; i++) {
            const btnPage = document.createElement('button');
            btnPage.textContent = i;
            if (i === currentPage) {
                btnPage.classList.add('active');
            }
            btnPage.onclick = () => {
                currentPage = i;
                renderProductos();
            };
            paginacion.appendChild(btnPage);
        }

        const btnNext = document.createElement('button');
        btnNext.textContent = '>';
        btnNext.disabled = currentPage === totalPages;
        btnNext.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProductos();
            }
        };
        paginacion.appendChild(btnNext);
    };

    btnFiltrar.addEventListener('click', () => {
        const cat = selectCategoria.value;
        const marca = selectMarca.value;

        filteredProductos = productos.filter(p => {
            const matchCat = cat === 'todas' || p.categoria === cat;
            const matchMarca = marca === 'todas' || p.marca === marca;
            return matchCat && matchMarca;
        });

        currentPage = 1;
        renderProductos();
    });

    renderProductos();
});
