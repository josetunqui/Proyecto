import { productos } from "./productos.js";

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const producto = productos.find((p) => p.id === id);
const contenedor = document.getElementById("detalle-producto");

if (!producto) {
    contenedor.innerHTML = "<h2>Producto no encontrado</h2>";
    throw new Error("Producto no encontrado");
}

console.log(id);
console.log(producto);
contenedor.innerHTML = `
    <div class="detalle-producto">

        <div class="detalle-imagen">
            <img src="${producto.imagen}">
        </div>

        <div class="detalle-info">

            <h1>${producto.nombre}</h1>
            <p><strong>Código:</strong> ${producto.id}</p>
            <p><strong>Marca:</strong> ${producto.marca}</p>
            <p><strong>País:</strong> ${producto.pais}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
         
            <h2>S/ ${producto.precio.toFixed(2)}</h2>
            <div class="cantidad-container">

            <label>Cantidad:</label>

            <div class="cantidad-control">

                <button id="btnMenos">-</button>

                <input type="number" id="cantidad" value="1" min="1">

                <button id="btnMas">+</button>

            </div>

        </div>

        <button class="btn-cesta">
           🧺 Agregar a cesta
        </button>

        </div>
       
    </div>

     <div class="detalle-descripcion">
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        </div>
`;
const recomendados = productos.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id,
);

const recomendaciones = document.getElementById("recomendaciones");
let html = "";
recomendados.slice(0, 8).forEach((p, index) => {
    if (index % 3 === 0) {
        html += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <div class="row justify-content-center">
    `;
    }
    html += `
        <div class="col-md-3">

            <div class="producto-card"
                 onclick="location.href='detalleproducto.html?id=${p.id}'">
                <img src="${p.imagen}" class="img-fluid">
                 <div class="producto-marca-pais">${p.marca} | ${p.pais}</div>
                <div class="producto-nombre">${p.nombre}</div>
                <div class="producto-precio">S/ ${p.precio.toFixed(2)}</div>
            </div>
        </div>
    `;

    if (index % 3 === 2 || index === recomendados.length - 1) {
        html += `
            </div>
        </div>
    `;
    }
});

recomendaciones.innerHTML = html;
if (!producto) {
    contenedor.innerHTML = "<h2>Producto no encontrado</h2>";
    throw new Error("Producto no encontrado");
}
const cantidad = document.getElementById("cantidad");

document.getElementById("btnMas").addEventListener("click", () => {
    cantidad.value = parseInt(cantidad.value) + 1;
});

document.getElementById("btnMenos").addEventListener("click", () => {
    if (parseInt(cantidad.value) > 1) {
        cantidad.value = parseInt(cantidad.value) - 1;
    }
});
