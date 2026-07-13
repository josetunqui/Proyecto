const defaultCategorias = [
    { id: 1, nombre: "Billeteras" },
    { id: 2, nombre: "Relojes" },
    { id: 3, nombre: "Mochilas" },
    { id: 4, nombre: "Correas" },
    { id: 5, nombre: "Morrales" },
    { id: 6, nombre: "Carteras" }
];

export const categorias = JSON.parse(localStorage.getItem('categoriasImportShop')) || defaultCategorias;

if (!localStorage.getItem('categoriasImportShop')) {
    localStorage.setItem('categoriasImportShop', JSON.stringify(defaultCategorias));
}

export const saveCategorias = (newCategorias) => {
    if (newCategorias !== categorias) {
        categorias.length = 0;
        categorias.push(...newCategorias);
    }
    localStorage.setItem('categoriasImportShop', JSON.stringify(categorias));
};
