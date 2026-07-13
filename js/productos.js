const defaultProductos = [
    {
        id: 33,
        nombre: "Billetera Casual Leather Black",
        precio: 139.00,
        marca: "Wild Polo",
        pais: "USA",
        categoria: "Billeteras",
        descripcion: "Billetera de cuero casual en color negro, perfecta para el uso diario. Con múltiples compartimentos para tarjetas y billetes, esta billetera combina estilo y funcionalidad.Su diseño compacto y elegante la convierte en un accesorio imprescindible para quienes buscan una opción práctica sin sacrificar el estilo.",
        imagen: "imagenes/productos/30/Billetera Casual Leather Black.png"
    },
    {
        id: 32,
        nombre: "Billetera Classic Minimal Black",
        precio: 169.00,
        marca: "Calvin Klein",
        pais: "USA",
        categoria: "Billeteras",
        descripcion: "Billetera clásica minimalista en color negro, ideal para un estilo moderno. Su diseño elegante y funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Billetera Classic Minimal Black.png"
    },
    {
        id: 30,
        nombre: "Billetera Classic Monogram Zipper",
        precio: 279.00,
        marca: "Louis Vuitton",
        pais: "USA",
        categoria: "Billeteras",
        descripcion: "Billetera clásica con monograma y cremallera en color negro, ideal para un estilo elegante. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Billetera Classic Monogram Zipper.png"
    },
    {
        id: 31,
        nombre: "Billetera Elegant Black Style",
        precio: 189.00,
        marca: "Guess",
        pais: "USA",
        categoria: "Billeteras",
        descripcion: "Billetera elegante en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Billetera Elegant Black Style.png"
    },
    {
        id: 34,
        nombre: "Billetera Premium Leather Classic",
        precio: 199.00,
        marca: "Coach",
        pais: "USA",
        categoria: "Billeteras",
        descripcion: "Billetera premium de cuero clásica en color negro, ideal para un estilo elegante. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Billetera Premium Leather Classic.png"
    },
    {
        id: 25,
        nombre: "Reloj Elegant Silver Blue",
        precio: 279.00,
        marca: "Lacoste",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj elegante en color plata y azul, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Elegant Silver Blue.png"
    },
    {
        id: 24,
        nombre: "Reloj Classic Green Gold",
        precio: 299.00,
        marca: "Citizen",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj clásico en color verde y oro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Classic Green Gold.png"
    },
    {
        id: 23,
        nombre: "Reloj Elegance Gold Black",
        precio: 329.00,
        marca: "Michael Kors",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj elegante en color oro y negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Elegance Gold Black.png"
    },
    {
        id: 26,
        nombre: "Reloj Classic Square Leather",
        precio: 249.00,
        marca: "Tommy Hilfiger",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj clásico de cuero en forma cuadrada, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Classic Square Leather.png"
    },
    {
        id: 28,
        nombre: "Reloj Classic Steel Black",
        precio: 199.00,
        marca: "Casio",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj clásico de acero en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Classic Steel Black.png"
    },
    {
        id: 27,
        nombre: "Reloj Premium Gold Blue",
        precio: 289.00,
        marca: "Tommy Hilfiger",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj premium en color oro y azul, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Premium Gold Blue.png"
    },
    {
        id: 29,
        nombre: "Reloj Classic Leather Gold",
        precio: 239.00,
        marca: "Tommy Hilfiger",
        pais: "USA",
        categoria: "Relojes",
        descripcion: "Reloj clásico de cuero en color oro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Reloj Classic Leather Gold.png"
    },
    {
        id: 22,
        nombre: "Mochila Classic Checkered Style",
        precio: 359.00,
        marca: "Louis Vuitton",
        pais: "USA",
        categoria: "Mochilas",
        descripcion: "Mochila clásica en estilo cuadriculado, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Mochila Classic Checkered Style.png"
    },
    {
        id: 21,
        nombre: "Mochila Urban Casual Black",
        precio: 249.00,
        marca: "Lacoste",
        pais: "USA",
        categoria: "Mochilas",
        descripcion: "Mochila urbana casual en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Mochila Urban Casual Black.png"
    },
    {
        id: 20,
        nombre: "Mochila Minimal Black Style",
        precio: 339.00,
        marca: "Louis Vuitton",
        pais: "USA",
        categoria: "Mochilas",
        descripcion: "Mochila minimal en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Mochila Minimal Black Style.png"
    },
    {
        id: 19,
        nombre: "Mochila Elegant Black Premium",
        precio: 269.00,
        marca: "Tommy Hilfiger",
        pais: "USA",
        categoria: "Mochilas",
        descripcion: "Mochila elegante en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Mochila Elegant Black Premium.png"
    },
    {
        id: 18,
        nombre: "Mochila Signature White Blue",
        precio: 289.00,
        marca: "Michael Kors",
        pais: "USA",
        categoria: "Mochilas",
        descripcion: "Mochila signature en color blanco y azul, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Mochila Signature White Blue.png"
    },
    {
        id: 17,
        nombre: "Mochila Classic Brown Signature",
        precio: 299.00,
        marca: "Michael Kors",
        pais: "USA",
        categoria: "Mochilas",
        descripcion: "Mochila clásica en color marrón, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Mochila Classic Brown Signature.png"
    },
    {
        id: 16,
        nombre: "Correa Automática Luxury Black",
        precio: 169.00,
        marca: "Polo Ralph Lauren",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa automática de lujo en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Automática Luxury Black.png"
    },
    {
        id: 11,
        nombre: "Correa Casual Dark Brown",
        precio: 129.00,
        marca: "Levi’s",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa casual en color marrón oscuro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Casual Dark Brown.png"
    },
    {
        id: 10,
        nombre: "Correa Leather Classic Black",
        precio: 139.00,
        marca: "Lacoste",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa de cuero clásica en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Leather Classic Black.png"
    },
    {
        id: 12,
        nombre: "Correa Premium CK Style",
        precio: 159.00,
        marca: "Calvin Klein",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa premium en estilo CK, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Premium CK Style.png"
    },
    {
        id: 13,
        nombre: "Correa Elegance Gold Buckle",
        precio: 189.00,
        marca: "Celine",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa elegante con hebilla de oro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Elegance Gold Buckle.png"
    },
    {
        id: 14,
        nombre: "Correa Luxury Double G",
        precio: 209.00,
        marca: "Gucci",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa de lujo con doble G, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Luxury Double G.png"
    },
    {
        id: 15,
        nombre: "Correa Premium Triangle Logo",
        precio: 219.00,
        marca: "Prada",
        pais: "USA",
        categoria: "Correas",
        descripcion: "Correa premium con logo triangular, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Correa Premium Triangle Logo.png"
    },
    {
        id: 9,
        nombre: "Morral Compact Street Style",
        precio: 209.00,
        marca: "Calvin Klein",
        pais: "USA",
        categoria: "Morrales",
        descripcion: "Morral compacto en estilo urbano, ideal para un estilo moderno. Su diseño funcional lo convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Morral Compact Street Style.png"
    },
    {
        id: 8,
        nombre: "Morral Sport Minimal Black",
        precio: 189.00,
        marca: "Lacoste",
        pais: "USA",
        categoria: "Morrales",
        descripcion: "Morral deportivo minimalista en color negro, ideal para un estilo moderno. Su diseño funcional lo convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Morral Sport Minimal Black.png"
    },
    {
        id: 7,
        nombre: "Morral Classic Leather Strap",
        precio: 199.00,
        marca: "Tommy Hilfiger",
        pais: "USA",
        categoria: "Morrales",
        descripcion: "Morral clásico con tiras de cuero, ideal para un estilo moderno. Su diseño funcional lo convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Morral Classic Leather Strap.png"
    },
    {
        id: 6,
        nombre: "Morral Casual Black Urban",
        precio: 179.00,
        marca: "Aldo",
        pais: "USA",
        categoria: "Morrales",
        descripcion: "Morral casual en color negro, ideal para un estilo moderno. Su diseño funcional lo convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Morral Casual Black Urban.png"
    },
    {
        id: 5,
        nombre: "Cartera Shoulder Web Stripe",
        precio: 349.00,
        marca: "Gucci",
        pais: "USA",
        categoria: "Carteras",
        descripcion: "Cartera de hombro con franjas web, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Cartera Shoulder Web Stripe.png"
    },
    {
        id: 4,
        nombre: "Cartera Shoulder Classic Monogram",
        precio: 329.00,
        marca: "Gucci",
        pais: "USA",
        categoria: "Carteras",
        descripcion: "Cartera de hombro clásica con monograma, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Cartera Shoulder Classic Monogram.png"
    },
    {
        id: 3,
        nombre: "Cartera Shoulder Red Elegance",
        precio: 379.00,
        marca: "Yves Saint Laurent",
        pais: "USA",
        categoria: "Carteras",
        descripcion: "Cartera de hombro en color rojo, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Cartera Shoulder Red Elegance.png"
    },
    {
        id: 2,
        nombre: "Cartera Luxury Black Classic",
        precio: 349.00,
        marca: "Prada",
        pais: "USA",
        categoria: "Carteras",
        descripcion: "Cartera de lujo en color negro, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Cartera Luxury Black Classic.png"
    },
    {
        id: 1,
        nombre: "Cartera Classic Elegance Beige",
        precio: 259.00,
        marca: "Michael Kors",
        pais: "USA",
        categoria: "Carteras",
        descripcion: "Cartera clásica en color beige, ideal para un estilo moderno. Su diseño funcional la convierte en un accesorio indispensable para quienes buscan simplicidad sin renunciar al estilo.",
        imagen: "imagenes/productos/30/Cartera Classic Elegance Beige.png"
    }
];

export const productos = JSON.parse(localStorage.getItem('productosImportShop')) || defaultProductos;

if (!localStorage.getItem('productosImportShop')) {
    localStorage.setItem('productosImportShop', JSON.stringify(defaultProductos));
}

export const saveProductos = (newProductos) => {
    if (newProductos !== productos) {
        productos.length = 0;
        productos.push(...newProductos);
    }
    localStorage.setItem('productosImportShop', JSON.stringify(productos));
};